import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { Button } from '@/components/ui/button';
import { EMPTY_DETAIL, EMPTY_TITLE, POSTS_DESCRIPTION, POSTS_TITLE, formatPostDate } from '@/content/posts';
import { posts } from '@/routes';
import { show } from '@/routes/posts';
import type { PostSummary } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

function AllPostsButton() {
  return (
    <Button variant="outline" asChild>
      <Link href={posts().url}>
        All posts
        <ArrowRight data-icon="inline-end" aria-hidden="true" />
      </Link>
    </Button>
  );
}

function LatestPosts({ latest }: { latest: readonly PostSummary[] }) {
  return (
    <>
      <ol role="list" className="mt-8 grid gap-2 md:mt-16 md:grid-cols-3">
        {latest.map((post) => (
          <li key={post.publicId}>
            <Link
              href={show({ slug: post.slug, publicId: post.publicId }).url}
              className="group border-border bg-muted/30 hover:border-primary focus-visible:ring-ring flex h-full flex-col gap-4 border p-6 transition-colors outline-none focus-visible:ring-2"
            >
              <span className="text-muted-foreground flex justify-between gap-4 font-mono text-xs tabular-nums">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span>
                  {post.readingMinutes} min<span className="sr-only"> read</span>
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
  return (
    <div className="bg-muted/30 mt-8 grid gap-8 p-8 md:mt-16 md:grid-cols-2">
      <p className="text-balance">
        <span>{EMPTY_TITLE}</span>
        &nbsp;
        <span className="text-muted-foreground">{EMPTY_DETAIL}</span>
      </p>
      <div className="md:flex md:items-center md:justify-end">
        <AllPostsButton />
      </div>
    </div>
  );
}

/** The newest posts (HomeController sends up to three), or the empty state. */
export default function Posts({ latest }: { latest: readonly PostSummary[] }) {
  return (
    <section className="border-border border-t" id="posts" aria-labelledby="posts-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="posts-title"
            path="posts"
            tagline="Latest articles and thoughts"
            title={POSTS_TITLE}
            description={POSTS_DESCRIPTION}
          />

          {latest.length > 0 ? <LatestPosts latest={latest} /> : <Empty />}
        </div>
      </Container>
    </section>
  );
}
