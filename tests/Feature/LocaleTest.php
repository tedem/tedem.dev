<?php

declare(strict_types=1);

use App\Enums\Locale;
use App\Models\Post;
use Inertia\Testing\AssertableInertia as Assert;

/*
 * The public site in Turkish (default, unprefixed) and English (/en). The language comes
 * from the route: SetLocale sets it, HandleInertiaRequests shares it with the page.
 */

dataset('pages', [
    'home' => ['/', '/en', 'site/home'],
    'about' => ['/about', '/en/about', 'site/about'],
    'posts' => ['/posts', '/en/posts', 'site/posts'],
    'contact' => ['/contact', '/en/contact', 'site/contact'],
]);

test('every public page has a Turkish and an English address', function (string $turkish, string $english, string $component): void {
    $this->get($turkish)
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component($component)->where('locale', 'tr'));

    $this->get($english)
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component($component)->where('locale', 'en'));
})->with('pages');

test('the html element carries the page language', function (): void {
    $this->get('/')->assertSee('<html lang="tr"', false);
    $this->get('/en')->assertSee('<html lang="en"', false);
});

test('a page links to its twin in each language', function (string $turkish, string $english): void {
    $alternates = ['tr' => url($turkish), 'en' => url($english)];

    $this->get($turkish)->assertInertia(fn (Assert $page): Assert => $page->where('alternates', $alternates));
    $this->get($english)->assertInertia(fn (Assert $page): Assert => $page->where('alternates', $alternates));
})->with('pages');

test('a post links to the post list in each language', function (): void {
    $post = Post::factory()->create();

    $this->get($post->url())
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page
            ->where('locale', 'tr')
            ->where('alternates', ['tr' => url('/posts'), 'en' => url('/en/posts')]));
});

test('a post is reachable in English', function (): void {
    $post = Post::factory()->create();

    expect($post->url(Locale::English))->toBe(url("/en/posts/{$post->slug}/{$post->public_id}"));

    $this->get($post->url(Locale::English))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/post')->where('locale', 'en'));
});

test('a wrong slug redirects within the same language', function (): void {
    $post = Post::factory()->create();

    $this->get("/en/posts/old-slug/{$post->public_id}")
        ->assertMovedPermanently()
        ->assertRedirect(url("/en/posts/{$post->slug}/{$post->public_id}"));
});

test('pages outside the public site stay English and have no alternates', function (): void {
    $this->get(route('login'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('locale', 'en')->where('alternates', null));
});
