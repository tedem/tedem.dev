<?php

declare(strict_types=1);

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
    'terms' => ['/terms-of-service', '/en/terms-of-service', 'site/legal'],
    'privacy' => ['/privacy-policy', '/en/privacy-policy', 'site/legal'],
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

test('an English post lives under /en', function (): void {
    $post = Post::factory()->english()->create();

    expect($post->url())->toBe(url("/en/posts/{$post->slug}/{$post->public_id}"));

    $this->get($post->url())
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/post')->where('locale', 'en'));
});

test('a post opened under the other language redirects to its own', function (): void {
    $turkish = Post::factory()->create();
    $english = Post::factory()->english()->create();

    $this->get("/en/posts/{$turkish->slug}/{$turkish->public_id}")->assertRedirect($turkish->url())->assertStatus(301);
    $this->get("/posts/{$english->slug}/{$english->public_id}")->assertRedirect($english->url())->assertStatus(301);
});

test('each language lists only its own posts', function (): void {
    $turkish = Post::factory()->create();
    $english = Post::factory()->english()->create();

    foreach (['/' => 'latestPosts', '/posts' => 'posts'] as $url => $prop) {
        $this->get($url)->assertInertia(fn (Assert $page): Assert => $page
            ->has($prop, 1)->where("{$prop}.0.publicId", $turkish->public_id));
        $this->get('/en'.mb_rtrim($url, '/'))->assertInertia(fn (Assert $page): Assert => $page
            ->has($prop, 1)->where("{$prop}.0.publicId", $english->public_id));
    }
});

test('newer and older links stay in the post language', function (): void {
    $older = Post::factory()->create(['published_at' => now()->subDays(3)]);
    Post::factory()->english()->create(['published_at' => now()->subDays(2)]);
    $post = Post::factory()->create(['published_at' => now()->subDay()]);

    $this->get($post->url())->assertInertia(fn (Assert $page): Assert => $page
        ->where('newer', null)
        ->where('older.publicId', $older->public_id));
});

test('the sitemap lists each post under its own language', function (): void {
    $english = Post::factory()->english()->create();

    $this->get(route('sitemap'))->assertSee('<loc>'.$english->url().'</loc>', false);
});

test('a wrong slug redirects within the same language', function (): void {
    $post = Post::factory()->english()->create();

    $this->get("/en/posts/old-slug/{$post->public_id}")
        ->assertMovedPermanently()
        ->assertRedirect(url("/en/posts/{$post->slug}/{$post->public_id}"));
});

test('pages outside the public site stay English and have no alternates', function (): void {
    $this->get(route('login'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('locale', 'en')->where('alternates', null));
});
