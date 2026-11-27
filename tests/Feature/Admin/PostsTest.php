<?php

declare(strict_types=1);

use App\Enums\Locale;
use App\Models\Post;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are sent to the login page', function (): void {
    $this->get(route('admin.posts.index'))->assertRedirect(route('login'));
});

test('users without admin rights cannot manage posts', function (): void {
    $this->actingAs(User::factory()->create());

    $this->get(route('admin.posts.index'))->assertForbidden();
    $this->post(route('admin.posts.store'), [])->assertForbidden();
    $this->post(route('admin.posts.preview'), ['body' => '# Hi'])->assertForbidden();
});

test('admins see every post with its status', function (): void {
    Post::factory()->create(['title' => 'Live']);
    Post::factory()->draft()->create(['title' => 'Draft']);
    Post::factory()->scheduled()->create(['title' => 'Later']);

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.posts.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page
            ->component('admin/posts/index')
            ->has('posts', 3)
            ->where('posts', fn ($posts): bool => collect($posts)->pluck('status', 'title')->sortKeys()->all() === [
                'Draft' => 'draft', 'Later' => 'scheduled', 'Live' => 'published',
            ]));
});

test('admins can create a post, with the slug taken from the title', function (): void {
    $this->actingAs(User::factory()->admin()->create());

    $response = $this->post(route('admin.posts.store'), [
        'locale' => 'tr',
        'title' => 'Hello World!',
        'slug' => '',
        'description' => 'A first post.',
        'body' => '## Hi',
        'published_at' => '',
    ]);

    $post = Post::query()->sole();

    expect($post->slug)->toBe('hello-world')
        ->and($post->published_at)->toBeNull();

    $response->assertRedirect(route('admin.posts.edit', $post));
});

test('the public id cannot be set from the form', function (): void {
    $post = Post::factory()->create();
    $code = $post->public_id;
    $this->actingAs(User::factory()->admin()->create());

    $this->put(route('admin.posts.update', $post), [
        'locale' => 'tr',
        'title' => $post->title,
        'slug' => $post->slug,
        'description' => $post->description,
        'body' => $post->body,
        'public_id' => 'hacked',
    ]);

    expect($post->refresh()->public_id)->toBe($code);
});

test('slugs must be unique', function (): void {
    Post::factory()->create(['slug' => 'taken']);
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.posts.store'), [
        'locale' => 'tr',
        'title' => 'Another',
        'slug' => 'taken',
        'description' => 'x',
        'body' => 'x',
    ])->assertSessionHasErrors('slug');
});

test('admins can update and publish a post', function (): void {
    $post = Post::factory()->draft()->create();
    $this->actingAs(User::factory()->admin()->create());

    $this->from(route('admin.posts.edit', $post))
        ->put(route('admin.posts.update', $post), [
            'locale' => 'tr',
            'title' => 'Renamed',
            'slug' => $post->slug,
            'description' => 'Updated.',
            'body' => 'New body',
            'published_at' => '2026-01-01T10:00',
        ])
        ->assertRedirect(route('admin.posts.edit', $post));

    $post->refresh();

    expect($post->title)->toBe('Renamed')
        ->and($post->isPublished())->toBeTrue();
});

test('a post is written in one of the site languages', function (?string $locale): void {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.posts.store'), [
        'locale' => $locale,
        'title' => 'Hello',
        'description' => 'x',
        'body' => 'x',
    ])->assertSessionHasErrors('locale');
})->with([null, 'de', 'TR']);

test('admins can write a post in English', function (): void {
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.posts.store'), [
        'locale' => 'en',
        'title' => 'Hello',
        'description' => 'x',
        'body' => 'x',
        'published_at' => '2026-01-01T10:00',
    ])->assertSessionHasNoErrors();

    $post = Post::query()->sole();

    expect($post->locale)->toBe(Locale::English)
        ->and($post->url())->toBe(url("/en/posts/hello/{$post->public_id}"));
});

test('the post list shows the language and address of each post', function (): void {
    $post = Post::factory()->english()->create();
    $this->actingAs(User::factory()->admin()->create());

    $this->get(route('admin.posts.index'))
        ->assertInertia(fn (Assert $page): Assert => $page
            ->where('posts.0.locale', 'en')
            ->where('posts.0.path', "/en/posts/{$post->slug}/{$post->public_id}"));
});

test('admins can delete a post', function (): void {
    $post = Post::factory()->create();
    $this->actingAs(User::factory()->admin()->create());

    $this->delete(route('admin.posts.destroy', $post))->assertRedirect(route('admin.posts.index'));

    expect(Post::query()->count())->toBe(0);
});

test('the preview renders markdown like the public page', function (): void {
    $this->actingAs(User::factory()->admin()->create());

    $this->postJson(route('admin.posts.preview'), ['body' => "## Title\n\n- [x] done\n\n```php\necho 1;\n```"])
        ->assertOk()
        ->assertJsonPath('html', fn (string $html): bool => str_contains($html, '<h2>Title')
            && str_contains($html, 'type="checkbox"')
            && str_contains($html, 'class="phiki language-php'));
});
