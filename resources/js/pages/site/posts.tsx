import Container from '@/components/site/container';
import Metadata from '@/components/site/metadata';
import { Button } from '@/components/ui/button';
import { formatPostDate, LOCALES, useLocale, useMessages, useRoutes } from '@/i18n';
import { cn } from '@/lib/utils';
import type { PostListItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowDownUp, ArrowLeft, ArrowRight, ArrowUpRight, Clock, MessageSquare, Search, X } from 'lucide-react';
import { type ReactNode, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

/*
 * /posts: a header with the archive in numbers, the latest post as a feature, then the
 * whole archive grouped by year, with an instant search (press "/") and a sort toggle.
 * Everything is filtered in the browser: the list is small and already on the page.
 */

type Order = 'newest' | 'oldest';

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Lowercased and without accents, so "yazi" finds "yazı" and "cafe" finds "café". */
function normalize(text: string, locale: string) {
  return text
    .toLocaleLowerCase(locale)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ı/g, 'i');
}

/** The text with every match of the query wrapped in <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const locale = LOCALES[useLocale()].intl;

  if (!query) return <>{text}</>;

  // Normalizing keeps the length for these scripts, so indexes map back onto the original text.
  const haystack = normalize(text, locale);
  const needle = normalize(query, locale);
  if (haystack.length !== text.length) return <>{text}</>;

  const parts: ReactNode[] = [];
  let from = 0;
  let index = haystack.indexOf(needle);

  while (index !== -1 && needle) {
    parts.push(text.slice(from, index));
    parts.push(
      <mark key={index} className="bg-primary/15 text-foreground decoration-primary underline underline-offset-4">
        {text.slice(index, index + needle.length)}
      </mark>,
    );
    from = index + needle.length;
    index = haystack.indexOf(needle, from);
  }
  parts.push(text.slice(from));

  return <>{parts}</>;
}

function PostMeta({ post, className }: { post: PostListItem; className?: string }) {
  const t = useMessages();

  return (
    <span
      className={cn('text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs', className)}
    >
      <span className="inline-flex items-center gap-1.5 tabular-nums">
        <Clock className="size-3.5" aria-hidden="true" />
        {t.common.minutesRead(post.readingMinutes)}
      </span>
      {post.commentCount > 0 && (
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <MessageSquare className="size-3.5" aria-hidden="true" />
          {t.posts.comments(post.commentCount)}
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Intro                                                                      */
/* -------------------------------------------------------------------------- */

function Stats({ posts }: { posts: readonly PostListItem[] }) {
  const t = useMessages();

  if (posts.length === 0) return null;

  const minutes = posts.reduce((total, post) => total + post.readingMinutes, 0);
  const firstYear = Math.min(...posts.map((post) => Number(post.publishedAt.slice(0, 4))));

  const items = [t.posts.stats.posts(posts.length), t.posts.stats.minutes(minutes), t.posts.stats.since(firstYear)];

  return (
    <ul aria-label={t.posts.stats.label} className="mt-10 flex flex-wrap gap-2 font-mono text-xs">
      {items.map((item) => (
        <li key={item} className="border-border text-muted-foreground border px-3 py-1.5 tabular-nums">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Intro({ posts }: { posts: readonly PostListItem[] }) {
  const t = useMessages();

  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end lg:py-24">
          <div>
            <p className="text-primary font-mono text-xs">
              {/* Decoration: the heading below names the page. */}
              <span aria-hidden="true">~/{t.paths.posts}</span>
            </p>

            <h1 className="mt-6 max-w-3xl text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em] text-balance">
              {t.posts.title}
            </h1>

            <Stats posts={posts} />
          </div>

          <p className="text-muted-foreground max-w-xs text-sm leading-7 text-pretty">{t.posts.description}</p>
        </div>
      </Container>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Featured                                                                   */
/* -------------------------------------------------------------------------- */

/** The newest post, large. A dotted grid and its public id fill the right-hand side. */
function Featured({ post }: { post: PostListItem }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();

  return (
    <section aria-labelledby="featured-title">
      <Link
        href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
        className={cn(
          'group border-border hover:border-foreground/40 relative grid overflow-hidden border transition-colors md:grid-cols-[minmax(0,1fr)_16rem]',
          focusRing,
        )}
      >
        <div className="flex flex-col gap-6 p-6 sm:p-10">
          <p className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="bg-foreground text-background px-2 py-1 tracking-wide uppercase">{t.posts.latest}</span>
            <time dateTime={post.publishedAt} className="text-muted-foreground tabular-nums">
              {formatPostDate(post.publishedAt, locale)}
            </time>
          </p>

          <h2
            id="featured-title"
            className="group-hover:text-primary text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-medium tracking-tighter text-balance transition-colors"
          >
            {post.title}
          </h2>

          <p className="text-muted-foreground max-w-2xl leading-7 text-pretty">{post.description}</p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
            <PostMeta post={post} />
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              {t.posts.readPost}
              <ArrowRight
                className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        {/* Decoration only. */}
        <div
          aria-hidden="true"
          className="border-border relative hidden border-l bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[14px_14px] md:block"
        >
          <div className="from-background absolute inset-0 bg-linear-to-r to-transparent" />
          <span className="text-muted-foreground/40 group-hover:text-foreground/60 absolute right-6 bottom-6 font-mono text-5xl font-medium tracking-tighter transition-colors">
            #{post.publicId}
          </span>
          <ArrowUpRight className="text-muted-foreground group-hover:text-foreground absolute top-6 right-6 size-6 transition-all motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolbar                                                                    */
/* -------------------------------------------------------------------------- */

function Toolbar({
  query,
  onQuery,
  order,
  onOrder,
  shown,
  total,
}: {
  query: string;
  onQuery: (query: string) => void;
  order: Order;
  onOrder: (order: Order) => void;
  shown: number;
  total: number;
}) {
  const t = useMessages();
  const input = useRef<HTMLInputElement>(null);

  // "/" focuses the search from anywhere on the page, unless the visitor is typing elsewhere.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return;
      event.preventDefault();
      input.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <label htmlFor="posts-search" className="sr-only">
          {t.posts.search.label}
        </label>
        <input
          ref={input}
          id="posts-search"
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onQuery('');
          }}
          placeholder={t.posts.search.placeholder}
          aria-describedby="posts-search-shortcut posts-search-count"
          autoComplete="off"
          className={cn(
            'border-border bg-background placeholder:text-muted-foreground/70 h-11 w-full border pr-24 pl-9 text-sm transition-colors [&::-webkit-search-cancel-button]:hidden',
            'hover:border-foreground/30 focus-visible:border-foreground focus-visible:ring-ring/30 outline-none focus-visible:ring-2',
          )}
        />
        <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
          {query ? (
            <button
              type="button"
              onClick={() => {
                onQuery('');
                input.current?.focus();
              }}
              aria-label={t.posts.search.clear}
              className={cn('text-muted-foreground hover:text-foreground p-1', focusRing)}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : (
            <kbd
              aria-hidden="true"
              className="border-border text-muted-foreground hidden border px-1.5 py-0.5 font-mono text-[0.6875rem] sm:inline-block"
            >
              /
            </kbd>
          )}
        </div>
        <span id="posts-search-shortcut" className="sr-only">
          {t.posts.search.shortcut}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span
          id="posts-search-count"
          role="status"
          className="text-muted-foreground font-mono text-xs tabular-nums sm:min-w-16 sm:text-right"
        >
          {query && t.posts.search.results(shown, total)}
        </span>

        <button
          type="button"
          onClick={() => onOrder(order === 'newest' ? 'oldest' : 'newest')}
          aria-label={`${t.posts.sort.label}: ${order === 'newest' ? t.posts.sort.newest : t.posts.sort.oldest}`}
          className={cn(
            'border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground inline-flex h-11 items-center gap-2 border px-3 font-mono text-xs transition-colors',
            focusRing,
          )}
        >
          <ArrowDownUp className="size-3.5" aria-hidden="true" />
          {order === 'newest' ? t.posts.sort.newest : t.posts.sort.oldest}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Archive                                                                    */
/* -------------------------------------------------------------------------- */

function PostRow({ post, query }: { post: PostListItem; query: string }) {
  const locale = useLocale();
  const routes = useRoutes();

  return (
    <li>
      <Link
        href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
        className={cn(
          'group hover:bg-muted/30 grid gap-2 px-4 py-6 transition-colors sm:grid-cols-[6.5rem_minmax(0,1fr)_1.5rem] sm:gap-6 sm:px-6',
          'focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-inset',
        )}
      >
        <time dateTime={post.publishedAt} className="text-muted-foreground font-mono text-xs tabular-nums sm:pt-1.5">
          {formatPostDate(post.publishedAt, locale)}
        </time>

        <span className="min-w-0">
          <span className="group-hover:text-primary block text-lg font-medium tracking-tight text-balance transition-colors">
            <Highlight text={post.title} query={query} />
          </span>
          <span className="text-muted-foreground mt-1.5 block text-sm leading-6 text-pretty">
            <Highlight text={post.description} query={query} />
          </span>
          <PostMeta post={post} className="mt-3" />
        </span>

        <ArrowRight
          className="text-muted-foreground group-hover:text-primary hidden size-4 self-center transition-all motion-safe:-translate-x-1 motion-safe:opacity-0 motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100 sm:block"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

/** Posts grouped by year. On wide screens the year sits in a sticky column on the left. */
function Archive({ posts, query, order }: { posts: readonly PostListItem[]; query: string; order: Order }) {
  const t = useMessages();

  const years = useMemo(() => {
    const groups = new Map<string, PostListItem[]>();
    for (const post of posts) {
      const year = post.publishedAt.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), post]);
    }
    const entries = [...groups.entries()];
    return order === 'newest' ? entries : entries.reverse();
  }, [posts, order]);

  return (
    <div className="flex flex-col gap-10">
      {years.map(([year, items]) => (
        <section
          key={year}
          aria-labelledby={`year-${year}`}
          className="grid gap-4 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10"
        >
          <header className="lg:sticky lg:top-24 lg:self-start">
            <h3
              id={`year-${year}`}
              className="font-mono text-3xl font-medium tracking-tighter tabular-nums lg:text-4xl"
            >
              {year}
            </h3>
            <p className="text-muted-foreground mt-1 font-mono text-xs">{t.posts.yearCount(items.length)}</p>
          </header>

          <ol role="list" className="divide-border border-border divide-y border">
            {(order === 'newest' ? items : [...items].reverse()).map((post) => (
              <PostRow key={post.publicId} post={post} query={query} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  const t = useMessages();

  return (
    <div className="border-border flex flex-col items-center border border-dashed px-6 py-16 text-center">
      <Search className="text-muted-foreground size-5" aria-hidden="true" />
      <p className="mt-4 font-medium text-balance">{t.posts.search.emptyTitle(query)}</p>
      <p className="text-muted-foreground mt-1 text-sm">{t.posts.search.emptyText}</p>
      <Button variant="outline" className="mt-6" onClick={onClear}>
        <X aria-hidden="true" />
        {t.posts.search.clear}
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty                                                                      */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <div className="border-border bg-muted/30 flex flex-col items-center border px-6 py-20 text-center sm:py-28">
      {/* Three faded rows: the shape of the posts that are not here yet. */}
      <div aria-hidden="true" className="flex w-full max-w-sm flex-col gap-3">
        {[100, 80, 60].map((width) => (
          <div key={width} className="flex items-center gap-4 opacity-40">
            <span className="bg-border h-2 w-12 shrink-0" />
            <span className="bg-border h-2" style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>

      <p className="mt-12 text-xl font-medium tracking-tight">{t.posts.emptyTitle}</p>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-7 text-pretty">{t.posts.emptyDetail}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href={routes.home().url}>
            <ArrowLeft aria-hidden="true" />
            {t.common.backHome}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={routes.about().url}>
            {t.common.readAboutMe}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PostsPage({ posts }: { posts: PostListItem[] }) {
  const t = useMessages();
  const locale = LOCALES[useLocale()].intl;
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<Order>('newest');
  // Typing stays responsive; the list catches up a frame later.
  const deferredQuery = useDeferredValue(query.trim());

  const latest = posts[0];
  const searching = deferredQuery !== '';

  const results = useMemo(() => {
    if (!searching) return posts.slice(1);
    const needle = normalize(deferredQuery, locale);
    return posts.filter((post) => normalize(`${post.title} ${post.description}`, locale).includes(needle));
  }, [posts, searching, deferredQuery, locale]);

  return (
    <>
      <Metadata title={t.nav.posts} description={t.posts.description} pageType="CollectionPage" />

      <Intro posts={posts} />

      <Container border={true}>
        <div className="flex flex-col gap-12 py-12 lg:gap-16 lg:py-16">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* While searching, the feature steps aside so results start at the top. */}
              {!searching && <Featured post={latest} />}

              {(posts.length > 1 || searching) && (
                <section aria-labelledby="posts-archive-title" className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <h2 id="posts-archive-title" className="text-muted-foreground font-mono text-xs">
                      <span aria-hidden="true">~/{t.paths.posts}/</span>
                      {t.posts.archive.toLocaleLowerCase(locale)}
                    </h2>
                    <Toolbar
                      query={query}
                      onQuery={setQuery}
                      order={order}
                      onOrder={setOrder}
                      shown={results.length}
                      total={posts.length}
                    />
                  </div>

                  {results.length > 0 ? (
                    <Archive posts={results} query={deferredQuery} order={order} />
                  ) : (
                    <NoResults query={deferredQuery} onClear={() => setQuery('')} />
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
}
