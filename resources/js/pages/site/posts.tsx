import Container from '@/components/site/container';
import { Button } from '@/components/ui/button';
import { EMPTY_DETAIL, EMPTY_TITLE, POSTS_DESCRIPTION, POSTS_TITLE } from '@/content/posts';
import { about, home } from '@/routes';
import Seo from '@/components/site/seo';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/*
 * /posts is an archive: a page title, then the list itself. There is no blog backend yet,
 * so the list shows its empty state. The column header and the "ls" line are decoration
 * that hint at what will fill the list later.
 */

const COLUMNS = ['Date', 'Title', 'Read'] as const;

function Intro() {
  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-end lg:py-24">
          <div>
            <p className="text-primary font-mono text-xs">
              {/* Decoration: the heading below names the page. */}
              <span aria-hidden="true">~/posts</span>
            </p>

            <h1 className="mt-6 max-w-3xl text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em] text-balance">
              {POSTS_TITLE}
            </h1>
          </div>

          <p className="text-muted-foreground max-w-xs text-sm leading-7 text-pretty">{POSTS_DESCRIPTION}</p>
        </div>
      </Container>
    </header>
  );
}

function EmptyList() {
  return (
    <section aria-labelledby="posts-list-title" className="border-border border">
      <h2 id="posts-list-title" className="sr-only">
        All posts
      </h2>

      {/* What a listing will look like: a prompt line and the column header. Hidden from assistive tech. */}
      <div aria-hidden="true" className="text-muted-foreground font-mono text-xs">
        <p className="border-border flex items-center gap-2 border-b px-6 py-3">
          <span className="text-primary">~/posts</span>
          <span>$ ls --sort=date</span>
          <span className="ml-auto tabular-nums">total 0</span>
        </p>
        <div className="border-border grid grid-cols-[6rem_1fr_3rem] gap-4 border-b px-6 py-3 max-sm:hidden">
          {COLUMNS.map((column) => (
            <span key={column} className="last:text-right">
              {column}
            </span>
          ))}
        </div>
      </div>

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

        <p className="mt-12 text-xl font-medium tracking-tight">{EMPTY_TITLE}</p>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-7 text-pretty">{EMPTY_DETAIL}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href={home().url}>
              <ArrowLeft aria-hidden="true" />
              Back home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={about().url}>
              Read about me
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function PostsPage() {
  return (
    <>
      <Seo title="Posts" description={POSTS_DESCRIPTION} pageType="CollectionPage" />

      <Intro />

      <Container border={true}>
        <div className="py-12 lg:py-16">
          <EmptyList />
        </div>
      </Container>
    </>
  );
}
