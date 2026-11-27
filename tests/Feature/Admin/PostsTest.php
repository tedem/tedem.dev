<?php

declare(strict_types=1);

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

test('slugs must be unique', function (): void {
    Post::factory()->create(['slug' => 'taken']);
    $this->actingAs(User::factory()->admin()->create());

    $this->post(route('admin.posts.store'), [
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
