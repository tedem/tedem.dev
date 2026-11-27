import Container from '@/components/site/container';
import Metadata from '@/components/site/metadata';
import { Button } from '@/components/ui/button';
import { formatPostDate, useLocale, useMessages, useRoutes } from '@/i18n';
import type { PostSummary } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

/*
 * /posts is an archive: a page title, then the list in a terminal-style frame (a prompt
 * line and a column header). Posts are written in the admin area; with none published,
 * the frame shows its empty state.
 */

/** Shared by the column header and every row, so the columns line up. */
const ROW_GRID = 'sm:grid sm:grid-cols-[7rem_1fr_4rem] sm:gap-6';

function Intro() {
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
          </div>

          <p className="text-muted-foreground max-w-xs text-sm leading-7 text-pretty">{t.posts.description}</p>
        </div>
      </Container>
    </header>
  );
}

/** The listing frame: prompt line and column header (decoration), then the list or the empty state. */
function Listing({ count, children }: { count: number; children: ReactNode }) {
  const t = useMessages();
  const { date, title, read } = t.posts.columns;

  return (
    <section aria-labelledby="posts-list-title" className="border-border border">
      <h2 id="posts-list-title" className="sr-only">
        {t.posts.listTitle}
      </h2>

      {/* A prompt line and the column header. Hidden from assistive tech: the list itself carries the facts. */}
      <div aria-hidden="true" className="text-muted-foreground font-mono text-xs">
        <p className="border-border flex items-center gap-2 border-b px-6 py-3">
          <span className="text-primary">~/{t.paths.posts}</span>
          <span>$ ls --sort=date</span>
          <span className="ml-auto tabular-nums">total {count}</span>
        </p>
        <div className={`border-border border-b px-6 py-3 max-sm:hidden ${ROW_GRID}`}>
          {[date, title, read].map((column) => (
            <span key={column} className="last:text-right">
              {column}
            </span>
          ))}
        </div>
      </div>

      {children}
    </section>
  );
}

function PostList({ posts }: { posts: readonly PostSummary[] }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();

  return (
    <ol role="list" className="divide-border divide-y">
      {posts.map((post) => (
        <li key={post.publicId}>
          <Link
            href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
            className={`group hover:bg-muted/30 focus-visible:ring-ring block px-6 py-6 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset ${ROW_GRID}`}
          >
            <time
              dateTime={post.publishedAt}
              className="text-muted-foreground font-mono text-xs tabular-nums sm:pt-1.5"
            >
              {formatPostDate(post.publishedAt, locale)}
            </time>
            <span className="mt-2 block sm:mt-0">
              <span className="group-hover:text-primary block text-lg font-medium tracking-tight text-balance">
                {post.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-sm leading-6 text-pretty">{post.description}</span>
            </span>
            <span className="text-muted-foreground mt-2 block font-mono text-xs tabular-nums sm:mt-0 sm:pt-1.5 sm:text-right">
              {t.common.minutes(post.readingMinutes)}
              <span className="sr-only"> {t.common.read}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function EmptyState() {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <div className="bg-muted/30 flex flex-col items-center px-6 py-20 text-center sm:py-28">
      {/* Three faded rows: the shape of the posts that are not here yet. */}
      <div aria-hidden="true" className="flex w-full max-w-sm flex-col gap-3">
        {[100, 80, 60].map((width) => (
          <div key={width} className="flex items-center gap-4 opacity-40">
            <span className="bg-border h-2 w-12 shrink-0 rounded-full" />
            <span className="bg-border h-2 rounded-full" style={{ width: `${width}%` }} />
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

export default function PostsPage({ posts }: { posts: PostSummary[] }) {
  const t = useMessages();

  return (
    <>
      <Metadata title={t.nav.posts} description={t.posts.description} pageType="CollectionPage" />

      <Intro />

      <Container border={true}>
        <div className="py-12 lg:py-16">
          <Listing count={posts.length}>{posts.length > 0 ? <PostList posts={posts} /> : <EmptyState />}</Listing>
        </div>
      </Container>
    </>
  );
}
