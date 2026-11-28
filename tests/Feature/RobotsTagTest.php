<?php

declare(strict_types=1);

use App\Models\User;

test('public pages can be indexed', function (string $route): void {
    $this->get(route($route))
        ->assertOk()
        ->assertHeaderMissing('X-Robots-Tag');
})->with(['home', 'about', 'posts', 'contact', 'terms', 'privacy']);

test('auth pages are kept out of search results', function (string $route): void {
    $this->get(route($route))
        ->assertHeader('X-Robots-Tag', 'noindex, nofollow');
})->with(['login', 'password.request']);

test('the dashboard is kept out of search results', function (): void {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertHeader('X-Robots-Tag', 'noindex, nofollow');
});
