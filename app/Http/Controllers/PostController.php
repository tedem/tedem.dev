<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The public side of the blog. Drafts and scheduled posts are not found here;
 * they are written and previewed in the admin area.
 */
final class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('site/posts', [
            'posts' => Post::query()
                ->published()
                ->latest('published_at')
                ->get()
                ->map(fn (Post $post): array => $post->toSummary()),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::query()->published()->where('slug', $slug)->firstOrFail();

        $newer = Post::query()->published()
            ->where('published_at', '>', $post->published_at)
            ->oldest('published_at')
            ->first();

        $older = Post::query()->published()
            ->where('published_at', '<', $post->published_at)
            ->latest('published_at')
            ->first();

        return Inertia::render('site/post', [
            'post' => [...$post->toSummary(), 'html' => $post->html()],
            'newer' => $newer?->toSummary(),
            'older' => $older?->toSummary(),
        ]);
    }
}
