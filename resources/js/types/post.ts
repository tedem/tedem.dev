import type { Locale } from '@/i18n';

/** A published post in a list, as App\Models\Post::toSummary() sends it. Dates are "YYYY-MM-DD". */
export type PostSummary = {
  slug: string;
  /** Random code assigned when the post was created; the URL is /posts/{slug}/{publicId} (/en/posts/... in English). */
  publicId: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string | null;
  readingMinutes: number;
};

/** A post on the /posts list: its summary and how many approved comments it has. */
export type PostListItem = PostSummary & {
  commentCount: number;
};

/** A heading in a post, for its table of contents; `id` is the heading permalink's anchor. */
export type PostHeading = {
  level: 2 | 3;
  id: string;
  text: string;
};

/** Counts for the post page's side panel (App\Models\Post::stats()). */
export type PostStats = {
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  headings: number;
  codeBlocks: number;
  links: number;
  images: number;
};

/** A published post with its rendered Markdown. */
export type Post = PostSummary & {
  html: string;
  outline: PostHeading[];
  stats: PostStats;
};

/** An approved comment as the public post page gets it (App\Models\Comment::toPublic()). */
export type PostComment = {
  id: number;
  name: string;
  body: string;
  /** ISO 8601, in the site's timezone. */
  createdAt: string;
  /** Written by the site owner. */
  isOwner: boolean;
  /** Approved replies, oldest first; always empty on a reply. */
  replies: PostComment[];
};

/** A comment in the admin moderation list. Dates are ISO 8601. */
export type AdminComment = {
  id: number;
  name: string;
  email: string;
  body: string;
  isOwner: boolean;
  createdAt: string;
  approvedAt: string | null;
  post: { title: string; url: string };
  parent: { name: string; excerpt: string } | null;
};

export type CommentFilter = 'pending' | 'approved' | 'all';

export type PostStatus = 'draft' | 'scheduled' | 'published';

/** A row in the admin post list. Dates are ISO 8601. */
export type AdminPostRow = {
  id: number;
  title: string;
  slug: string;
  publicId: string;
  locale: Locale;
  /** Address on the site, e.g. "/en/posts/{slug}/{publicId}". */
  path: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string | null;
};

/** A post as the admin editor loads it. `publishedAt` is a datetime-local value. */
export type EditablePost = {
  id: number;
  locale: Locale;
  title: string;
  slug: string;
  description: string;
  body: string;
  publishedAt: string | null;
  status: PostStatus;
  url: string | null;
};
