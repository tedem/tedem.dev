import Container from '@/components/site/container';
import { Button } from '@/components/ui/button';
import { TextAnimate } from '@/components/ui/text-animate';
import { useOwnerTime } from '@/hooks/use-owner-time';
import { useMessages } from '@/i18n';
import { cn } from '@/lib/utils';
import { formatHour, isAtDesk, NAME, WORKING_HOURS } from '@/content/profile';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useSyncExternalStore } from 'react';

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const SCALE_LABELS = ['00:00', '06:00', '12:00', '18:00'];

/* -------------------------------------------------------------------------- */
/* Hooks                                                                      */
/* -------------------------------------------------------------------------- */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/** True when the visitor asked the OS for less motion. Reacts to live changes. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/* -------------------------------------------------------------------------- */
/* Left column                                                                */
/* -------------------------------------------------------------------------- */

function Eyebrow() {
  const t = useMessages();

  return (
    <p className="mbe-6 font-mono text-[13px]">
      {/* The comment markers are decoration; screen readers would read them as symbols. */}
      <span className="text-muted-foreground" aria-hidden="true">
        /**
      </span>
      <span className="mx-[1ch]">{t.hero.eyebrow}</span>
      <span className="text-muted-foreground" aria-hidden="true">
        */
      </span>
    </p>
  );
}

function Title() {
  const reducedMotion = usePrefersReducedMotion();
  const greeting = useMessages().hero.greeting;
  const nameClass = 'text-muted-foreground block font-extrabold';

  return (
    <h1 id="hero-title" className="text-[clamp(5rem,10.6vw,9.375rem)] leading-none">
      {/* Read once as plain text. The per-character animation below is visual only,
          otherwise assistive tech may announce the name letter by letter. */}
      <span className="sr-only">{`${greeting} ${NAME}.`}</span>

      <span aria-hidden="true">
        <span className="block font-extralight tracking-[-0.075em]">{greeting}</span>
        {reducedMotion ? (
          <span className={nameClass}>{NAME}.</span>
        ) : (
          <TextAnimate className={nameClass} animation="slideLeft" by="character" as="span">
            {`${NAME}.`}
          </TextAnimate>
        )}
      </span>
    </h1>
  );
}

function Actions() {
  const t = useMessages();

  // Plain anchors: in-page hash links need no Inertia visit.
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button asChild size="lg">
        <a href="#work">
          {t.hero.exploreWork}
          <ArrowDown aria-hidden="true" />
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href="#about">
          {t.hero.aboutMe}
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Right column: a day in the owner's timezone                                */
/* -------------------------------------------------------------------------- */

function StatusDot({ active }: { active: boolean }) {
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

/**
 * 24 bars, one per hour of the owner's day. Taller bars are working hours, the
 * highlighted bar is "now". Purely visual: the same facts are written out in
 * text next to it, so the whole chart is hidden from assistive tech.
 */
function DayStrip({ currentHour }: { currentHour: number | null }) {
  return (
    <div aria-hidden="true">
      <div className="flex h-10 items-end gap-0.5 sm:gap-1">
        {HOURS.map((hour) => {
          const inShift = hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end;
          const isCurrent = hour === currentHour;

          return (
            <span
              key={hour}
              className={cn(
                'flex-1',
                inShift ? 'h-full' : 'h-5',
                isCurrent ? 'bg-primary motion-safe:animate-pulse' : inShift ? 'bg-muted-foreground/40' : 'bg-border',
              )}
            />
          );
        })}
      </div>

      <div className="text-muted-foreground mt-2 grid grid-cols-4 font-mono text-xs">
        {SCALE_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Big clock for the owner's timezone (from Laravel), a "probably at my desk"
 * hint and the offset from the visitor's own timezone.
 */
function TimeCard({ className }: { className?: string }) {
  const { city, offsetLabel, clock, hour, isWeekend, differenceLabel } = useOwnerTime();
  const t = useMessages();

  const ready = clock !== null && hour !== null;
  const atDesk = ready && isAtDesk(hour, isWeekend ?? false);
  const time = clock && `${clock.hours}:${clock.minutes}`;

  return (
    <section aria-labelledby="hero-time-title" className={cn('border-border bg-muted/30 border', className)}>
      <div className="border-border text-muted-foreground flex items-center justify-between gap-4 border-b px-6 py-3 font-mono text-xs">
        <p id="hero-time-title">{t.time.timeIn(city)}</p>
        <p>{offsetLabel}</p>
      </div>

      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <div>
          <p className="text-[clamp(4rem,8vw,7rem)] leading-none font-extralight tracking-[-0.075em] tabular-nums">
            {clock ? (
              <time dateTime={time ?? undefined}>
                <span className="sr-only">{time}</span>
                <span aria-hidden="true">
                  {clock.hours}
                  <span className="motion-safe:animate-pulse">:</span>
                  {clock.minutes}
                </span>
              </time>
            ) : (
              // Placeholder until the browser knows the time; keeps the card from jumping.
              <span aria-hidden="true">--:--</span>
            )}
          </p>

          {/* min-h reserves each line so nothing shifts when the clock mounts. */}
          <p className="mt-6 flex min-h-6 items-center gap-2 text-sm">
            {ready && (
              <>
                <StatusDot active={atDesk} />
                {atDesk ? t.time.atDesk : t.time.awayFromDesk}
              </>
            )}
          </p>
          <p className="text-muted-foreground min-h-6 text-sm">{differenceLabel}</p>
        </div>

        <div>
          <DayStrip currentHour={hour} />
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            {t.time.workingHours(formatHour(WORKING_HOURS.start), formatHour(WORKING_HOURS.end), city)}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const t = useMessages();

  return (
    <section id="hero" aria-labelledby="hero-title">
      <Container border={true}>
        <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <Eyebrow />
            <Title />

            <p className="text-muted-foreground mbs-8 mbe-7 max-w-lg text-base leading-relaxed tracking-tight text-balance md:text-lg">
              {t.hero.intro}
            </p>

            <Actions />
          </div>

          <TimeCard className="lg:self-end" />
        </div>
      </Container>
    </section>
  );
}
