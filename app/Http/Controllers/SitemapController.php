<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Support\IndexablePages;
use Illuminate\Http\Response;

final class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $entries = array_map(
            fn (string $name): string => '  <url><loc>'.e(route($name)).'</loc></url>',
            IndexablePages::ROUTES,
        );

        $xml = implode("\n", [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...$entries,
            '</urlset>',
        ])."\n";

        return response($xml)->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
