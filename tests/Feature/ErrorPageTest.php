<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

test('unknown urls render the error page with a 404', function (): void {
    $this->get('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertInertia(fn (Assert $page): Assert => $page
            ->component('site/error')
            ->where('status', 404)
            ->has('appUrl'));
});

test('forbidden pages render the error page with a 403', function (): void {
    Route::get('/_test/forbidden', fn () => abort(403));

    $this->get('/_test/forbidden')
        ->assertForbidden()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/error')->where('status', 403));
});

test('server errors render the error page when debug is off', function (): void {
    config(['app.debug' => false]);
    Route::get('/_test/broken', fn (): never => throw new RuntimeException('Boom'));

    $this->get('/_test/broken')
        ->assertInternalServerError()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/error')->where('status', 500));
});

test('server errors keep the debug screen when debug is on', function (): void {
    config(['app.debug' => true]);
    Route::get('/_test/broken', fn (): never => throw new RuntimeException('Boom'));

    $this->get('/_test/broken')
        ->assertInternalServerError()
        // Laravel's debug screen shows the exception message; the site's error page never does.
        ->assertSee('Boom');
});

test('json requests keep a json error body', function (): void {
    $this->getJson('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertJsonStructure(['message']);
});
