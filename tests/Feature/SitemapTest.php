<?php

declare(strict_types=1);

test('the sitemap lists the public pages', function (): void {
    $response = $this->get(route('sitemap'));

    $response->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8');

    $xml = simplexml_load_string($response->getContent());
    $locations = array_map(
        fn (SimpleXMLElement $url): string => (string) $url->loc,
        iterator_to_array($xml->url, false),
    );

    expect($locations)->toBe([route('home'), route('about'), route('posts'), route('contact')]);
});

test('the sitemap leaves out private pages', function (): void {
    $this->get(route('sitemap'))
        ->assertDontSee(route('login'))
        ->assertDontSee(route('admin.dashboard'));
});
