<?php

declare(strict_types=1);

use App\Models\Post;

test('the sitemap lists the public pages', function (): void {
    $response = $this->get(route('sitemap'));

    $response->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8');

    $xml = simplexml_load_string($response->getContent());
    $locations = array_map(
        fn (SimpleXMLElement $url): string => (string) $url->loc,
        iterator_to_array($xml->url, false),
    );

    expect($locations)->toBe([
        route('home'), route('about'), route('posts'), route('contact'), route('terms'), route('privacy'),
        route('en.home'), route('en.about'), route('en.posts'), route('en.contact'), route('en.terms'), route('en.privacy'),
    ]);
});

test('the sitemap leaves out private pages', function (): void {
    $this->get(route('sitemap'))
        ->assertDontSee(route('login'))
        ->assertDontSee(route('admin.dashboard'));
});

test('each page lists its translations, with Turkish as x-default', function (): void {
    $xml = simplexml_load_string($this->get(route('sitemap'))->getContent());
    $xml->registerXPathNamespace('s', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    $xml->registerXPathNamespace('xhtml', 'http://www.w3.org/1999/xhtml');

    foreach ([route('about'), route('en.about')] as $location) {
        $links = $xml->xpath("//s:url[s:loc='{$location}']/xhtml:link");
        $alternates = [];

        foreach ($links as $link) {
            $alternates[(string) $link['hreflang']] = (string) $link['href'];
        }

        expect($alternates)->toBe(['tr' => route('about'), 'en' => route('en.about'), 'x-default' => route('about')]);
    }
});

test('posts list no translations', function (): void {
    $post = Post::factory()->create();

    $this->get(route('sitemap'))->assertSee('<url><loc>'.$post->url().'</loc><lastmod>', false)
        ->assertDontSee('href="'.$post->url().'"', false);
});
