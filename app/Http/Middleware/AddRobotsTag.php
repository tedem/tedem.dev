<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Support\IndexablePages;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Keeps everything except the public pages out of search results: login, registration,
 * password reset, two-factor, dashboard, settings and any route added later.
 * A header (rather than a meta tag) also covers non-HTML responses.
 *
 * Two responses never get the header, and neither needs it: unknown URLs (their 404
 * status keeps them out) and the guest redirect from `auth`, which runs earlier by
 * middleware priority (crawlers follow it to the login page, which has the header).
 */
final class AddRobotsTag
{
    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (! $request->routeIs(...IndexablePages::ROUTES)) {
            $response->headers->set('X-Robots-Tag', 'noindex, nofollow');
        }

        return $response;
    }
}
