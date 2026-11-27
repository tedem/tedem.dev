import Heading from '@/components/admin/heading';
import PostForm from '@/components/admin/post-form';
import { create, index } from '@/routes/admin/posts';
import { Head } from '@inertiajs/react';

export default function CreatePost() {
  return (
    <>
      <Head title="New post" />

      <div className="flex flex-1 flex-col p-4">
        <h1 className="sr-only">New post</h1>
        <Heading title="New post" />
        <PostForm />
      </div>
    </>
  );
}

CreatePost.layout = {
  breadcrumbs: [
    { title: 'Posts', href: index() },
    { title: 'New post', href: create() },
  ],
};
