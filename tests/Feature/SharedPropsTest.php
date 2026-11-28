<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

/*
 * Props every page receives (HandleInertiaRequests::share()). Their TypeScript types live in
 * resources/js/types/global.d.ts; keep both in step when one changes.
 */

test('the owner clock is shared as a timezone and a UTC offset in minutes', function (): void {
    config(['app.timezone' => 'Europe/Istanbul']);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page
            ->where('time', fn ($time): bool => array_keys($time->all()) === ['timezone', 'offset']
                && $time['timezone'] === 'Europe/Istanbul'
                && $time['offset'] === 180));
});

test('cookie consent is null until the visitor chooses', function (): void {
    $this->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('cookieConsent', null));
});

test('cookie consent is read from its unencrypted cookie', function (): void {
    $this->withUnencryptedCookie('cookie_consent', json_encode(['v' => 1, 'preferences' => true]))
        ->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('cookieConsent', ['preferences' => true]));
});

test('cookie consent from another version or malformed is ignored', function (string $value): void {
    $this->withUnencryptedCookie('cookie_consent', $value)
        ->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('cookieConsent', null));
})->with([
    'old version' => json_encode(['v' => 0, 'preferences' => true]),
    'not json' => '{nope',
    'not an object' => '"yes"',
]);

test('a missing category counts as declined', function (): void {
    $this->withUnencryptedCookie('cookie_consent', json_encode(['v' => 1]))
        ->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('cookieConsent', ['preferences' => false]));
});
