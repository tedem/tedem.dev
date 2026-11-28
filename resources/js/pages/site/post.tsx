import BrandMark from '@/components/shared/brand-mark';
import Comments from '@/components/site/comments';
import Container from '@/components/site/container';
import Metadata from '@/components/site/metadata';
import { ReadingPanel, StatsPanel } from '@/components/site/post-insights';
import { ShareBar, ShareList, useShareUrl } from '@/components/site/share';
import { NAME } from '@/content/profile';
import { useActiveSection } from '@/hooks/use-active-section';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { formatPostDate, LOCALES, useLocale, useMessages, useRoutes } from '@/i18n';
import { cn } from '@/lib/utils';
import type { Post, PostComment, PostHeading, PostSummary } from '@/types';
import { Link } from '@inertiajs/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  Clock,
  Link2,
  ListTree,
  MessageSquare,
  RefreshCw,
  Type,
} from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';

/*
 * One post: a reading-progress bar, a header with the path, title, description and
 * details, then the rendered Markdown (styled by .post-body in app.css) with a table of
 * contents beside it on wide screens, an author note, the comments and the neighbouring
 * posts. The HTML comes from App\Markdown\MarkdownRenderer; only admins can write posts.
 */

type PostPageProps = {
  post: Post;
  comments: PostComment[];
  newer: PostSummary | null;
  older: PostSummary | null;
};

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** A table of contents is only worth showing with at least this many headings. */
const MIN_OUTLINE = 2;

/* -------------------------------------------------------------------------- */
/* Frame                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The page's columns. On wide screens a rail sits on each side of the article, pinned to
 * the container's edges, so the header, the body, the comments and the neighbouring posts
 * all share one left edge instead of floating in the middle. Narrower, it is one column.
 * The rails stretch the full row, so their content can stick while the article scrolls.
 */
function Frame({
  left,
  right,
  children,
  className,
}: {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Container border={true}>
      <div
        className={cn(
          'mx-auto w-full max-w-3xl xl:grid xl:max-w-none xl:grid-cols-[13rem_minmax(0,1fr)_13rem] xl:gap-12',
          className,
        )}
      >
        <div className="min-w-0 xl:col-start-2 xl:row-start-1">{children}</div>
        {left && <div className="hidden xl:col-start-1 xl:row-start-1 xl:block">{left}</div>}
        {right && <div className="hidden xl:col-start-3 xl:row-start-1 xl:block">{right}</div>}
      </div>
    </Container>
  );
}

/* -------------------------------------------------------------------------- */
/* Reading progress                                                           */
/* -------------------------------------------------------------------------- */

/**
 * A hairline under the sticky header that fills as the article is read. Decorative:
 * the scroll position already tells assistive tech where the reader is.
 */
function ReadingProgress({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const element = target.current;
      if (!element || !bar.current) return;
      const { top, height } = element.getBoundingClientRect();
      const distance = height - window.innerHeight;
      const progress = distance <= 0 ? 1 : Math.min(1, Math.max(0, -top / distance));
      bar.current.style.transform = `scaleX(${progress})`;
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

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5">
      <div ref={bar} className="bg-foreground h-full origin-left scale-x-0" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

function CopyLink({ url }: { url: string }) {
  const t = useMessages();
  const { status, copy } = useCopyToClipboard();
  const copied = status === 'copied';

  return (
    <button
      type="button"
      onClick={() => copy(url)}
      className={cn(
        'border-border hover:border-foreground/40 text-muted-foreground hover:text-foreground inline-flex items-center gap-2 border px-3 py-1.5 transition-colors',
        focusRing,
      )}
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Link2 className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? t.posts.linkCopied : t.posts.copyLink}</span>
    </button>
  );
}

/** The date, large, in the header's left rail. */
function DateBlock({ day }: { day: string }) {
  const locale = useLocale();
  const t = useMessages();
  const date = new Date(`${day}T00:00:00Z`);
  const { intl } = LOCALES[locale];

  return (
    <p className="flex flex-col font-mono tabular-nums">
      <span className="text-muted-foreground text-xs">{t.posts.published}</span>
      <span className="mt-3 text-6xl leading-none font-medium tracking-tighter">
        {new Intl.DateTimeFormat(intl, { day: '2-digit', timeZone: 'UTC' }).format(date)}
      </span>
      <span className="text-muted-foreground mt-2 text-sm">
        {new Intl.DateTimeFormat(intl, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)}
      </span>
    </p>
  );
}

function PostHeader({ post, commentCount, url }: { post: Post; commentCount: number; url: string }) {
  const locale = useLocale();
  const t = useMessages();
  const routes = useRoutes();
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : null;

  return (
    <header className="border-border border-b">
      <Frame
        className="py-16 lg:py-24"
        left={
          <div aria-hidden="true" className="flex h-full flex-col justify-end">
            <DateBlock day={post.publishedAt} />
          </div>
        }
      >
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

        <div className="border-border mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-xs">
          <ul className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 tabular-nums">
            {/* The left rail shows the date large on wide screens; its copy there is hidden from assistive tech. */}
            <li className="inline-flex items-center gap-1.5 xl:sr-only">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span className="sr-only">{t.posts.published} </span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, locale)}</time>
            </li>
            {updated && (
              <li className="inline-flex items-center gap-1.5">
                <RefreshCw className="size-3.5" aria-hidden="true" />
                {t.posts.updated} <time dateTime={updated}>{formatPostDate(updated, locale)}</time>
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {t.common.minutesRead(post.readingMinutes)}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Type className="size-3.5" aria-hidden="true" />
              {t.posts.words(new Intl.NumberFormat(LOCALES[locale].intl).format(post.stats.words))}
            </li>
            <li>
              <a
                href="#comments"
                className={cn('hover:text-foreground inline-flex items-center gap-1.5', focusRing)}
                aria-label={`${t.posts.jumpToComments} (${t.comments.count(commentCount)})`}
              >
                <MessageSquare className="size-3.5" aria-hidden="true" />
                {t.comments.count(commentCount)}
              </a>
            </li>
          </ul>

          {/* On wide screens the left rail has the full share list. */}
          <div className="xl:hidden">
            <CopyLink url={url} />
          </div>
        </div>
      </Frame>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Table of contents                                                          */
/* -------------------------------------------------------------------------- */

function OutlineLinks({ outline, active }: { outline: readonly PostHeading[]; active?: string }) {
  return (
    <ol className="border-border border-l">
      {outline.map((heading) => {
        const current = heading.id === active;

        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={current ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1.5 text-sm leading-6 transition-colors',
                heading.level === 3 ? 'pl-8 text-[0.8125rem]' : 'pl-4',
                current
                  ? 'border-foreground text-foreground'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
                focusRing,
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Sticky beside the article on wide screens. */
function OutlineAside({ outline }: { outline: readonly PostHeading[] }) {
  const t = useMessages();
  const ids = useMemo(() => outline.map((heading) => heading.id), [outline]);
  const active = useActiveSection(ids, { lastAtBottom: false });

  return (
    <nav aria-labelledby="post-outline">
      <h2 id="post-outline" className="text-muted-foreground mb-4 font-mono text-xs">
        <span aria-hidden="true">~/</span>
        {t.posts.contents}
      </h2>
      <OutlineLinks outline={outline} active={active} />
    </nav>
  );
}

/** A disclosure above the article on narrower screens. */
function OutlineDisclosure({ outline }: { outline: readonly PostHeading[] }) {
  const t = useMessages();

  return (
    <details className="group border-border mb-10 border xl:hidden">
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-xs [&::-webkit-details-marker]:hidden',
          focusRing,
        )}
      >
        <span className="inline-flex items-center gap-2">
          <ListTree className="size-3.5" aria-hidden="true" />
          {t.posts.toggleContents}
        </span>
        <span className="text-muted-foreground tabular-nums" aria-hidden="true">
          {outline.length}
          <span className="ml-2 inline-block transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="border-border border-t px-4 py-4">
        <OutlineLinks outline={outline} />
      </div>
    </details>
  );
}

/* -------------------------------------------------------------------------- */
/* Body                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Gives each code block a bar with its language and a copy button. The body is server
 * HTML, so this works on the DOM after it renders; a new post replaces the HTML and the
 * bars are added again.
 */
function useCodeBlocks(body: React.RefObject<HTMLDivElement | null>, html: string) {
  const t = useMessages();

  useEffect(() => {
    const root = body.current;
    if (!root) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const pre of root.querySelectorAll<HTMLPreElement>('pre')) {
      if (pre.parentElement?.classList.contains('code-block')) continue;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      pre.replaceWith(wrapper);

      const bar = document.createElement('div');
      bar.className = 'code-block-bar';

      const language = document.createElement('span');
      language.textContent = pre.dataset.language ?? 'text';

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = t.posts.copyCode;
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.textContent ?? '');
          button.textContent = t.posts.codeCopied;
          button.dataset.copied = 'true';
          timers.push(
            setTimeout(() => {
              button.textContent = t.posts.copyCode;
              delete button.dataset.copied;
            }, 2000),
          );
        } catch {
          // Clipboard unavailable: leave the button as it is.
        }
      });

      bar.append(language, button);
      wrapper.append(bar, pre);
    }

    return () => timers.forEach(clearTimeout);
  }, [body, html, t]);
}

function AuthorNote() {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <aside
      aria-label={`${t.posts.writtenBy} ${NAME}`}
      className="border-border mt-8 flex flex-col gap-5 border p-6 sm:flex-row sm:items-center"
    >
      <BrandMark className="size-14 text-lg" />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground font-mono text-xs">{t.posts.writtenBy}</p>
        <p className="mt-1 text-lg font-medium tracking-tight">
          {NAME} <span className="text-muted-foreground font-normal">· {t.profile.role}</span>
        </p>
        <p className="text-muted-foreground mt-1 text-sm leading-6 text-pretty">{t.profile.lead}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-x-5 gap-y-2 font-mono text-xs sm:flex-col sm:items-end">
        <Link
          href={routes.about().url}
          className={cn('hover:text-primary inline-flex items-center gap-1.5', focusRing)}
        >
          {t.posts.aboutAuthor}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link
          href={routes.contact().url}
          className={cn('hover:text-primary inline-flex items-center gap-1.5', focusRing)}
        >
          {t.posts.contactAuthor}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Rails                                                                      */
/* -------------------------------------------------------------------------- */

/** Left rail: who wrote it, and where to share it. */
function LeftRail({ title, url }: { title: string; url: string }) {
  const t = useMessages();
  const routes = useRoutes();

  return (
    <div className="sticky top-28 flex flex-col gap-10">
      <section aria-labelledby="rail-author" className="flex flex-col gap-4">
        <h2 id="rail-author" className="text-muted-foreground font-mono text-xs">
          <span aria-hidden="true">~/</span>
          {t.posts.writtenBy.toLocaleLowerCase()}
        </h2>
        <div className="flex items-center gap-3">
          <BrandMark className="size-10" />
          <div className="min-w-0">
            <p className="font-medium tracking-tight">{NAME}</p>
            <p className="text-muted-foreground text-xs">{t.profile.role}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-xs leading-5 text-pretty">{t.profile.lead}</p>
        <div className="flex flex-col gap-1.5 font-mono text-xs">
          <Link
            href={routes.about().url}
            className={cn('hover:text-primary inline-flex items-center gap-1.5', focusRing)}
          >
            {t.posts.aboutAuthor}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href={routes.contact().url}
            className={cn('hover:text-primary inline-flex items-center gap-1.5', focusRing)}
          >
            {t.posts.contactAuthor}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="border-border border-t pt-8">
        <ShareList title={title} url={url} />
      </div>
    </div>
  );
}

/**
 * Right rail: the table of contents, live reading progress, the post in numbers, then
 * quick jumps. Scrolls on its own if it is taller than the window.
 */
function RightRail({
  post,
  article,
  commentCount,
}: {
  post: Post;
  article: React.RefObject<HTMLElement | null>;
  commentCount: number;
}) {
  const t = useMessages();
  const hasOutline = post.outline.length >= MIN_OUTLINE;
  const jump = cn(
    'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-mono text-xs transition-colors',
    focusRing,
  );
  const divider = 'border-border border-t pt-6';

  return (
    <div className="sticky top-28 flex max-h-[calc(100dvh-8rem)] [scrollbar-width:none] flex-col gap-6 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden">
      {hasOutline && <OutlineAside outline={post.outline} />}

      <div className={cn(hasOutline && divider)}>
        <ReadingPanel target={article} minutes={post.readingMinutes} />
      </div>

      <div className={divider}>
        <StatsPanel post={post} commentCount={commentCount} />
      </div>

      <div className={cn('flex flex-col gap-2', divider)}>
        <a href="#comments" className={jump}>
          <MessageSquare className="size-3.5" aria-hidden="true" />
          {t.posts.jumpToComments}
        </a>
        <a href="#top" className={jump}>
          <ArrowUp className="size-3.5" aria-hidden="true" />
          {t.posts.backToTop}
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Neighbours                                                                 */
/* -------------------------------------------------------------------------- */

function NeighbourLink({ post, direction }: { post: PostSummary; direction: 'newer' | 'older' }) {
  const newer = direction === 'newer';
  const t = useMessages();
  const routes = useRoutes();

  return (
    <Link
      href={routes.post({ slug: post.slug, publicId: post.publicId }).url}
      className={`group border-border hover:border-primary flex h-full flex-col gap-2 border p-5 transition-colors ${newer ? 'sm:items-end sm:text-right' : ''} ${focusRing}`}
    >
      <span className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
        {!newer && (
          <ArrowLeft
            className="size-3.5 transition-transform motion-safe:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        )}
        {newer ? t.posts.newer : t.posts.older}
        {newer && (
          <ArrowRight
            className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="group-hover:text-primary font-medium tracking-tight text-balance">{post.title}</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PostPage({ post, comments, newer, older }: PostPageProps) {
  const t = useMessages();
  const routes = useRoutes();
  const article = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const hasOutline = post.outline.length >= MIN_OUTLINE;
  const commentCount = comments.reduce((total, comment) => total + 1 + comment.replies.length, 0);
  const url = useShareUrl(routes.post({ slug: post.slug, publicId: post.publicId }).url);

  useCodeBlocks(body, post.html);

  return (
    <>
      <Metadata
        title={post.title}
        description={post.description}
        type="article"
        pageType="BlogPosting"
        article={{ publishedAt: post.publishedAt, updatedAt: post.updatedAt }}
      />

      <ReadingProgress target={article} />

      <article ref={article} aria-labelledby="post-title">
        <PostHeader post={post} commentCount={commentCount} url={url} />

        <Frame
          className="py-12 lg:py-16"
          left={<LeftRail title={post.title} url={url} />}
          right={<RightRail post={post} article={article} commentCount={commentCount} />}
        >
          {hasOutline && <OutlineDisclosure outline={post.outline} />}

          <div
            ref={body}
            className="post-body"
            // Rendered on the server from Markdown that only admins can write.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* On wide screens the rails carry these. */}
          <div className="xl:hidden">
            <ShareBar title={post.title} url={url} className="border-border mt-16 border-t pt-8" />
            <AuthorNote />
          </div>
        </Frame>
      </article>

      <div className="border-border border-t">
        <Frame className="py-12 lg:py-16">
          <Comments comments={comments} post={post} />
        </Frame>
      </div>

      <nav aria-label={t.posts.morePosts} className="border-border border-t">
        <Frame className="py-12 lg:py-16">
          <div className="flex flex-col gap-6">
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
        </Frame>
      </nav>
    </>
  );
}
