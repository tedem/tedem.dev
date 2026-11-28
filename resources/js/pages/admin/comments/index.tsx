import Heading from '@/components/admin/heading';
import InputError from '@/components/shared/form/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { approve, destroy, index, reply } from '@/routes/admin/comments';
import type { AdminComment, CommentFilter } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { BadgeCheck, Check, CornerDownRight, ExternalLink, Mail, MessageSquare, Reply, Trash2 } from 'lucide-react';
import { useState } from 'react';

/*
 * Comment moderation. New comments land under "Pending" and appear on the site once
 * approved. Replying from here publishes the reply at once (as the author) and approves
 * the comment being answered.
 */

type CommentsPageProps = {
  comments: AdminComment[];
  filter: CommentFilter;
  counts: Record<CommentFilter, number>;
};

const FILTERS: { value: CommentFilter; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'all', label: 'All' },
];

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function Filters({ filter, counts }: { filter: CommentFilter; counts: CommentsPageProps['counts'] }) {
  return (
    <nav
      aria-label="Filter comments"
      className="border-sidebar-border/70 dark:border-sidebar-border mb-6 flex border-b"
    >
      {FILTERS.map(({ value, label }) => {
        const active = value === filter;

        return (
          <Link
            key={value}
            href={index({ query: { status: value } })}
            preserveScroll
            aria-current={active ? 'page' : undefined}
            className={cn(
              '-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors',
              active
                ? 'border-foreground text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground border-transparent',
            )}
          >
            {label}
            <span
              className={cn(
                'min-w-5 px-1.5 py-0.5 text-center font-mono text-[0.6875rem] tabular-nums',
                value === 'pending' && counts.pending > 0 ? 'bg-foreground text-background' : 'bg-muted',
              )}
            >
              {counts[value]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function ReplyForm({ comment, onDone }: { comment: AdminComment; onDone: () => void }) {
  return (
    <Form
      {...reply.form(comment.id)}
      options={{ preserveScroll: true }}
      onSuccess={onDone}
      resetOnSuccess
      className="mt-4 flex flex-col gap-3"
    >
      {({ processing, errors }) => (
        <>
          <label htmlFor={`reply-${comment.id}`} className="sr-only">
            Reply to {comment.name}
          </label>
          <textarea
            id={`reply-${comment.id}`}
            name="body"
            rows={3}
            required
            autoFocus
            placeholder={`Reply to ${comment.name}…`}
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 w-full resize-y border px-3 py-2 text-sm leading-6 outline-none focus-visible:ring-3"
          />
          <InputError message={errors.body} />
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onDone}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={processing}>
              <Reply aria-hidden="true" />
              Publish reply
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

function CommentCard({ comment }: { comment: AdminComment }) {
  const [replying, setReplying] = useState(false);
  const pending = comment.approvedAt === null;

  return (
    <li
      className={cn(
        'border-sidebar-border/70 dark:border-sidebar-border border p-5',
        pending && 'border-l-foreground border-l-2',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{comment.name}</span>
            {comment.isOwner && (
              <Badge variant="outline">
                <BadgeCheck aria-hidden="true" />
                You
              </Badge>
            )}
            <Badge variant={pending ? 'default' : 'outline'}>{pending ? 'Pending' : 'Approved'}</Badge>
          </p>
          <a
            href={`mailto:${comment.email}`}
            className="text-muted-foreground hover:text-foreground mt-1 inline-flex items-center gap-1.5 text-xs"
          >
            <Mail className="size-3" aria-hidden="true" />
            {comment.email}
          </a>
        </div>

        <div className="text-muted-foreground text-right text-xs">
          <time dateTime={comment.createdAt} className="tabular-nums">
            {DATE_FORMAT.format(new Date(comment.createdAt))}
          </time>
          <a
            href={comment.post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground mt-1 flex items-center justify-end gap-1"
          >
            {comment.post.title}
            <ExternalLink className="size-3" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      {comment.parent && (
        <p className="text-muted-foreground bg-muted/50 mt-4 flex gap-2 px-3 py-2 text-xs leading-5">
          <CornerDownRight className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Reply to <span className="text-foreground font-medium">{comment.parent.name}</span>: “
            {comment.parent.excerpt}”
          </span>
        </p>
      )}

      <p className="mt-4 text-sm leading-6 break-words whitespace-pre-line">{comment.body}</p>

      {replying ? (
        <ReplyForm comment={comment} onDone={() => setReplying(false)} />
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {pending && (
            <Form {...approve.form(comment.id)} options={{ preserveScroll: true }}>
              {({ processing }) => (
                <Button type="submit" size="sm" disabled={processing}>
                  <Check aria-hidden="true" />
                  Approve
                </Button>
              )}
            </Form>
          )}

          <Button type="button" variant="outline" size="sm" onClick={() => setReplying(true)}>
            <Reply aria-hidden="true" />
            {pending ? 'Approve & reply' : 'Reply'}
          </Button>

          <Form
            {...destroy.form(comment.id)}
            options={{ preserveScroll: true }}
            onBefore={() =>
              window.confirm(
                comment.parent === null
                  ? `Delete the comment by ${comment.name} and its replies? This cannot be undone.`
                  : `Delete the reply by ${comment.name}? This cannot be undone.`,
              )
            }
            className="ml-auto"
          >
            {({ processing }) => (
              <Button type="submit" variant="ghost" size="sm" disabled={processing} className="text-destructive">
                <Trash2 aria-hidden="true" />
                Delete
              </Button>
            )}
          </Form>
        </div>
      )}
    </li>
  );
}

export default function CommentsIndex({ comments, filter, counts }: CommentsPageProps) {
  return (
    <>
      <Head title="Comments" />

      <div className="flex flex-1 flex-col p-4">
        <h1 className="sr-only">Comments</h1>

        <Heading title="Comments" description="Readers' comments appear on the site after you approve them." />

        <Filters filter={filter} counts={counts} />

        {comments.length === 0 ? (
          <div className="border-sidebar-border/70 dark:border-sidebar-border text-muted-foreground flex flex-col items-center gap-2 border border-dashed p-10 text-center text-sm">
            <MessageSquare className="size-5" aria-hidden="true" />
            {filter === 'pending' ? 'Nothing waiting for review.' : 'No comments yet.'}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

CommentsIndex.layout = {
  breadcrumbs: [{ title: 'Comments', href: index() }],
};
