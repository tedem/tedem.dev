<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Enums\Locale;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Renders 403, 404, 500 and 503 responses with the site's own error page instead of
 * Laravel's plain one. With APP_DEBUG on, server errors keep Laravel's debug screen so
 * the stack trace stays visible; JSON requests always keep their JSON body.
 */
final class RenderErrorPage
{
    private const array CLIENT_ERRORS = [403, 404];

    private const array SERVER_ERRORS = [500, 503];

    public function __invoke(Response $response, Throwable $exception, Request $request): Response
    {
        $status = $response->getStatusCode();

        if ($request->expectsJson() || ! $this->handles($status)) {
            return $response;
        }

        // Unknown URLs fail before any route middleware runs: SetLocale never set the
        // language, so it comes from the path (/en/... is English), and the shared props
        // (site name, app URL, time) that the layout and page need are added here.
        if ($request->route() === null) {
            app()->setLocale(Locale::fromPath($request->path())->value);
        }

        Inertia::share(resolve(HandleInertiaRequests::class)->share($request));

        return Inertia::render('site/error', ['status' => $status])
            ->toResponse($request)
            ->setStatusCode($status);
    }

    private function handles(int $status): bool
    {
        if (in_array($status, self::CLIENT_ERRORS, true)) {
            return true;
        }

        return in_array($status, self::SERVER_ERRORS, true) && ! config('app.debug');
    }
}
