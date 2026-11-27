import Container from '@/components/site/container';
import { Button } from '@/components/ui/button';
import {
  AVAILABILITY,
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  EMAIL,
  MAILTO,
  MAILTO_WITH_SUBJECT,
  REPLY_TIME,
  SOCIALS,
  WORKING_HOURS,
  formatHour,
  isAtDesk,
} from '@/content/profile';
import { useCopyToClipboard, type CopyStatus } from '@/hooks/use-copy-to-clipboard';
import { describeDifference, useOwnerTime } from '@/hooks/use-owner-time';
import { cn } from '@/lib/utils';
import Metadata from '@/components/site/metadata';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

/*
 * /contact is built around one action: writing an email. The address is the biggest
 * thing on the page; below it, a strip answers "when will I hear back?" and the
 * other channels sit in a row of tiles. All copy comes from content/profile.ts.
 */

const COPY_MESSAGES: Record<CopyStatus, string> = {
  idle: '',
  copied: 'Email address copied to clipboard',
  error: 'Could not copy the email address. Use the email link instead.',
};

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const label = 'text-muted-foreground font-mono text-xs font-normal';

function PulseDot({ active = true }: { active?: boolean }) {
  if (!active) {
    return <span className="bg-muted-foreground/50 inline-flex size-2 rounded-full" aria-hidden="true" />;
  }

  return (
    <span className="relative inline-flex size-2" aria-hidden="true">
      <span className="absolute inline-flex size-full rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Intro                                                                      */
/* -------------------------------------------------------------------------- */

function Intro() {
  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="py-16 lg:py-24">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
            {/* Decoration: the heading below names the page. */}
            <span className="text-primary" aria-hidden="true">
              ~/contact
            </span>
            <span className="border-border text-muted-foreground flex items-center gap-2 border px-3 py-1">
              <PulseDot />
              {AVAILABILITY}
            </span>
          </div>

          <h1 className="mt-6 text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.075em] text-balance">
            {CONTACT_TITLE}
          </h1>

          <p className="text-muted-foreground mt-8 max-w-xl text-base leading-8 text-pretty">{CONTACT_DESCRIPTION}</p>
        </div>
      </Container>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Email                                                                      */
/* -------------------------------------------------------------------------- */

function WriteToMe() {
  const { status, copy } = useCopyToClipboard();
  const copied = status === 'copied';

  return (
    <section aria-labelledby="email-title" className="border-border bg-muted/30 border">
      <div className="border-border flex items-center justify-between gap-4 border-b px-6 py-3">
        <h2 id="email-title" className={label}>
          Write to me
        </h2>
        <p className={label}>mailto</p>
      </div>

      <div className="flex flex-col gap-10 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
        <a
          href={MAILTO}
          className={cn(
            'hover:text-primary rounded-sm text-[clamp(1.75rem,6vw,4.5rem)] leading-none font-medium tracking-[-0.05em] break-all transition-colors',
            focusRing,
          )}
        >
          {EMAIL}
        </a>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href={MAILTO_WITH_SUBJECT}>
              <Mail aria-hidden="true" />
              Start an email
            </a>
          </Button>
          <Button size="lg" variant="outline" type="button" onClick={() => copy(EMAIL)}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy address'}
          </Button>

          {/* Announces success or failure; the button label alone is not announced. */}
          <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {COPY_MESSAGES[status]}
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Timing                                                                     */
/* -------------------------------------------------------------------------- */

function TimingItem({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-border p-6 max-md:not-last:border-b md:not-last:border-r">
      <dt className={label}>{term}</dt>
      {/* Time-based values can differ from the prerendered HTML; the client value wins after mount. */}
      <dd className="mt-3" suppressHydrationWarning>
        {children}
      </dd>
    </div>
  );
}

function Timing() {
  // Timezone, locale and offset come from Laravel; see use-owner-time.ts.
  const { city, offsetLabel, clock, hour, isWeekend, difference } = useOwnerTime();
  const ready = clock !== null && hour !== null;
  const atDesk = ready && isAtDesk(hour, isWeekend ?? false);
  const time = clock && `${clock.hours}:${clock.minutes}`;

  return (
    <section aria-labelledby="timing-title">
      <h2 id="timing-title" className={cn(label, 'mb-4')}>
        When to expect a reply
      </h2>

      <dl className="border-border grid border md:grid-cols-3">
        <TimingItem term="Reply time">
          <p className="text-lg font-medium">{REPLY_TIME}</p>
        </TimingItem>

        <TimingItem term={`Local time in ${city}`}>
          <p className="flex items-baseline gap-3 text-lg font-medium">
            {/* Placeholder until the browser knows the time; keeps the strip from jumping. */}
            <span className="tabular-nums">{time ? <time dateTime={time}>{time}</time> : '--:--'}</span>
            <span className="text-muted-foreground text-sm font-normal">{offsetLabel}</span>
          </p>
          {/* min-h reserves each line so nothing shifts when the clock mounts. */}
          <p className="mt-2 flex min-h-5 items-center gap-2 text-sm">
            {ready && (
              <>
                <PulseDot active={atDesk} />
                {atDesk ? 'Probably at my desk' : 'Probably away from my desk'}
              </>
            )}
          </p>
          <p className="text-muted-foreground min-h-5 text-sm">
            {difference !== null && describeDifference(difference)}
          </p>
        </TimingItem>

        <TimingItem term="Working hours">
          <p className="text-lg font-medium tabular-nums">
            {formatHour(WORKING_HOURS.start)}–{formatHour(WORKING_HOURS.end)}
          </p>
          <p className="text-muted-foreground mt-2 text-sm">Weekdays, {city} time</p>
        </TimingItem>
      </dl>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Elsewhere                                                                  */
/* -------------------------------------------------------------------------- */

function Elsewhere() {
  return (
    <section aria-labelledby="elsewhere-title">
      <h2 id="elsewhere-title" className={cn(label, 'mb-4')}>
        Elsewhere
      </h2>

      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {SOCIALS.map(({ href, label: name, handle, icon: Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group border-border hover:border-primary hover:bg-muted/30 flex aspect-square flex-col justify-between border p-5 transition-colors sm:aspect-[4/3]',
                focusRing,
              )}
            >
              <span className="flex items-start justify-between">
                <Icon className="size-7" aria-hidden="true" />
                <ArrowUpRight
                  className="text-muted-foreground group-hover:text-primary size-4 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
              <span>
                <span className="block font-medium">{name}</span>
                <span className="text-muted-foreground block truncate text-sm">{handle}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  return (
    <>
      <Metadata title="Contact" description={CONTACT_DESCRIPTION} pageType="ContactPage" />

      <Intro />

      <Container border={true}>
        <div className="flex flex-col gap-12 py-12 lg:gap-16 lg:py-16">
          <WriteToMe />
          <Timing />
          <Elsewhere />
        </div>
      </Container>
    </>
  );
}
