import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { describeDifference, useOwnerTime } from '@/hooks/use-owner-time';
import { cn } from 'cn';
import { ChevronDown, Pause, Play } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import {
  ABOUT_DESCRIPTION,
  BODY,
  CAREER_START,
  FOCUS,
  FOCUS_AREAS,
  LEAD,
  LOCATION,
  ROLE,
  STACK,
  yearsSince,
} from '@/content/profile';

type Fact = {
  label: string;
  value: ReactNode;
};

const STACK_SPLIT = Math.ceil(STACK.length / 2);
const STACK_ROW_ONE = STACK.slice(0, STACK_SPLIT);
const STACK_ROW_TWO = STACK.slice(STACK_SPLIT);

const subheading = 'text-muted-foreground font-mono text-xs font-normal';

/* -------------------------------------------------------------------------- */
/* Shared                                                                     */
/* -------------------------------------------------------------------------- */

/** One cell of the 2x2 grid: a labelled region with a mono sub-heading and an optional action. */
function Cell({
  id,
  title,
  action,
  className,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    // min-w-0: grid items default to min-width:auto, so a wide child (the marquee track) would stretch the cell.
    <section aria-labelledby={id} className={cn('border-border min-w-0 p-8', className)}>
      <div className="flex items-center justify-between gap-4">
        <h3 id={id} className={subheading}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Label/value rows used by both columns so they share one rhythm. */
function DefinitionList({ items, strongValues = false }: { items: readonly Fact[]; strongValues?: boolean }) {
  return (
    <dl className="mt-4">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="border-border grid gap-1 border-b py-4 first:border-t sm:grid-cols-[6rem_1fr] sm:gap-4"
        >
          <dt className="text-muted-foreground text-sm leading-6">{label}</dt>
          {/* Time-based values can differ from the prerendered HTML; the client value wins after mount. */}
          <dd className={cn('text-sm leading-6', strongValues && 'font-medium')} suppressHydrationWarning>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* Details                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Timezone label and clock, plus the offset from the visitor's own timezone.
 * Not a live region on purpose: a clock that announces every minute is noise.
 */
function LocalTime({
  offsetLabel,
  time,
  difference,
}: {
  offsetLabel: string;
  time: string | null;
  difference: number | null;
}) {
  return (
    <>
      <span className="flex items-baseline gap-2">
        {offsetLabel}
        {time && (
          <time dateTime={time} className="text-muted-foreground tabular-nums">
            {time}
          </time>
        )}
      </span>
      {/* min-h reserves the line so the layout does not jump when the clock mounts. */}
      <span className="text-muted-foreground block min-h-6 text-sm font-normal">
        {difference !== null && describeDifference(difference)}
      </span>
    </>
  );
}

function DetailsCell() {
  // Timezone, locale and offset come from Laravel; see use-owner-time.ts.
  const { now, offsetLabel, clock, difference } = useOwnerTime();
  const years = yearsSince(CAREER_START, now ?? new Date());
  const time = clock && `${clock.hours}:${clock.minutes}`;

  const facts: readonly Fact[] = [
    { label: 'Role', value: ROLE },
    { label: 'Location', value: LOCATION },
    { label: 'Experience', value: `${years}+ years` },
    { label: 'Focus', value: FOCUS },
    { label: 'Timezone', value: <LocalTime offsetLabel={offsetLabel} time={time} difference={difference} /> },
  ];

  return (
    <Cell id="about-details-title" title="Details" className="border-b">
      <DefinitionList items={facts} strongValues />
    </Cell>
  );
}

/* -------------------------------------------------------------------------- */
/* Stack marquee                                                              */
/* -------------------------------------------------------------------------- */

function StackList({
  items,
  hidden = false,
  label,
  labelledBy,
  className,
}: {
  items: readonly string[];
  hidden?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <ul
      className={cn('flex shrink-0 gap-2 pr-2', className)}
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      aria-labelledby={hidden ? undefined : labelledBy}
    >
      {items.map((item) => (
        <li key={item}>
          <Badge variant="outline" className="whitespace-nowrap">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

/**
 * One auto-scrolling row. Needs `--animate-marquee` (see app.css note).
 * The duplicated list is aria-hidden so screen readers read each item once.
 * With prefers-reduced-motion the track stops, the copy is removed and the
 * items wrap like a normal tag cloud.
 */
function MarqueeRow({
  items,
  paused,
  reverse = false,
  label,
  labelledBy,
}: {
  items: readonly string[];
  paused: boolean;
  reverse?: boolean;
  label?: string;
  labelledBy?: string;
}) {
  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:mask-none">
      <div
        data-paused={paused}
        className={cn(
          'motion-safe:animate-marquee hover:paused data-[paused=true]:paused flex w-max motion-reduce:w-auto',
          reverse && 'shimmer-reverse',
        )}
      >
        <StackList items={items} label={label} labelledBy={labelledBy} className="motion-reduce:flex-wrap" />
        <StackList items={items} hidden className="motion-reduce:hidden" />
      </div>
    </div>
  );
}

function StackSection() {
  const [paused, setPaused] = useState(false);

  return (
    <Cell
      id="about-stack-title"
      title="Stack"
      className="border-b"
      action={
        // WCAG 2.2.2: moving content needs a pause control. Hover also pauses.
        // Small button: h-6 keeps the 24px minimum target size (WCAG 2.5.8).
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPaused((prev) => !prev)}
          className="text-muted-foreground -my-1 -mr-2 h-6 gap-1.5 px-2 font-mono text-xs motion-reduce:hidden"
        >
          {paused ? <Play className="size-3" aria-hidden="true" /> : <Pause className="size-3" aria-hidden="true" />}
          {paused ? 'Play' : 'Pause'}
          <span className="sr-only">scrolling</span>
        </Button>
      }
    >
      <p className="text-muted-foreground mt-4 text-sm leading-7 text-pretty">
        Languages, frameworks and tools I use day to day, from web apps to native iOS.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <MarqueeRow items={STACK_ROW_ONE} paused={paused} labelledBy="about-stack-title" />
        <MarqueeRow items={STACK_ROW_TWO} paused={paused} reverse label="Stack, continued" />
      </div>
    </Cell>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <section className="border-border border-t" id="about" aria-labelledby="about-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="about-title"
            path="about"
            tagline="A bit about me"
            title="Building the web, end to end."
            description={ABOUT_DESCRIPTION}
          />

          {/*
            2x2 grid: each row is one pair, so tops and bottoms line up.
            Row 1 (always visible): Bio | Details
            Row 2 (toggle):         What I do | Stack
          */}
          <div className="border-border bg-muted/30 mt-8 grid grid-cols-1 border md:mt-16 md:grid-cols-2">
            <Cell id="about-bio-title" title="Bio" className="max-md:border-b md:border-r md:border-b">
              <div className="mt-4 flex flex-col gap-6">
                <p className="max-w-md text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
                  {LEAD}
                </p>
                <p className="text-muted-foreground max-w-md text-sm leading-7 text-pretty">{BODY}</p>
              </div>
            </Cell>

            <DetailsCell />

            {/* Stays in the DOM when collapsed so aria-controls always points at a real element. */}
            <div
              id={panelId}
              className={cn('min-w-0 grid-cols-1 md:col-span-2 md:grid-cols-2', expanded ? 'grid' : 'hidden')}
            >
              <Cell id="about-focus-title" title="What I do" className="border-b md:border-r">
                <DefinitionList items={FOCUS_AREAS} />
              </Cell>

              <StackSection />
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="text-muted-foreground hover:text-primary h-auto w-full justify-start gap-3 rounded-none px-8 py-4 text-sm md:col-span-2"
            >
              <span className="font-medium">{expanded ? 'Show less' : 'Show more'}</span>
              {!expanded && (
                <>
                  <Badge variant="outline" aria-hidden="true">
                    +2
                  </Badge>
                  <span className="sr-only">(2 more sections: What I do and Stack)</span>
                </>
              )}
              <ChevronDown
                className={cn('ml-auto transition-transform motion-reduce:transition-none', expanded && 'rotate-180')}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
