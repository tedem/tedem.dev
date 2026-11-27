<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

final class HomeController extends Controller
{
    private const int LATEST_POSTS = 3;

    public function __invoke(): Response
    {
        return Inertia::render('site/home', [
            'latestPosts' => Post::query()
                ->published()
                ->latest('published_at')
                ->limit(self::LATEST_POSTS)
                ->get()
                ->map(fn (Post $post): array => $post->toSummary()),
        ]);
    }
}
