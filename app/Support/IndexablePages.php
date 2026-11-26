<?php

declare(strict_types=1);

namespace App\Support;

/**
 * The public pages search engines may index, by route name. The sitemap lists exactly
 * these, and every other response gets an `X-Robots-Tag: noindex` header, so a new
 * public page only needs to be added here.
 */
final class IndexablePages
{
    /**
     * @var list<string>
     */
    public const array ROUTES = ['home', 'about', 'posts', 'contact'];
}
