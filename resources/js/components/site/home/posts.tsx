import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { Button } from '@/components/ui/button';
import { formatPostDate, useLocale, useMessages, useRoutes } from '@/i18n';
import type { PostSummary } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

function AllPostsButton() {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <Button variant="outline" asChild>
      <Link href={routes.posts().url}>
        {t.common.allPosts}
        <ArrowRight data-icon="inline-end" aria-hidden="true" />
      </Link>
    </Button>
  );
}

function LatestPosts({ latest }: { latest: readonly PostSummary[] }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();

  return (
    <>
      <ol role="list" className="mt-8 grid gap-2 md:mt-16 md:grid-cols-3">
        {latest.map((post) => (
          <li key={post.publicId}>
            <Link
              href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
              className="group border-border bg-muted/30 hover:border-primary focus-visible:ring-ring flex h-full flex-col gap-4 border p-6 transition-colors outline-none focus-visible:ring-2"
            >
              <span className="text-muted-foreground flex justify-between gap-4 font-mono text-xs tabular-nums">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
                <span>
                  {t.common.minutes(post.readingMinutes)}
                  <span className="sr-only"> {t.common.read}</span>
                </span>
              </span>
              <span className="group-hover:text-primary text-lg font-medium tracking-tight text-balance">
                {post.title}
              </span>
              <span className="text-muted-foreground text-sm leading-6 text-pretty">{post.description}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-end">
        <AllPostsButton />
      </div>
    </>
  );
}

function Empty() {
  const t = useMessages();

  return (
    <div className="bg-muted/30 mt-8 grid gap-8 p-8 md:mt-16 md:grid-cols-2">
      <p className="text-balance">
        <span>{t.posts.emptyTitle}</span>
        &nbsp;
        <span className="text-muted-foreground">{t.posts.emptyDetail}</span>
      </p>
      <div className="md:flex md:items-center md:justify-end">
        <AllPostsButton />
      </div>
    </div>
  );
}

/** The newest posts (HomeController sends up to three), or the empty state. */
export default function Posts({ latest }: { latest: readonly PostSummary[] }) {
  const t = useMessages();

  return (
    <section className="border-border border-t" id="posts" aria-labelledby="posts-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="posts-title"
            path={t.paths.posts}
            tagline={t.postsSection.tagline}
            title={t.posts.title}
            description={t.posts.description}
          />

          {latest.length > 0 ? <LatestPosts latest={latest} /> : <Empty />}
        </div>
      </Container>
    </section>
  );
}
