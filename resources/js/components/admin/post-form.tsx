import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import PostStatusBadge from '@/components/admin/post-status-badge';
import InputError from '@/components/shared/form/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { preview as previewRoute } from '@/routes/admin/posts';
import { type Locale, LOCALES } from '@/i18n';
import type { EditablePost } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

/*
 * The post editor, shared by the create and edit pages. The body is Markdown; the Preview
 * tab renders it on the server with the same renderer as the public page, so what you see
 * there is what gets published.
 */

type Tab = 'write' | 'preview';

const textareaClass =
  'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]';

/** Same rules as Str::slug for plain text, to show what an empty slug will become. */
function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "2026-11-27T18:30" in the app's timezone, which is how the server reads the field. */
function nowIn(timeZone: string) {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return parts.replace(' ', 'T');
}

/** The XSRF-TOKEN cookie Laravel sets, for the preview request (Inertia handles it for forms). */
function xsrfToken() {
  const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);

  return match ? decodeURIComponent(match[1]) : '';
}

/**
 * The post's language, as a pair of radio buttons styled as a segmented control. The post
 * is listed only on that language's pages, and its URL gets the language's prefix.
 */
function LanguagePicker({
  value,
  onChange,
  error,
}: {
  value: Locale;
  onChange: (value: Locale) => void;
  error?: string;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-2 text-sm leading-none font-medium">Language</legend>
      <div className="border-input grid grid-cols-2 gap-1 rounded-md border p-1">
        {(Object.keys(LOCALES) as Locale[]).map((locale) => (
          <label
            key={locale}
            className="has-checked:bg-muted has-focus-visible:ring-ring/50 text-muted-foreground has-checked:text-foreground flex cursor-pointer items-center justify-center rounded-sm px-3 py-1.5 text-sm transition-colors has-checked:font-medium has-focus-visible:ring-[3px]"
          >
            <input
              type="radio"
              name="locale"
              value={locale}
              checked={value === locale}
              onChange={() => onChange(locale)}
              className="sr-only"
            />
            {LOCALES[locale].label}
          </label>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">Listed on this language's pages only.</p>
      <InputError message={error} />
    </fieldset>
  );
}

function BodyEditor({
  body,
  lang,
  onChange,
  error,
}: {
  body: string;
  /** The post's language, so the browser spell-checks the right one. */
  lang: Locale;
  onChange: (value: string) => void;
  error?: string;
}) {
  const [tab, setTab] = useState<Tab>('write');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function showPreview() {
    setTab('preview');
    setLoading(true);
    setFailed(false);

    try {
      const response = await fetch(previewRoute().url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-XSRF-TOKEN': xsrfToken() },
        body: JSON.stringify({ body }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setHtml(((await response.json()) as { html: string }).html);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  const tabClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors ${active ? 'bg-muted font-medium' : 'text-muted-foreground hover:text-foreground'}`;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="body">Body</Label>
        <div role="tablist" aria-label="Editor mode" className="flex gap-1">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'write'}
            className={tabClass(tab === 'write')}
            onClick={() => setTab('write')}
          >
            Write
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'preview'}
            className={tabClass(tab === 'preview')}
            onClick={showPreview}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Stays mounted in Preview so the form still submits the body. */}
      <textarea
        id="body"
        name="body"
        value={body}
        onChange={(event) => onChange(event.target.value)}
        required
        spellCheck
        lang={lang}
        aria-invalid={error ? true : undefined}
        placeholder={'## A heading\n\nWrite in Markdown: tables, task lists, footnotes and fenced code all work.'}
        className={`${textareaClass} min-h-112 resize-y font-mono leading-6 ${tab === 'preview' ? 'hidden' : ''}`}
      />

      {tab === 'preview' && (
        <div className="border-input min-h-112 rounded-md border px-6 py-4" aria-live="polite" aria-busy={loading}>
          {loading && (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Spinner /> Rendering…
            </p>
          )}
          {!loading && failed && (
            <p className="text-destructive text-sm">The preview could not be rendered. Try again.</p>
          )}
          {!loading && !failed && (
            // Rendered on the server by App\Markdown\MarkdownRenderer, like the public page.
            <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </div>
      )}

      <InputError message={error} />
    </div>
  );
}

export default function PostForm({ post }: { post?: EditablePost }) {
  const { time } = usePage().props;
  const [title, setTitle] = useState(post?.title ?? '');
  const [body, setBody] = useState(post?.body ?? '');
  const [publishedAt, setPublishedAt] = useState(post?.publishedAt ?? '');
  const [locale, setLocale] = useState<Locale>(post?.locale ?? 'tr');

  const action = post ? PostController.update.form(post.id) : PostController.store.form();

  return (
    <Form {...action} options={{ preserveScroll: true }} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
      {({ processing, errors }) => (
        <>
          <div className="grid content-start gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={200}
                lang={locale}
                className="text-base"
              />
              <InputError message={errors.title} />
            </div>

            <BodyEditor body={body} lang={locale} onChange={setBody} error={errors.body} />
          </div>

          <aside className="grid content-start gap-6">
            <div className="border-sidebar-border/70 dark:border-sidebar-border grid gap-4 rounded-xl border p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Status</span>
                <PostStatusBadge status={post?.status ?? 'draft'} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="published_at">Publish date</Label>
                <Input
                  id="published_at"
                  name="published_at"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(event) => setPublishedAt(event.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPublishedAt(nowIn(time.timezone))}
                  >
                    Now
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setPublishedAt('')}
                    disabled={!publishedAt}
                  >
                    Clear
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs leading-5">
                  Empty keeps it a draft; a future date schedules it. Times are {time.timezone}.
                </p>
                <InputError message={errors.published_at} />
              </div>

              <Button type="submit" disabled={processing}>
                {processing && <Spinner />}
                {post ? 'Save' : 'Create post'}
              </Button>

              {post?.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-sm"
                >
                  View on site
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            <LanguagePicker value={locale} onChange={setLocale} error={errors.locale} />

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug ?? ''}
                placeholder={slugify(title) || 'from-the-title'}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                maxLength={200}
                className="font-mono text-sm"
              />
              <p className="text-muted-foreground text-xs">Leave empty to use the title.</p>
              <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                defaultValue={post?.description ?? ''}
                required
                maxLength={300}
                rows={4}
                lang={locale}
                className={textareaClass}
              />
              <p className="text-muted-foreground text-xs">Shown in post lists, search results and link previews.</p>
              <InputError message={errors.description} />
            </div>
          </aside>
        </>
      )}
    </Form>
  );
}
