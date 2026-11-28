import { LOCALES, useLocale, useMessages } from '@/i18n';
import { cn } from '@/lib/utils';
import type { Post } from '@/types';
import { type ReactNode, type RefObject, useEffect, useState } from 'react';

/*
 * The post page's right rail, below the table of contents: how far the reader has got
 * (live, as they scroll) and the post in numbers. Counts come from the server
 * (App\Models\Post::stats()); numbers are formatted for the page's language.
 */

/** Blocks in the progress meter: each stands for 5%. */
const SEGMENTS = 20;

/**
 * How much of the target has been scrolled past, as a whole percentage. Updates at most
 * once a frame, and only re-renders when the percentage changes.
 */
export function useReadingPercent(target: RefObject<HTMLElement | null>) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const element = target.current;
      if (!element) return;
      const { top, height } = element.getBoundingClientRect();
      const distance = height - window.innerHeight;
      const progress = distance <= 0 ? 1 : Math.min(1, Math.max(0, -top / distance));
      setPercent(Math.round(progress * 100));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [target]);

  return percent;
}

function PanelTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-muted-foreground mb-4 font-mono text-xs">
      <span aria-hidden="true">~/</span>
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/* Reading                                                                    */
/* -------------------------------------------------------------------------- */

export function ReadingPanel({ target, minutes }: { target: RefObject<HTMLElement | null>; minutes: number }) {
  const t = useMessages();
  const percent = useReadingPercent(target);
  const filled = Math.round((percent / 100) * SEGMENTS);
  const left = Math.max(1, Math.ceil(minutes * (1 - percent / 100)));

  const status =
    percent >= 100 ? t.posts.rail.done : percent === 0 ? t.posts.rail.notStarted : t.posts.rail.remaining(left);

  return (
    <section aria-labelledby="rail-reading">
      <PanelTitle id="rail-reading">{t.posts.rail.reading}</PanelTitle>

      <div className="flex items-baseline justify-between gap-2 font-mono">
        <span className="text-3xl leading-none font-medium tracking-tighter tabular-nums">
          {percent}
          <span className="text-muted-foreground text-base">%</span>
        </span>
        <span className="text-muted-foreground text-[0.6875rem]">{t.posts.rail.progress}</span>
      </div>

      {/* A segmented meter, like a terminal progress bar. The number above carries the value. */}
      <div aria-hidden="true" className="mt-3 grid grid-cols-20 gap-0.5">
        {Array.from({ length: SEGMENTS }, (_, index) => (
          <span
            key={index}
            className={cn(
              'h-2 transition-colors duration-300',
              index < filled ? 'bg-foreground' : 'bg-muted',
              index === filled - 1 && percent < 100 && 'motion-safe:animate-pulse',
            )}
          />
        ))}
      </div>

      <p
        className={cn(
          'mt-2 truncate font-mono text-[0.6875rem]',
          percent >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground',
        )}
      >
        {status}
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

/** Whole days since a "YYYY-MM-DD" day; worked out in the browser, so never stale in a cached page. */
function useDaysSince(day: string) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const start = Date.parse(`${day}T00:00:00Z`);
    const today = Date.parse(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
    setDays(Math.max(0, Math.round((today - start) / 86_400_000)));
  }, [day]);

  return days;
}

/** A label and a value joined by a dotted leader, like a table of contents in print. */
function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2 text-xs">
      <dt className="text-muted-foreground min-w-0">
        {label}
        {hint && <span className="text-muted-foreground/60"> ({hint})</span>}
      </dt>
      <span aria-hidden="true" className="border-border mb-1 min-w-4 flex-1 border-b border-dotted" />
      <dd className="text-foreground shrink-0 font-mono tabular-nums">{children}</dd>
    </div>
  );
}

export function StatsPanel({ post, commentCount }: { post: Post; commentCount: number }) {
  const locale = useLocale();
  const t = useMessages();
  const { intl, label: language } = LOCALES[locale];
  const number = new Intl.NumberFormat(intl);
  // Numeric, so the value column stays narrow: "25.11.2026" / "25/11/2026".
  const date = new Intl.DateTimeFormat(intl, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
  const days = useDaysSince(post.publishedAt);
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : null;
  const { stats } = post;

  const format = (day: string) => date.format(new Date(`${day}T00:00:00Z`));

  return (
    <section aria-labelledby="rail-stats">
      <PanelTitle id="rail-stats">{t.posts.rail.stats}</PanelTitle>

      <dl className="flex flex-col gap-2">
        <Row label={t.posts.rail.words}>{number.format(stats.words)}</Row>
        <Row label={t.posts.rail.characters}>{number.format(stats.characters)}</Row>
        <Row label={t.posts.rail.characters} hint={t.posts.rail.charactersHint}>
          {number.format(stats.charactersWithoutSpaces)}
        </Row>
        <Row label={t.posts.rail.readingTime}>{t.common.minutes(post.readingMinutes)}</Row>
        {stats.headings > 0 && <Row label={t.posts.rail.headings}>{number.format(stats.headings)}</Row>}
        {stats.codeBlocks > 0 && <Row label={t.posts.rail.codeBlocks}>{number.format(stats.codeBlocks)}</Row>}
        {stats.links > 0 && <Row label={t.posts.rail.links}>{number.format(stats.links)}</Row>}
        {stats.images > 0 && <Row label={t.posts.rail.images}>{number.format(stats.images)}</Row>}
        <Row label={t.posts.rail.comments}>{number.format(commentCount)}</Row>
      </dl>

      <dl className="border-border mt-4 flex flex-col gap-2 border-t border-dashed pt-4">
        <Row label={t.posts.rail.published}>
          <time dateTime={post.publishedAt}>{format(post.publishedAt)}</time>
        </Row>
        {days !== null && <Row label={t.posts.rail.ageLabel}>{t.posts.rail.age(days)}</Row>}
        {updated && (
          <Row label={t.posts.rail.updated}>
            <time dateTime={updated}>{format(updated)}</time>
          </Row>
        )}
        <Row label={t.posts.rail.language}>{language}</Row>
        <Row label={t.posts.rail.id}>#{post.publicId}</Row>
      </dl>
    </section>
  );
}
