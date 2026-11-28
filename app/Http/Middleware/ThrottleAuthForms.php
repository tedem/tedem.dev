<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Symfony\Component\HttpFoundation\Response;

/**
 * Rate limits the Fortify forms that Fortify itself leaves open: registration and
 * password reset links. Fortify registers its own routes, so this runs on all of them
 * (config/fortify.php `middleware`) and throttles only these two, with the limiters
 * defined in FortifyServiceProvider.
 */
final readonly class ThrottleAuthForms
{
    private const array LIMITERS = [
        'register.store' => 'register',
        'password.email' => 'password-reset',
    ];

    public function __construct(private ThrottleRequests $throttle) {}

    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Unnamed routes (and requests with no route) are never throttled here.
        $name = $request->route()?->getName();
        $limiter = $name === null ? null : self::LIMITERS[$name] ?? null;

        return $limiter === null ? $next($request) : $this->throttle->handle($request, $next, $limiter);
    }
}
