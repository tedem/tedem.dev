<?php

declare(strict_types=1);

use App\Models\Post;
use Inertia\Testing\AssertableInertia as Assert;

test('the posts page lists published posts, newest first', function (): void {
    Post::factory()->create(['slug' => 'older', 'published_at' => now()->subDays(5)]);
    Post::factory()->create(['slug' => 'newer', 'published_at' => now()->subDay()]);
    Post::factory()->draft()->create(['slug' => 'draft']);
    Post::factory()->scheduled()->create(['slug' => 'later']);

    $this->get(route('posts'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page
            ->component('site/posts')
            ->has('posts', 2)
            ->where('posts.0.slug', 'newer')
            ->where('posts.1.slug', 'older')
            ->missing('posts.0.html'));
});

test('a post page shows rendered markdown and its neighbours', function (): void {
    $older = Post::factory()->create(['published_at' => now()->subDays(3)]);
    $post = Post::factory()->create([
        'slug' => 'middle',
        'body' => "## Heading\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n```js\nconsole.log(1)\n```",
        'published_at' => now()->subDays(2),
    ]);
    $newer = Post::factory()->create(['published_at' => now()->subDay()]);

    $this->get($post->url())
        ->assertOk()
        ->assertHeaderMissing('X-Robots-Tag')
        ->assertInertia(fn (Assert $page): Assert => $page
            ->component('site/post')
            ->where('post.slug', 'middle')
            ->where('post.publicId', $post->public_id)
            ->where('post.html', fn (string $html): bool => str_contains($html, '<table>')
                && str_contains($html, 'class="phiki language-javascript'))
            ->where('older.slug', $older->slug)
            ->where('newer.slug', $newer->slug));
});

test('drafts and scheduled posts are not found', function (): void {
    $draft = Post::factory()->draft()->create();
    $scheduled = Post::factory()->scheduled()->create();

    $this->get($draft->url())->assertNotFound();
    $this->get($scheduled->url())->assertNotFound();
});

test('a wrong or old slug redirects to the current address', function (): void {
    $post = Post::factory()->create(['slug' => 'merhaba-dunya']);

    $this->get(route('posts.show', ['slug' => 'something-else', 'publicId' => $post->public_id]))
        ->assertStatus(301)
        ->assertRedirect($post->url());
});

test('renaming a post keeps its old link working', function (): void {
    $post = Post::factory()->create(['slug' => 'merhaba-dunya']);
    $oldUrl = $post->url();

    $post->update(['slug' => 'hello-world']);

    $this->get($oldUrl)->assertStatus(301)->assertRedirect($post->url());
    $this->get($post->url())->assertOk();
});

test('codes that are not a post are not found', function (): void {
    Post::factory()->create();

    $this->get(route('posts.show', ['slug' => 'any', 'publicId' => 'zzzzzz']))->assertNotFound();
});

test('every post gets its own six-character code when it is created', function (): void {
    $posts = Post::factory()->count(5)->create();

    expect($posts->pluck('public_id')->unique())->toHaveCount(5)
        ->each->toMatch('/^[A-Za-z0-9]{6}$/');
});

test('a post keeps its code when it is edited', function (): void {
    $post = Post::factory()->create();
    $code = $post->public_id;

    $post->update(['title' => 'Renamed', 'slug' => 'renamed']);

    expect($post->refresh()->public_id)->toBe($code);
});

test('the home page shows the three latest posts', function (): void {
    Post::factory()->count(4)->sequence(fn ($sequence): array => ['published_at' => now()->subDays($sequence->index + 1)])->create();

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page->has('latestPosts', 3));
});

test('the sitemap lists published posts with their last change', function (): void {
    $post = Post::factory()->create(['slug' => 'in-sitemap']);
    Post::factory()->draft()->create(['slug' => 'not-in-sitemap']);

    $this->get(route('sitemap'))
        ->assertSee('<loc>'.$post->url().'</loc><lastmod>'.$post->updated_at?->toDateString().'</lastmod>', false)
        ->assertDontSee('not-in-sitemap');
});
