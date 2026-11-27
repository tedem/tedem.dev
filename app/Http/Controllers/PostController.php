<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Locale;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The public side of the blog. Drafts and scheduled posts are not found here;
 * they are written and previewed in the admin area. A post's URL is /posts/{slug}/{publicId}
 * (/en/posts/... in English): the public id finds it, so renaming the slug never breaks a link.
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

    public function show(string $slug, string $publicId): Response|RedirectResponse
    {
        $post = Post::query()->published()->where('public_id', $publicId)->firstOrFail();

        // An old or mistyped slug: send it on, permanently, to the post's current address.
        if ($slug !== $post->slug) {
            // SetLocale has set the app locale from the route, so the redirect stays in this language.
            return redirect()->to($post->url(Locale::from(app()->getLocale())), 301);
        }

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
