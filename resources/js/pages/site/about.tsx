import Container from '@/components/site/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CAREER_START, EMAIL, MAILTO, SOCIALS, STACK_GROUPS, yearsSince } from '@/content/profile';
import { useOwnerTime } from '@/hooks/use-owner-time';
import { type Messages, useMessages } from '@/i18n';
import Metadata from '@/components/site/metadata';
import { ArrowUpRight, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

/*
 * /about reads like a document rather than a landing page: a sticky index with the
 * key facts on the left, and numbered chapters on the right. The copy lives in
 * i18n/messages and the data in content/profile.ts, both shared with the home page.
 */

type Chapter = {
  /** Anchor id, the same in every language so shared links keep working. */
  id: string;
  key: keyof Messages['aboutPage']['chapters'];
};

const CHAPTERS: readonly Chapter[] = [
  { id: 'what-i-do', key: 'whatIDo' },
  { id: 'how-i-work', key: 'howIWork' },
  { id: 'stack', key: 'stack' },
  { id: 'elsewhere', key: 'elsewhere' },
];

const pad = (value: number) => String(value).padStart(2, '0');

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* -------------------------------------------------------------------------- */
/* Intro                                                                      */
/* -------------------------------------------------------------------------- */

function Intro() {
  const t = useMessages();

  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="py-16 lg:py-24">
          <p className="text-primary font-mono text-xs">
            {/* Decoration: the heading below names the page. */}
            <span aria-hidden="true">~/{t.paths.about}</span>
          </p>

          <h1 className="mt-6 max-w-5xl text-[clamp(2.25rem,5.2vw,4.5rem)] leading-[1.05] font-medium tracking-[-0.05em] text-balance">
            {t.profile.lead}
          </h1>

          <p className="text-muted-foreground mt-8 max-w-2xl text-base leading-8 text-pretty">{t.profile.body}</p>
        </div>
      </Container>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function AtAGlance() {
  // Timezone, locale and offset come from Laravel; see use-owner-time.ts.
  const { now, offsetLabel, clock, differenceLabel } = useOwnerTime();
  const t = useMessages();
  const years = yearsSince(CAREER_START, now ?? new Date());
  const time = clock && `${clock.hours}:${clock.minutes}`;

  const facts: readonly { label: string; value: ReactNode }[] = [
    { label: t.aboutPage.role, value: t.profile.role },
    { label: t.aboutPage.basedIn, value: t.profile.location },
    { label: t.aboutPage.experience, value: t.aboutSection.years(years) },
    { label: t.aboutPage.focus, value: t.profile.focus },
    {
      label: t.aboutPage.localTime,
      value: (
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
          <span className="text-muted-foreground block min-h-5 text-xs">{differenceLabel}</span>
        </>
      ),
    },
  ];

  return (
    <section aria-labelledby="glance-title" className="border-border bg-muted/30 border p-6">
      <h2 id="glance-title" className="text-muted-foreground font-mono text-xs font-normal">
        {t.aboutPage.atAGlance}
      </h2>

      <dl className="mt-4 flex flex-col gap-4">
        {facts.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-muted-foreground text-xs">{label}</dt>
            {/* Time-based values can differ from the prerendered HTML; the client value wins after mount. */}
            <dd className="mt-1 text-sm font-medium" suppressHydrationWarning>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function OnThisPage() {
  const t = useMessages();

  return (
    <nav aria-labelledby="toc-title" className="max-lg:hidden">
      <h2 id="toc-title" className="text-muted-foreground font-mono text-xs font-normal">
        {t.aboutPage.onThisPage}
      </h2>

      <ol className="mt-4 flex flex-col gap-1">
        {CHAPTERS.map(({ id, key }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`group hover:text-primary flex items-baseline gap-3 py-1 text-sm transition-colors ${focusRing}`}
            >
              <span className="text-muted-foreground group-hover:text-primary font-mono text-xs tabular-nums">
                {pad(index + 1)}
              </span>
              {t.aboutPage.chapters[key]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Chapters                                                                   */
/* -------------------------------------------------------------------------- */

/** A numbered chapter. scroll-mt clears the sticky site header when jumping from the index. */
function ChapterSection({ index, children }: { index: number; children: ReactNode }) {
  const { id, key } = CHAPTERS[index];
  const title = useMessages().aboutPage.chapters[key];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-border scroll-mt-24 border-t py-12 first:border-t-0 first:pt-0 lg:py-16"
    >
      <div className="grid gap-6 md:grid-cols-[5rem_1fr]">
        <p className="text-primary font-mono text-xs tabular-nums md:pt-2" aria-hidden="true">
          {pad(index + 1)}
        </p>

        <div className="min-w-0">
          <h2 id={`${id}-title`} className="text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  const t = useMessages();

  return (
    <ChapterSection index={0}>
      <ul className="flex flex-col gap-8">
        {t.profile.focusAreas.map(({ label, value }) => (
          <li key={label} className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-8">
            <span className="font-medium">{label}</span>
            <span className="text-muted-foreground leading-7 text-pretty">{value}</span>
          </li>
        ))}
      </ul>
    </ChapterSection>
  );
}

function HowIWork() {
  const t = useMessages();

  return (
    <ChapterSection index={1}>
      {/* role="list" keeps the list semantics in Safari, which drops them for unstyled lists. */}
      <ol role="list" className="flex flex-col gap-10">
        {t.profile.principles.map(({ title, detail }, index) => (
          <li key={title} className="border-primary border-l-2 pl-6">
            <p className="text-muted-foreground font-mono text-xs tabular-nums" aria-hidden="true">
              {t.aboutPage.step(index + 1)}
            </p>
            <p className="mt-2 text-xl font-medium tracking-tight text-balance">{title}</p>
            <p className="text-muted-foreground mt-2 max-w-xl leading-7 text-pretty">{detail}</p>
          </li>
        ))}
      </ol>
    </ChapterSection>
  );
}

function Stack() {
  const labels = useMessages().profile.stackGroups;

  return (
    <ChapterSection index={2}>
      <dl className="border-border grid border sm:grid-cols-2">
        {STACK_GROUPS.map(({ key, items }) => (
          <div key={key} className="border-border p-6 max-sm:not-last:border-b sm:odd:border-r sm:nth-[-n+2]:border-b">
            <dt className="text-muted-foreground font-mono text-xs">{labels[key]}</dt>
            <dd className="mt-4">
              <ul className="flex flex-wrap gap-2" aria-label={labels[key]}>
                {items.map((item) => (
                  <li key={item}>
                    <Badge variant="outline">{item}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </ChapterSection>
  );
}

function Elsewhere() {
  const t = useMessages();

  return (
    <ChapterSection index={3}>
      <p className="text-muted-foreground max-w-xl leading-7 text-pretty">{t.aboutPage.elsewhereText}</p>

      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {SOCIALS.map(({ href, label, handle, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group border-border hover:border-primary flex items-center gap-4 border p-4 transition-colors ${focusRing}`}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="font-medium">{label}</span>
              <span className="text-muted-foreground ml-auto truncate text-sm">{handle}</span>
              <span className="sr-only">{t.common.opensInNewTab}</span>
              <ArrowUpRight
                className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>

      <Button size="lg" className="mt-8" asChild>
        <a href={MAILTO}>
          <Mail aria-hidden="true" />
          {EMAIL}
        </a>
      </Button>
    </ChapterSection>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  const t = useMessages();

  return (
    <>
      <Metadata title={t.nav.about} description={t.profile.aboutDescription} type="profile" pageType="ProfilePage" />

      <Intro />

      <Container border={true}>
        <div className="grid gap-12 py-12 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-16">
          {/* Sticky below the 4rem site header on large screens; a plain block above the chapters on small ones. */}
          <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <AtAGlance />
            <OnThisPage />
          </aside>

          <div className="min-w-0">
            <WhatIDo />
            <HowIWork />
            <Stack />
            <Elsewhere />
          </div>
        </div>
      </Container>
    </>
  );
}
