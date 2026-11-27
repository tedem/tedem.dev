<?php

declare(strict_types=1);

namespace App\Support;

/**
 * The pages search engines may index, by route name. Every other response gets an
 * `X-Robots-Tag: noindex` header, so a new public page only needs to be added here.
 */
final class IndexablePages
{
    /**
     * Fixed pages; the sitemap lists each one once.
     *
     * @var list<string>
     */
    public const array PAGES = ['home', 'about', 'posts', 'contact'];

    /**
     * Every indexable route: the fixed pages plus those with parameters, whose URLs the
     * sitemap builds itself (one per published post).
     *
     * @var list<string>
     */
    public const array ROUTES = [...self::PAGES, 'posts.show'];
}
