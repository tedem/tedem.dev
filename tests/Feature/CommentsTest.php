<?php

declare(strict_types=1);

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Inertia\Testing\AssertableInertia as Assert;

/*
 * Readers' comments on the public post page: anyone may send one with a name and an email
 * address; it waits for approval, and only approved comments (without email addresses)
 * reach the page.
 */

function commentUrl(Post $post): string
{
    return route($post->locale->route('posts.comments.store'), ['slug' => $post->slug, 'publicId' => $post->public_id]);
}

function validComment(array $overrides = []): array
{
    return [
        'author_name' => 'Ada Lovelace',
        'author_email' => 'ada@example.com',
        'body' => 'A thoughtful note.',
        ...$overrides,
    ];
}

test('a new comment waits for approval', function (): void {
    $post = Post::factory()->create();

    $this->from($post->url())->post(commentUrl($post), validComment())->assertRedirect($post->url());

    $comment = Comment::query()->sole();
    expect($comment->post_id)->toBe($post->id)
        ->and($comment->author_name)->toBe('Ada Lovelace')
        ->and($comment->isApproved())->toBeFalse()
        ->and($comment->isFromOwner())->toBeFalse();
});

test('the post page shows approved comments and replies, never email addresses', function (): void {
    $post = Post::factory()->create();
    $approved = Comment::factory()->for($post)->create(['author_name' => 'Shown', 'created_at' => now()->subHour()]);
    Comment::factory()->replyTo($approved)->create(['author_name' => 'Shown reply']);
    Comment::factory()->replyTo($approved)->pending()->create(['author_name' => 'Hidden reply']);
    Comment::factory()->for($post)->pending()->create(['author_name' => 'Hidden']);
    Comment::factory()->create(['author_name' => 'Other post']);

    $this->get($post->url())
        ->assertOk()
        ->assertDontSee('@example.')
        ->assertInertia(fn (Assert $page): Assert => $page
            ->has('comments', 1)
            ->where('comments.0.name', 'Shown')
            ->has('comments.0.replies', 1)
            ->where('comments.0.replies.0.name', 'Shown reply')
            ->missing('comments.0.email')
            ->missing('comments.0.author_email'));
});

test('a comment needs a name, a valid email address and a body', function (array $input, string $field): void {
    $post = Post::factory()->create();

    $this->post(commentUrl($post), validComment($input))->assertSessionHasErrors($field);

    expect(Comment::query()->count())->toBe(0);
})->with([
    'no name' => [['author_name' => ''], 'author_name'],
    'long name' => [['author_name' => str_repeat('a', 81)], 'author_name'],
    'bad email' => [['author_email' => 'not-an-email'], 'author_email'],
    'empty body' => [['body' => ''], 'body'],
    'long body' => [['body' => str_repeat('a', Comment::MAX_LENGTH + 1)], 'body'],
]);

test('replies go to an approved top-level comment on the same post', function (): void {
    $post = Post::factory()->create();
    $parent = Comment::factory()->for($post)->create();

    $this->post(commentUrl($post), validComment(['parent_id' => $parent->id]))->assertSessionHasNoErrors();

    expect(Comment::query()->latest('id')->first()->parent_id)->toBe($parent->id);
});

test('a reply cannot go to a reply, a pending comment or another post', function (Closure $parent): void {
    $post = Post::factory()->create();

    $this->post(commentUrl($post), validComment(['parent_id' => $parent($post)->id]))
        ->assertSessionHasErrors('parent_id');
})->with([
    'a reply' => [fn (Post $post) => Comment::factory()->replyTo(Comment::factory()->for($post)->create())->create()],
    'a pending comment' => [fn (Post $post) => Comment::factory()->for($post)->pending()->create()],
    'another post' => [fn (Post $post) => Comment::factory()->create()],
]);

test('drafts and scheduled posts cannot be commented on', function (Post $post): void {
    $this->post(commentUrl($post), validComment())->assertNotFound();
})->with([
    'draft' => fn () => Post::factory()->draft()->create(),
    'scheduled' => fn () => Post::factory()->scheduled()->create(),
]);

test('the honeypot drops bot comments without saying so, and logs them', function (): void {
    Log::spy();
    $post = Post::factory()->create();

    $this->from($post->url())
        ->post(commentUrl($post), validComment(['hp_field' => 'https://spam.example']))
        ->assertRedirect($post->url())
        ->assertSessionHasNoErrors();

    expect(Comment::query()->count())->toBe(0);
    Log::shouldHaveReceived('warning')->once()->with('Comment dropped by the honeypot.', Mockery::type('array'));
});

test('a field named like an autofill target does not drop the comment', function (): void {
    $post = Post::factory()->create();

    $this->post(commentUrl($post), validComment(['website' => 'https://example.com']))->assertSessionHasNoErrors();

    expect(Comment::query()->count())->toBe(1);
});

test('each IP may send three comments a minute and twenty a day', function (): void {
    $post = Post::factory()->create();

    foreach (range(1, 3) as $attempt) {
        $this->post(commentUrl($post), validComment())->assertSessionHasNoErrors();
    }

    $this->post(commentUrl($post), validComment())->assertSessionHasErrors(['form' => 'throttled']);

    foreach (range(1, 6) as $minute) {
        $this->travel(61)->seconds();

        foreach (range(1, 3) as $attempt) {
            $this->post(commentUrl($post), validComment());
        }
    }

    expect(Comment::query()->count())->toBe(20);

    $this->travel(61)->seconds();
    $this->post(commentUrl($post), validComment())->assertSessionHasErrors(['form' => 'throttled']);

    $this->travel(1)->days();
    $this->post(commentUrl($post), validComment())->assertSessionHasNoErrors();
});

test('deleting a post deletes its comments', function (): void {
    $comment = Comment::factory()->create();
    Comment::factory()->replyTo($comment)->create();

    $comment->post->delete();

    expect(Comment::query()->count())->toBe(0);
});
