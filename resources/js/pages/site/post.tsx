import Comments from '@/components/site/comments';
import Container from '@/components/site/container';
import Metadata from '@/components/site/metadata';
import { formatPostDate, useLocale, useMessages, useRoutes } from '@/i18n';
import type { Post, PostComment, PostSummary } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/*
 * One post: a header with the path, title, description and dates, the rendered Markdown
 * (styled by .post-body in app.css), then links to the neighbouring posts. The HTML comes
 * from App\Markdown\MarkdownRenderer; only admins can write posts.
 */

type PostPageProps = {
  post: Post;
  comments: PostComment[];
  newer: PostSummary | null;
  older: PostSummary | null;
};

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function PostHeader({ post }: { post: Post }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();

  return (
    <header className="border-border border-b">
      <Container border={true}>
        <div className="mx-auto max-w-3xl py-16 lg:py-24">
          <nav aria-label={t.posts.breadcrumb} className="font-mono text-xs">
            <Link href={routes.posts().url} className={`text-primary hover:underline ${focusRing}`}>
              ~/{t.paths.posts}
            </Link>
            <span className="text-muted-foreground" aria-hidden="true">
              /{post.slug}/{post.publicId}
            </span>
          </nav>

          <h1
            id="post-title"
            className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-medium tracking-tighter text-balance"
          >
            {post.title}
          </h1>

          <p className="text-muted-foreground mt-6 text-lg leading-8 text-pretty">{post.description}</p>

          <p className="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tabular-nums">
            <span>
              {t.posts.published} <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>
                {t.posts.updated} <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt, locale)}</time>
              </span>
            )}
            <span>{t.common.minutesRead(post.readingMinutes)}</span>
          </p>
        </div>
      </Container>
    </header>
  );
}

function NeighbourLink({ post, direction }: { post: PostSummary; direction: 'newer' | 'older' }) {
  const newer = direction === 'newer';
  const t = useMessages();
  const routes = useRoutes();

  return (
    <Link
      href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
      className={`group border-border hover:border-primary flex flex-col gap-2 border p-5 transition-colors ${newer ? 'sm:items-end sm:text-right' : ''} ${focusRing}`}
    >
      <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
        {!newer && <ArrowLeft className="size-3.5" aria-hidden="true" />}
        {newer ? t.posts.newer : t.posts.older}
        {newer && <ArrowRight className="size-3.5" aria-hidden="true" />}
      </span>
      <span className="group-hover:text-primary font-medium tracking-tight text-balance">{post.title}</span>
    </Link>
  );
}

export default function PostPage({ post, comments, newer, older }: PostPageProps) {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <>
      <Metadata
        title={post.title}
        description={post.description}
        type="article"
        pageType="BlogPosting"
        article={{ publishedAt: post.publishedAt, updatedAt: post.updatedAt }}
      />

      <article aria-labelledby="post-title">
        <PostHeader post={post} />

        <Container border={true}>
          <div
            className="post-body mx-auto max-w-3xl py-12 lg:py-16"
            // Rendered on the server from Markdown that only admins can write.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </article>

      <div className="border-border border-t">
        <Container border={true}>
          <div className="mx-auto max-w-3xl py-12 lg:py-16">
            <Comments comments={comments} post={post} />
          </div>
        </Container>
      </div>

      <nav aria-label={t.posts.morePosts} className="border-border border-t">
        <Container border={true}>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 py-12 lg:py-16">
            {(older || newer) && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div>{older && <NeighbourLink post={older} direction="older" />}</div>
                <div>{newer && <NeighbourLink post={newer} direction="newer" />}</div>
              </div>
            )}

            <Link
              href={routes.posts().url}
              className={`hover:text-primary font-mono text-sm transition-colors ${focusRing}`}
            >
              <span aria-hidden="true">← </span>
              {t.common.allPosts}
            </Link>
          </div>
        </Container>
      </nav>
    </>
  );
}
