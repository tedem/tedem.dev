<?php

declare(strict_types=1);

dataset('security headers', [
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['X-Frame-Options', 'DENY'],
    ['Content-Security-Policy', "frame-ancestors 'none'"],
    ['Cross-Origin-Opener-Policy', 'same-origin'],
]);

test('pages send the security headers', function (string $header, string $value): void {
    $this->get(route('home'))->assertHeader($header, $value);
})->with('security headers');

test('404s for unknown urls send the security headers', function (string $header, string $value): void {
    $this->get('/this-page-does-not-exist')->assertNotFound()->assertHeader($header, $value);
})->with('security headers');

test('the permissions policy leaves passkeys and the clipboard allowed', function (): void {
    $policy = $this->get(route('home'))->headers->get('Permissions-Policy');

    expect($policy)
        ->toContain('camera=()')
        ->not->toContain('publickey-credentials')
        ->not->toContain('clipboard');
});

test('hsts is sent over https in production', function (): void {
    app()->detectEnvironment(fn (): string => 'production');

    $this->get('https://localhost/')->assertHeader('Strict-Transport-Security', 'max-age=31536000');
});

test('hsts is not sent over plain http', function (): void {
    app()->detectEnvironment(fn (): string => 'production');

    $this->get('http://localhost/')->assertHeaderMissing('Strict-Transport-Security');
});

test('hsts is not sent outside production', function (): void {
    $this->get('https://localhost/')->assertHeaderMissing('Strict-Transport-Security');
});
