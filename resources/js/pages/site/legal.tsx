import Container from '@/components/site/container';
import Metadata from '@/components/site/metadata';
import { EMAIL, LEGAL_NAME, MAILTO } from '@/content/profile';
import { formatPostDate, useLocale, useMessages, useRoutes } from '@/i18n';
import {
  type LegalBlock,
  type LegalDocumentKey,
  type LegalSection,
  type LegalTable,
  useLegalDocument,
} from '@/i18n/legal';
import { openCookieSettings } from '@/lib/cookie-consent';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Check, FileText, Mail, ShieldCheck } from 'lucide-react';
import { Fragment, type ReactNode, useEffect, useState } from 'react';

/*
 * /terms-of-service and /privacy-policy: one page for both legal documents (the route
 * passes `document`). A header with the dates, a plain-language summary, then the full
 * text in numbered sections with a table of contents that follows the reader.
 * The copy lives in i18n/legal, per language.
 */

type LegalPageProps = {
  document: LegalDocumentKey;
};

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const inlineLink = cn(
  'text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors',
  focusRing,
);

const number = (index: number) => String(index + 1).padStart(2, '0');

/* -------------------------------------------------------------------------- */
/* Rich text                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Turns the tokens in the legal copy into links: {email}, {owner}, {terms}, {privacy}
 * and {cookieSettings}. Anything else is left as written.
 */
function useRichText() {
  const t = useMessages();
  const routes = useRoutes();
  const terms = useLegalDocument('terms');
  const privacy = useLegalDocument('privacy');

  const tokens: Record<string, ReactNode> = {
    owner: LEGAL_NAME,
    email: (
      <a href={MAILTO} className={inlineLink}>
        {EMAIL}
      </a>
    ),
    terms: (
      <Link href={routes.terms().url} className={inlineLink}>
        {terms.title}
      </Link>
    ),
    privacy: (
      <Link href={routes.privacy().url} className={inlineLink}>
        {privacy.title}
      </Link>
    ),
    cookieSettings: (
      <button type="button" onClick={openCookieSettings} className={inlineLink}>
        {t.legal.cookieSettings}
      </button>
    ),
  };

  return (text: string) =>
    text.split(/(\{\w+\})/).map((part, index) => {
      const token = /^\{(\w+)\}$/.exec(part)?.[1];
      return <Fragment key={index}>{token && token in tokens ? tokens[token] : part}</Fragment>;
    });
}

/* -------------------------------------------------------------------------- */
/* Blocks                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A real table when the text column is wide enough (a container query, so the sidebar
 * counts); narrower, each row becomes a card of label/value pairs.
 */
function Table({ table }: { table: LegalTable }) {
  const rich = useRichText();

  return (
    <>
      <div className="border-border hidden overflow-x-auto border @3xl:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              {table.head.map((cell) => (
                <th
                  key={cell}
                  scope="col"
                  className="text-muted-foreground border-border border-b px-4 py-3 font-mono text-[0.6875rem] font-normal tracking-wide uppercase"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {table.rows.map((row) => (
              <tr key={row[0]} className="align-top">
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className={cn(
                      'px-4 py-3.5 leading-6',
                      index === 0 ? 'text-foreground font-medium' : 'text-muted-foreground',
                    )}
                  >
                    {rich(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 @xl:grid-cols-2 @3xl:hidden">
        {table.rows.map((row) => (
          <li key={row[0]} className="border-border border p-4">
            <p className="text-foreground text-sm leading-6 font-medium">{rich(row[0])}</p>
            <dl className="mt-3 flex flex-col gap-2.5">
              {row.slice(1).map((cell, index) => (
                <div key={index}>
                  <dt className="text-muted-foreground font-mono text-[0.625rem] tracking-wide uppercase">
                    {table.head[index + 1]}
                  </dt>
                  <dd className="text-muted-foreground mt-0.5 text-sm leading-6">{rich(cell)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  const rich = useRichText();

  if (typeof block === 'string') {
    return <p className="text-muted-foreground leading-7 text-pretty">{rich(block)}</p>;
  }

  if ('list' in block) {
    return (
      <ul className="flex flex-col gap-2.5">
        {block.list.map((item) => (
          <li key={item} className="text-muted-foreground flex gap-3 leading-7">
            <span className="bg-foreground/60 mt-[0.7rem] size-1.5 shrink-0" aria-hidden="true" />
            <span className="text-pretty">{rich(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <Table table={block.table} />;
}

/* -------------------------------------------------------------------------- */
/* Parts                                                                      */
/* -------------------------------------------------------------------------- */

function Header({ documentKey }: { documentKey: LegalDocumentKey }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();
  const doc = useLegalDocument(documentKey);
  const otherKey = documentKey === 'terms' ? 'privacy' : 'terms';
  const other = useLegalDocument(otherKey);

  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="py-16 lg:py-24">
          {/* Decoration: the heading below names the page. */}
          <p className="text-primary font-mono text-xs" aria-hidden="true">
            ~/{doc.path}
          </p>

          <h1 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.06em] text-balance">
            {doc.title}
          </h1>

          <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-8 text-pretty">{doc.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="border-border text-muted-foreground inline-flex items-center gap-2 border px-3 py-1.5">
              <FileText className="size-3.5" aria-hidden="true" />
              {t.legal.updated}{' '}
              <time dateTime={doc.updated} className="text-foreground tabular-nums">
                {formatPostDate(doc.updated, locale)}
              </time>
            </span>

            <Link
              href={routes[otherKey]().url}
              className={cn(
                'group border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 inline-flex items-center gap-2 border px-3 py-1.5 transition-colors',
                focusRing,
              )}
            >
              {other.title}
              <ArrowRight
                className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Summary({ points }: { points: readonly string[] }) {
  const t = useMessages();

  return (
    <section aria-labelledby="legal-summary" className="border-border bg-muted/30 relative border p-6 sm:p-8">
      {/* Corner accent, like a terminal window's title bar. */}
      <div aria-hidden="true" className="bg-foreground absolute top-0 left-0 h-px w-16" />
      <div aria-hidden="true" className="bg-foreground absolute top-0 left-0 h-16 w-px" />

      <h2 id="legal-summary" className="flex items-center gap-2 font-mono text-xs">
        <ShieldCheck className="text-primary size-4" aria-hidden="true" />
        {t.legal.summary}
      </h2>

      <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-6">
            <span
              className="border-border bg-background mt-0.5 flex size-5 shrink-0 items-center justify-center border"
              aria-hidden="true"
            >
              <Check className="size-3" />
            </span>
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground border-border mt-6 border-t pt-4 text-xs leading-5">{t.legal.summaryNote}</p>
    </section>
  );
}

/**
 * The id of the section being read: the last one whose heading has passed the line
 * under the sticky site header.
 */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) current = id;
      }
      // At the very bottom the last sections can never reach the line; mark the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}

function Contents({ sections }: { sections: readonly LegalSection[] }) {
  const t = useMessages();
  const [ids] = useState(() => sections.map((section) => section.id));
  const active = useActiveSection(ids);

  return (
    <nav aria-labelledby="legal-contents" className="lg:sticky lg:top-28">
      <h2 id="legal-contents" className="text-muted-foreground font-mono text-xs">
        <span aria-hidden="true">~/</span>
        {t.legal.contents}
      </h2>

      <ol className="border-border mt-4 border-l">
        {sections.map((section, index) => {
          const current = section.id === active;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? 'location' : undefined}
                className={cn(
                  '-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm leading-6 transition-colors',
                  current
                    ? 'border-foreground text-foreground'
                    : 'text-muted-foreground hover:text-foreground border-transparent',
                  focusRing,
                )}
              >
                <span className="font-mono text-xs leading-6 tabular-nums opacity-60">{number(index)}</span>
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Section({ section, index }: { section: LegalSection; index: number }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
      <h2 id={`${section.id}-title`} className="group flex items-baseline gap-4 text-2xl font-medium tracking-tight">
        <span className="text-muted-foreground font-mono text-sm tabular-nums">{number(index)}</span>
        <span className="text-balance">{section.title}</span>
        <a
          href={`#${section.id}`}
          className={cn(
            'text-muted-foreground hover:text-foreground font-mono text-sm opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
            focusRing,
          )}
          aria-label={section.title}
        >
          #
        </a>
      </h2>

      <div className="mt-6 flex flex-col gap-5 sm:pl-10">
        {section.blocks.map((block, blockIndex) => (
          <Block key={blockIndex} block={block} />
        ))}
      </div>
    </section>
  );
}

function Footnote({ documentKey }: { documentKey: LegalDocumentKey }) {
  const t = useMessages();
  const routes = useRoutes();
  const otherKey = documentKey === 'terms' ? 'privacy' : 'terms';
  const other = useLegalDocument(otherKey);

  const card = cn(
    'group border-border hover:bg-muted/40 flex flex-col justify-between gap-6 border p-6 transition-colors',
    focusRing,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link href={routes[otherKey]().url} className={card}>
        <span className="text-muted-foreground font-mono text-xs">{t.legal.readAlso}</span>
        <span className="flex items-center justify-between gap-4 text-lg font-medium tracking-tight">
          {other.title}
          <ArrowRight
            className="text-muted-foreground group-hover:text-foreground size-5 transition-transform motion-safe:group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>

      <a href={MAILTO} className={card}>
        <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          <Mail className="size-3.5" aria-hidden="true" />
          {t.legal.questions}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{t.legal.questionsText}</span>
          <span className="flex items-center justify-between gap-4 text-lg font-medium tracking-tight break-all">
            {EMAIL}
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-foreground size-5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </span>
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Legal({ document: documentKey }: LegalPageProps) {
  const doc = useLegalDocument(documentKey);

  // Opening /privacy-policy#cookies (e.g. from the cookie settings) lands on that section,
  // also when the page arrives through a client-side visit.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [documentKey]);

  return (
    <>
      <Metadata title={doc.title} description={doc.description} />

      <Header documentKey={documentKey} />

      <Container border={true}>
        <div className="grid gap-12 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <aside>
            <Contents key={documentKey} sections={doc.sections} />
          </aside>

          <div className="@container flex min-w-0 flex-col gap-16 lg:max-w-4xl">
            <Summary points={doc.summary} />

            {doc.sections.map((section, index) => (
              <Section key={section.id} section={section} index={index} />
            ))}

            <Footnote documentKey={documentKey} />
          </div>
        </div>
      </Container>
    </>
  );
}
