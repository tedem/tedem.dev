<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use App\Support\IndexablePages;
use Illuminate\Http\Response;

final class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $pages = array_map(
            fn (string $name): string => $this->entry(route($name)),
            IndexablePages::PAGES,
        );

        $posts = Post::query()
            ->published()
            ->latest('published_at')
            ->get()
            ->map(fn (Post $post): string => $this->entry(
                $post->url(),
                ($post->updated_at ?? $post->published_at)?->toDateString(),
            ))
            ->all();

        $xml = implode("\n", [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...$pages,
            ...$posts,
            '</urlset>',
        ])."\n";

        return response($xml)->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    private function entry(string $url, ?string $lastModified = null): string
    {
        $lastmod = $lastModified === null ? '' : '<lastmod>'.$lastModified.'</lastmod>';

        return '  <url><loc>'.e($url).'</loc>'.$lastmod.'</url>';
    }
}
