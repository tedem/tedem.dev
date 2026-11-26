<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Baseline security headers on every response, error pages included.
 *
 * Not set here: a full Content-Security-Policy. app.blade.php has an inline theme
 * script and Vite serves from another origin in development, so a script policy needs
 * nonces first; `frame-ancestors` is the one CSP directive that is safe to send now.
 */
final class AddSecurityHeaders
{
    /**
     * Browser features the site never uses. Passkeys (WebAuthn) and the clipboard are
     * used, so `publickey-credentials-*` and `clipboard-write` are left alone.
     */
    private const string PERMISSIONS_POLICY = 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()';

    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $headers = [
            'X-Content-Type-Options' => 'nosniff',
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
            // Both, because older browsers only know X-Frame-Options.
            'X-Frame-Options' => 'DENY',
            'Content-Security-Policy' => "frame-ancestors 'none'",
            'Cross-Origin-Opener-Policy' => 'same-origin',
            'Permissions-Policy' => self::PERMISSIONS_POLICY,
        ];

        // Only over HTTPS in production: HSTS makes browsers refuse plain HTTP for a year,
        // which would lock local *.test hosts out. No includeSubDomains, so a subdomain
        // without HTTPS is never broken by it.
        if (app()->isProduction() && $request->isSecure()) {
            $headers['Strict-Transport-Security'] = 'max-age=31536000';
        }

        foreach ($headers as $name => $value) {
            if (! $response->headers->has($name)) {
                $response->headers->set($name, $value);
            }
        }

        return $response;
    }
}
