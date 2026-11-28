<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Locale;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The public side of the blog. Drafts and scheduled posts are not found here;
 * they are written and previewed in the admin area. Each post is written in one language and
 * listed only on that language's pages. Its URL is /posts/{slug}/{publicId} (/en/posts/... for
 * English): the public id finds it, so renaming the slug never breaks a link.
 */
final class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('site/posts', [
            'posts' => Post::query()
                ->published()
                ->inLocale(Locale::current())
                ->latest('published_at')
                ->get()
                ->map(fn (Post $post): array => $post->toSummary()),
        ]);
    }

    public function show(string $slug, string $publicId): Response|RedirectResponse
    {
        $post = Post::query()->published()->where('public_id', $publicId)->firstOrFail();

        // An old or mistyped slug, or the other language's prefix: send it on, permanently,
        // to the post's current address.
        if ($slug !== $post->slug || $post->locale !== Locale::current()) {
            return redirect()->to($post->url(), 301);
        }

        // Neighbours in the same language, so "older post" never switches language.
        $newer = Post::query()->published()->inLocale($post->locale)
            ->where('published_at', '>', $post->published_at)
            ->oldest('published_at')
            ->first();

        $older = Post::query()->published()->inLocale($post->locale)
            ->where('published_at', '<', $post->published_at)
            ->latest('published_at')
            ->first();

        // Approved comments, oldest first, each with its approved replies.
        $comments = $post->comments()
            ->approved()
            ->whereNull('parent_id')
            ->with(['replies' => fn ($query) => $query->approved()->oldest()])
            ->oldest()
            ->get()
            ->map(fn (Comment $comment): array => $comment->toPublic());

        return Inertia::render('site/post', [
            'post' => [...$post->toSummary(), 'html' => $post->html()],
            'comments' => $comments,
            'newer' => $newer?->toSummary(),
            'older' => $older?->toSummary(),
        ]);
    }
}
