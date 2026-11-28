<?php

declare(strict_types=1);

use App\Models\Comment;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('only admins can moderate comments', function (): void {
    $comment = Comment::factory()->pending()->create();

    $this->get(route('admin.comments.index'))->assertRedirect(route('login'));

    $this->actingAs(User::factory()->create());

    $this->get(route('admin.comments.index'))->assertForbidden();
    $this->patch(route('admin.comments.approve', $comment))->assertForbidden();
    $this->post(route('admin.comments.reply', $comment), ['body' => 'Hi'])->assertForbidden();
    $this->delete(route('admin.comments.destroy', $comment))->assertForbidden();

    expect($comment->fresh()->isApproved())->toBeFalse();
});

test('the list shows pending comments first, with counts for each filter', function (): void {
    Comment::factory()->pending()->count(2)->create();
    Comment::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.comments.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page
            ->component('admin/comments/index')
            ->where('filter', 'pending')
            ->has('comments', 2)
            ->where('counts', ['pending' => 2, 'approved' => 1, 'all' => 3]));
});

test('the list can show approved or all comments', function (string $filter, int $count): void {
    Comment::factory()->pending()->create();
    Comment::factory()->count(2)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.comments.index', ['status' => $filter]))
        ->assertInertia(fn (Assert $page): Assert => $page->where('filter', $filter)->has('comments', $count));
})->with([
    'approved' => ['approved', 2],
    'all' => ['all', 3],
]);

test('admins can approve a comment', function (): void {
    $comment = Comment::factory()->pending()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.comments.approve', $comment))
        ->assertRedirect();

    expect($comment->fresh()->isApproved())->toBeTrue();
});

test('an admin reply is published as the author and approves the comment', function (): void {
    $admin = User::factory()->admin()->create(['name' => 'Medet']);
    $comment = Comment::factory()->pending()->create();

    $this->actingAs($admin)
        ->post(route('admin.comments.reply', $comment), ['body' => 'Thanks for reading!'])
        ->assertRedirect();

    $reply = Comment::query()->whereNotNull('parent_id')->sole();

    expect($comment->fresh()->isApproved())->toBeTrue()
        ->and($reply->parent_id)->toBe($comment->id)
        ->and($reply->post_id)->toBe($comment->post_id)
        ->and($reply->author_name)->toBe('Medet')
        ->and($reply->isFromOwner())->toBeTrue()
        ->and($reply->isApproved())->toBeTrue();
});

test('replying to a reply answers its top-level comment', function (): void {
    $parent = Comment::factory()->create();
    $reply = Comment::factory()->replyTo($parent)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.comments.reply', $reply), ['body' => 'Same thread.']);

    expect(Comment::query()->latest('id')->first()->parent_id)->toBe($parent->id);
});

test('admins can delete a comment and its replies', function (): void {
    $comment = Comment::factory()->create();
    Comment::factory()->replyTo($comment)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.comments.destroy', $comment))
        ->assertRedirect();

    expect(Comment::query()->count())->toBe(0);
});
