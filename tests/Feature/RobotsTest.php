<?php

declare(strict_types=1);

test('robots.txt lets crawlers in and points at the sitemap in production', function (): void {
    app()->detectEnvironment(fn (): string => 'production');

    $this->get(route('robots'))
        ->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
        ->assertSee('Allow: /')
        ->assertSee('Sitemap: '.route('sitemap'));
});

test('robots.txt keeps crawlers out outside production', function (): void {
    $this->get(route('robots'))
        ->assertOk()
        ->assertSee('Disallow: /')
        ->assertDontSee('Sitemap:');
});
