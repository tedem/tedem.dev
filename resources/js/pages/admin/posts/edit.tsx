import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import Heading from '@/components/admin/heading';
import PostForm from '@/components/admin/post-form';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/admin/posts';
import type { EditablePost } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

export default function EditPost({ post }: { post: EditablePost }) {
  return (
    <>
      <Head title={`Edit: ${post.title}`} />

      <div className="flex flex-1 flex-col p-4">
        <h1 className="sr-only">Edit post</h1>
        <Heading title="Edit post" />

        {/* Keyed by id, so switching posts starts from that post's values. */}
        <PostForm key={post.id} post={post} />

        <Form
          {...PostController.destroy.form(post.id)}
          onBefore={() => window.confirm(`Delete "${post.title}"? This cannot be undone.`)}
          className="border-sidebar-border/70 dark:border-sidebar-border mt-12 flex items-center justify-between gap-4 border-t pt-6"
        >
          {({ processing }) => (
            <>
              <p className="text-muted-foreground text-sm">Deleting removes the post from the site for good.</p>
              <Button type="submit" variant="destructive" disabled={processing}>
                <Trash2 aria-hidden="true" />
                Delete post
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
}

EditPost.layout = (props: { post: EditablePost }) => ({
  breadcrumbs: [
    { title: 'Posts', href: index() },
    { title: props.post.title, href: PostController.edit(props.post.id) },
  ],
});
