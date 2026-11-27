<?php

declare(strict_types=1);

namespace App\Support;

use App\Enums\Locale;

/**
 * The pages search engines may index, by route name, in every language. Every other
 * response gets an `X-Robots-Tag: noindex` header, so a new public page only needs to be
 * added here (and to Locale::PAGES).
 */
final class IndexablePages
{
    /**
     * Fixed pages in every language: "about", "en.about", ...
     *
     * @return list<string>
     */
    public static function pages(): array
    {
        $pages = [];

        foreach (Locale::cases() as $locale) {
            foreach (Locale::PAGES as $page) {
                $pages[] = $locale->route($page);
            }
        }

        return $pages;
    }

    /**
     * Every indexable route: the fixed pages plus the post pages, whose URLs the sitemap
     * builds itself (one per published post).
     *
     * @return list<string>
     */
    public static function routes(): array
    {
        $posts = array_map(fn (Locale $locale): string => $locale->route('posts.show'), Locale::cases());

        return [...self::pages(), ...$posts];
    }
}
