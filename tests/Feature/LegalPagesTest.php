<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

/*
 * The Terms of Service and the Privacy Policy share the site/legal page; the route tells
 * it which document to show. The copy itself lives in resources/js/i18n/legal.
 */

test('each legal page shows its own document', function (string $route, string $document): void {
    $this->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/legal')->where('document', $document));
})->with([
    'terms' => ['terms', 'terms'],
    'privacy' => ['privacy', 'privacy'],
    'terms in English' => ['en.terms', 'terms'],
    'privacy in English' => ['en.privacy', 'privacy'],
]);

test('legal pages have English addresses in both languages', function (): void {
    expect(route('terms'))->toEndWith('/terms-of-service')
        ->and(route('en.terms'))->toEndWith('/en/terms-of-service')
        ->and(route('privacy'))->toEndWith('/privacy-policy')
        ->and(route('en.privacy'))->toEndWith('/en/privacy-policy');
});
