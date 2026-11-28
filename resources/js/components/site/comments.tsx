import { formatPostDate, useLocale, useMessages, useRoutes } from '@/i18n';
import { useLegalDocument } from '@/i18n/legal';
import { cn } from '@/lib/utils';
import type { PostComment } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, BadgeCheck, CornerDownRight, MessageSquare, Send } from 'lucide-react';
import { Fragment, type ReactNode, useEffect, useId, useRef, useState } from 'react';

/*
 * Comments under a post: the approved ones (replies one level deep), then a form. New
 * comments wait for review in the admin area (App\Http\Controllers\Admin\CommentController),
 * so a sent form turns into a thank-you note instead of showing the comment at once.
 * Bodies are plain text: React escapes them and `whitespace-pre-line` keeps line breaks.
 */

/** Keep in step with App\Models\Comment::MAX_LENGTH. */
const MAX_LENGTH = 2000;

/** Keep in step with App\Http\Controllers\CommentController::HONEYPOT. */
// Deliberately meaningless: browser autofill and password managers fill fields named like
// "website" or "url" even when hidden, which would drop real readers' comments.
const HONEYPOT = 'hp_field';

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const field = cn(
  'border-border bg-background placeholder:text-muted-foreground/70 w-full border px-3 text-sm transition-colors',
  'hover:border-foreground/30 focus-visible:border-foreground aria-invalid:border-destructive',
  'focus-visible:ring-ring/30 outline-none focus-visible:ring-2',
);

type PostRef = { slug: string; publicId: string };

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const countAll = (comments: readonly PostComment[]) =>
  comments.reduce((total, comment) => total + 1 + comment.replies.length, 0);

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? '?').slice(0, 2);
  return letters.toLocaleUpperCase();
}

/** Turns {terms} and {privacy} in the form notice into links to those pages. */
function useNotice() {
  const t = useMessages();
  const routes = useRoutes();
  const terms = useLegalDocument('terms');
  const privacy = useLegalDocument('privacy');
  const link = 'text-foreground decoration-border hover:decoration-foreground underline underline-offset-4';

  const tokens: Record<string, ReactNode> = {
    terms: (
      <Link href={routes.terms().url} className={cn(link, focusRing)}>
        {terms.title}
      </Link>
    ),
    privacy: (
      <Link href={routes.privacy().url} className={cn(link, focusRing)}>
        {privacy.title}
      </Link>
    ),
  };

  return t.comments.form.notice.split(/(\{\w+\})/).map((part, index) => {
    const token = /^\{(\w+)\}$/.exec(part)?.[1];
    return <Fragment key={index}>{token && token in tokens ? tokens[token] : part}</Fragment>;
  });
}

/* -------------------------------------------------------------------------- */
/* Comment                                                                    */
/* -------------------------------------------------------------------------- */

function Avatar({ name, owner }: { name: string; owner: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-9 shrink-0 items-center justify-center border font-mono text-xs font-medium',
        owner ? 'border-foreground bg-foreground text-background' : 'border-border bg-muted text-muted-foreground',
      )}
    >
      {initials(name)}
    </span>
  );
}

function CommentItem({
  comment,
  post,
  replyingTo,
  onReply,
}: {
  comment: PostComment;
  post: PostRef;
  /** Id of the comment whose reply form is open, if any. */
  replyingTo?: number | null;
  onReply?: (id: number | null) => void;
}) {
  const locale = useLocale();
  const t = useMessages();
  const isReply = onReply === undefined;
  const open = replyingTo === comment.id;

  return (
    <article id={`comment-${comment.id}`} aria-labelledby={`comment-${comment.id}-author`} className="scroll-mt-28">
      <div className="flex gap-4">
        <Avatar name={comment.name} owner={comment.isOwner} />

        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 id={`comment-${comment.id}-author`} className="font-medium">
              {comment.name}
            </h3>
            {comment.isOwner && (
              <span className="border-foreground/30 inline-flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wide uppercase">
                <BadgeCheck className="size-3" aria-hidden="true" />
                {t.comments.author}
              </span>
            )}
            <a
              href={`#comment-${comment.id}`}
              className={cn('text-muted-foreground hover:text-foreground font-mono text-xs tabular-nums', focusRing)}
            >
              <time dateTime={comment.createdAt}>{formatPostDate(comment.createdAt.slice(0, 10), locale)}</time>
            </a>
          </header>

          <p className="text-foreground/90 mt-2 leading-7 break-words whitespace-pre-line">{comment.body}</p>

          {!isReply && (
            <button
              type="button"
              onClick={() => onReply(open ? null : comment.id)}
              aria-expanded={open}
              aria-label={t.comments.replyTo(comment.name)}
              className={cn(
                'text-muted-foreground hover:text-foreground mt-3 inline-flex items-center gap-1.5 font-mono text-xs transition-colors',
                focusRing,
              )}
            >
              <CornerDownRight className="size-3.5" aria-hidden="true" />
              {t.comments.reply}
            </button>
          )}
        </div>
      </div>

      {!isReply && (comment.replies.length > 0 || open) && (
        <div className="border-border mt-6 ml-[1.125rem] flex flex-col gap-6 border-l pl-6 sm:pl-8">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} post={post} />
          ))}

          {open && (
            <CommentForm post={post} parent={comment} onCancel={() => onReply(null)} onSent={() => onReply(null)} />
          )}
        </div>
      )}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Form                                                                       */
/* -------------------------------------------------------------------------- */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-destructive mt-1.5 text-xs">
      {message}
    </p>
  );
}

function Sent({ action, onAction }: { action: string; onAction: () => void }) {
  const t = useMessages();
  const ref = useRef<HTMLDivElement>(null);

  // The form is taller than this note, so the page shrinks under the reader; bring it into view.
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 scroll-mt-28 scroll-mb-8"
    >
      <p className="flex items-center gap-2 font-medium">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full bg-emerald-500/60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 bg-emerald-500" />
        </span>
        {t.comments.sent.title}
      </p>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{t.comments.sent.text}</p>
      <button
        type="button"
        onClick={onAction}
        className={cn(
          'group text-foreground decoration-border hover:decoration-foreground mt-4 inline-flex items-center gap-1.5 font-mono text-xs underline underline-offset-4',
          focusRing,
        )}
      >
        {action}
        <ArrowRight
          className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

function CommentForm({
  post,
  parent,
  onCancel,
  onSent,
}: {
  post: PostRef;
  /** The comment being replied to; none for a new top-level comment. */
  parent?: PostComment;
  onCancel?: () => void;
  onSent?: () => void;
}) {
  const t = useMessages();
  const routes = useRoutes();
  const notice = useNotice();
  const id = useId();
  const [sent, setSent] = useState(false);

  const form = useForm({
    author_name: '',
    author_email: '',
    body: '',
    parent_id: parent?.id ?? null,
    [HONEYPOT]: '',
  });

  // The server's messages are not localized; every error is worded here instead.
  const errors = {
    name: form.errors.author_name && t.comments.errors.name,
    email: form.errors.author_email && t.comments.errors.email,
    body: form.errors.body && t.comments.errors.body(MAX_LENGTH),
    form:
      ('form' in form.errors && t.comments.errors.throttled) ||
      (form.errors.parent_id && t.comments.errors.parent) ||
      undefined,
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    form.post(routes.comment(post).url, {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setSent(true);
      },
    });
  };

  if (sent) {
    // A reply's note closes the thread's form; a top-level one offers a fresh form.
    return parent && onSent ? (
      <Sent action={t.comments.sent.close} onAction={onSent} />
    ) : (
      <Sent action={t.comments.sent.again} onAction={() => setSent(false)} />
    );
  }

  const title = parent ? t.comments.form.replyTitle(parent.name) : t.comments.form.title;

  return (
    <form onSubmit={submit} aria-labelledby={`${id}-title`} noValidate className="flex flex-col gap-5">
      <h3 id={`${id}-title`} className={parent ? 'sr-only' : 'text-lg font-medium tracking-tight'}>
        {title}
      </h3>

      {/* Honeypot: off-screen, out of the tab order and opted out of autofill, so only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-${HONEYPOT}`}>Leave this field empty</label>
        <input
          id={`${id}-${HONEYPOT}`}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          value={form.data[HONEYPOT]}
          onChange={(event) => form.setData(HONEYPOT, event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-muted-foreground font-mono text-xs">
            {t.comments.form.name}
          </label>
          <input
            id={`${id}-name`}
            name="author_name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            value={form.data.author_name}
            onChange={(event) => form.setData('author_name', event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={cn(field, 'mt-2 h-10')}
          />
          <FieldError id={`${id}-name-error`} message={errors.name} />
        </div>

        <div>
          <label htmlFor={`${id}-email`} className="text-muted-foreground font-mono text-xs">
            {t.comments.form.email}
          </label>
          <input
            id={`${id}-email`}
            name="author_email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            value={form.data.author_email}
            onChange={(event) => form.setData('author_email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={cn(`${id}-email-hint`, errors.email && `${id}-email-error`)}
            className={cn(field, 'mt-2 h-10')}
          />
          <p id={`${id}-email-hint`} className="text-muted-foreground mt-1.5 text-xs leading-5">
            {t.comments.form.emailHint}
          </p>
          <FieldError id={`${id}-email-error`} message={errors.email} />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${id}-body`} className="text-muted-foreground font-mono text-xs">
            {t.comments.form.body}
          </label>
          <span
            className={cn(
              'font-mono text-[0.6875rem] tabular-nums',
              form.data.body.length > MAX_LENGTH ? 'text-destructive' : 'text-muted-foreground',
            )}
            aria-hidden="true"
          >
            {t.comments.form.characters(form.data.body.length, MAX_LENGTH)}
          </span>
        </div>
        <textarea
          id={`${id}-body`}
          name="body"
          required
          rows={parent ? 3 : 5}
          maxLength={MAX_LENGTH}
          placeholder={t.comments.form.bodyPlaceholder}
          value={form.data.body}
          onChange={(event) => form.setData('body', event.target.value)}
          aria-invalid={errors.body ? true : undefined}
          aria-describedby={errors.body ? `${id}-body-error` : undefined}
          className={cn(field, 'mt-2 min-h-24 resize-y py-2.5 leading-6')}
        />
        <FieldError id={`${id}-body-error`} message={errors.body} />
      </div>

      {errors.form && (
        <p role="alert" className="border-destructive/40 bg-destructive/5 text-destructive border px-3 py-2 text-sm">
          {errors.form}
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground max-w-md text-xs leading-5">{notice}</p>

        <div className="flex shrink-0 items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={cn(
                'text-muted-foreground hover:text-foreground inline-flex h-10 items-center px-3 text-sm',
                focusRing,
              )}
            >
              {t.comments.cancel}
            </button>
          )}
          <button
            type="submit"
            disabled={form.processing}
            className={cn(
              'border-foreground bg-foreground text-background hover:bg-foreground/85 inline-flex h-10 items-center gap-2 border px-4 text-sm font-medium transition-colors',
              'disabled:cursor-wait disabled:opacity-70 motion-safe:active:translate-y-px',
              focusRing,
            )}
          >
            {form.processing ? t.comments.form.sending : parent ? t.comments.form.submitReply : t.comments.form.submit}
            <Send className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Comments                                                                   */
/* -------------------------------------------------------------------------- */

export default function Comments({ comments, post }: { comments: PostComment[]; post: PostRef }) {
  const t = useMessages();
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const total = countAll(comments);

  return (
    <section id="comments" aria-labelledby="comments-title" className="scroll-mt-28">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-primary font-mono text-xs" aria-hidden="true">
            ~/{t.comments.path}
          </p>
          <h2 id="comments-title" className="mt-3 text-3xl font-medium tracking-tight">
            {t.comments.title}
          </h2>
        </div>
        {total > 0 && (
          <p className="text-muted-foreground border-border inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs tabular-nums">
            <MessageSquare className="size-3.5" aria-hidden="true" />
            {t.comments.count(total)}
          </p>
        )}
      </header>

      {comments.length === 0 ? (
        <div className="border-border mt-8 border border-dashed p-8 text-center">
          <MessageSquare className="text-muted-foreground mx-auto size-5" aria-hidden="true" />
          <p className="mt-3 font-medium">{t.comments.emptyTitle}</p>
          <p className="text-muted-foreground mt-1 text-sm">{t.comments.emptyText}</p>
        </div>
      ) : (
        <ol className="divide-border border-border mt-8 divide-y border-y">
          {comments.map((comment) => (
            <li key={comment.id} className="py-8">
              <CommentItem comment={comment} post={post} replyingTo={replyingTo} onReply={setReplyingTo} />
            </li>
          ))}
        </ol>
      )}

      <div className="border-border relative mt-12 border p-6 sm:p-8">
        <CommentForm post={post} />
      </div>
    </section>
  );
}
