<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Locale;
use App\Models\Post;
use Illuminate\Http\Response;

/**
 * sitemap.xml: every fixed page in every language, each listing its translations
 * (xhtml:link, the sitemap form of hreflang), then every published post under the
 * address of its own language. Posts have no translations, so they list none.
 */
final class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $pages = [];

        foreach (Locale::cases() as $locale) {
            foreach (Locale::PAGES as $page) {
                $pages[] = $this->entry(route($locale->route($page)), alternates: $this->translations($page));
            }
        }

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
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
            ...$pages,
            ...$posts,
            '</urlset>',
        ])."\n";

        return response($xml)->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    /**
     * A page's address in every language, plus x-default (the default language).
     *
     * @return array<string, string>
     */
    private function translations(string $page): array
    {
        $alternates = [];

        foreach (Locale::cases() as $locale) {
            $alternates[$locale->value] = route($locale->route($page));
        }

        $alternates['x-default'] = route(Locale::default()->route($page));

        return $alternates;
    }

    /**
     * @param  array<string, string>  $alternates  hreflang => URL
     */
    private function entry(string $url, ?string $lastModified = null, array $alternates = []): string
    {
        $lastmod = $lastModified === null ? '' : '<lastmod>'.$lastModified.'</lastmod>';

        $links = '';
        foreach ($alternates as $language => $href) {
            $links .= '<xhtml:link rel="alternate" hreflang="'.e($language).'" href="'.e($href).'"/>';
        }

        return '  <url><loc>'.e($url).'</loc>'.$lastmod.$links.'</url>';
    }
}
