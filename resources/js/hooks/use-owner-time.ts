import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

// Shared by Laravel through HandleInertiaRequests::share().
// `timezone` is an IANA name (APP_TIMEZONE), `offset` is minutes east of UTC.
export type SharedTimeProps = {
  locale: string;
  time: {
    timezone: string;
    offset: number;
  };
};

/** 180 -> "UTC+3", -210 -> "UTC-3:30". */
export function formatUtcOffset(minutes: number) {
  const abs = Math.abs(minutes);
  const rest = abs % 60;
  return `UTC${minutes < 0 ? '-' : '+'}${Math.floor(abs / 60)}${rest ? `:${String(rest).padStart(2, '0')}` : ''}`;
}

/** "3h ahead of you", "2h 30m behind you", "Same time as you". */
export function describeDifference(minutes: number) {
  if (minutes === 0) return 'Same time as you';
  const abs = Math.abs(minutes);
  const amount = [Math.floor(abs / 60) && `${Math.floor(abs / 60)}h`, abs % 60 && `${abs % 60}m`]
    .filter(Boolean)
    .join(' ');
  return `${amount} ${minutes > 0 ? 'ahead of' : 'behind'} you`;
}

/**
 * Current time, or null until mounted (keeps server and client markup equal).
 * Ticks on the minute boundary, so the clock never lags behind by up to a minute.
 */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = new Date();
      setNow(current);
      timeout = setTimeout(tick, 60_000 - (current.getSeconds() * 1000 + current.getMilliseconds()));
    };

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return now;
}

/**
 * The site owner's clock, built from the Laravel props `locale` and `time`.
 * Every time-based value is null until the component has mounted in the browser.
 */
export function useOwnerTime() {
  const { locale, time } = usePage<SharedTimeProps>().props;
  const now = useNow();

  const formatters = useMemo(() => {
    const timeZone = time.timezone;
    return {
      // Laravel locales can be "pt_BR"; Intl expects "pt-BR".
      clock: new Intl.DateTimeFormat(locale.replace('_', '-'), {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone,
      }),
      hour: new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone }),
      weekday: new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone }),
    };
  }, [locale, time.timezone]);

  const parts = now ? formatters.clock.formatToParts(now) : null;
  const part = (type: 'hour' | 'minute') => parts?.find((p) => p.type === type)?.value ?? '';

  return {
    now,
    /** "Europe/Istanbul" -> "Istanbul". */
    city: time.timezone.split('/').pop()?.replaceAll('_', ' ') ?? time.timezone,
    offsetLabel: formatUtcOffset(time.offset),
    clock: parts ? { hours: part('hour'), minutes: part('minute') } : null,
    /** 0-23 in the owner's timezone. */
    hour: now ? Number(formatters.hour.format(now)) : null,
    isWeekend: now ? ['Sat', 'Sun'].includes(formatters.weekday.format(now)) : null,
    /** Minutes the owner is ahead of the visitor (negative = behind). getTimezoneOffset() is minutes *behind* UTC. */
    difference: now ? time.offset + now.getTimezoneOffset() : null,
  };
}
