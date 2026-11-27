/** A published post in a list, as App\Models\Post::toSummary() sends it. Dates are "YYYY-MM-DD". */
export type PostSummary = {
  slug: string;
  /** Random code assigned when the post was created; the URL is /posts/{slug}/{publicId}. */
  publicId: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string | null;
  readingMinutes: number;
};

/** A published post with its rendered Markdown. */
export type Post = PostSummary & {
  html: string;
};

export type PostStatus = 'draft' | 'scheduled' | 'published';

/** A row in the admin post list. Dates are ISO 8601. */
export type AdminPostRow = {
  id: number;
  title: string;
  slug: string;
  publicId: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string | null;
};

/** A post as the admin editor loads it. `publishedAt` is a datetime-local value. */
export type EditablePost = {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  publishedAt: string | null;
  status: PostStatus;
  url: string | null;
};
