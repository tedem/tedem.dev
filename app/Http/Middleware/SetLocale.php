<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\Locale;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sets the app's language for a site route group: `SetLocale::class.':en'`.
 */
final class SetLocale
{
    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $locale): Response
    {
        app()->setLocale(Locale::from($locale)->value);

        return $next($request);
    }
}
