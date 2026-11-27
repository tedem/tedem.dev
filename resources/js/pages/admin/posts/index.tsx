import Heading from '@/components/admin/heading';
import PostStatusBadge from '@/components/admin/post-status-badge';
import { Button } from '@/components/ui/button';
import { create, edit, index } from '@/routes/admin/posts';
import { LOCALES } from '@/i18n';
import type { AdminPostRow } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const formatDate = (iso: string | null) => (iso ? DATE_FORMAT.format(new Date(iso)) : '—');

export default function PostsIndex({ posts }: { posts: AdminPostRow[] }) {
  return (
    <>
      <Head title="Posts" />

      <div className="flex flex-1 flex-col p-4">
        <h1 className="sr-only">Posts</h1>

        <div className="flex items-start justify-between gap-4">
          <Heading title="Posts" description="Write in Markdown; publish now, later or keep as a draft." />
          <Button asChild>
            <Link href={create()}>
              <Plus aria-hidden="true" />
              New post
            </Link>
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="border-sidebar-border/70 dark:border-sidebar-border text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
            No posts yet.
          </div>
        ) : (
          <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-left text-xs">
                <tr className="border-sidebar-border/70 dark:border-sidebar-border border-b">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Language</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Publish date</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-sidebar-border/70 dark:border-sidebar-border border-b last:border-b-0"
                  >
                    <td className="px-4 py-3">
                      <Link href={edit(post.id)} className="font-medium hover:underline">
                        {post.title}
                      </Link>
                      <div className="text-muted-foreground font-mono text-xs">{post.path}</div>
                    </td>
                    <td className="text-muted-foreground px-4 py-3">{LOCALES[post.locale].label}</td>
                    <td className="px-4 py-3">
                      <PostStatusBadge status={post.status} />
                    </td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">{formatDate(post.publishedAt)}</td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">{formatDate(post.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

PostsIndex.layout = {
  breadcrumbs: [{ title: 'Posts', href: index() }],
};
