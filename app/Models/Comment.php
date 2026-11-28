<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonImmutable;
use Database\Factories\CommentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * A reader's comment on a post, or a reply to one. Anyone may write one with a name and
 * an email address; it shows on the site only after the admin approves it. Replies go one
 * level deep. The email address is never shown publicly.
 *
 * @property int $id
 * @property int $post_id
 * @property int|null $parent_id
 * @property int|null $user_id
 * @property string $author_name
 * @property string $author_email
 * @property string $body
 * @property CarbonImmutable|null $approved_at
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read Post $post
 * @property-read Comment|null $parent
 * @property-read Collection<int, Comment> $replies
 */
#[Fillable(['parent_id', 'author_name', 'author_email', 'body'])]
final class Comment extends Model
{
    /** @use HasFactory<CommentFactory> */
    use HasFactory;

    public const int MAX_LENGTH = 2000;

    /** @return BelongsTo<Post, $this> */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /** @return BelongsTo<Comment, $this> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** @return HasMany<Comment, $this> */
    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isApproved(): bool
    {
        return $this->approved_at !== null;
    }

    /** Written by the site owner from the admin area. */
    public function isFromOwner(): bool
    {
        return $this->user_id !== null;
    }

    /**
     * What the public post page shows: no email address, and only approved replies
     * (load them with the `approved` scope).
     *
     * @return array{id: int, name: string, body: string, createdAt: string|null, isOwner: bool, replies: list<array<string, mixed>>}
     */
    public function toPublic(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->author_name,
            'body' => $this->body,
            'createdAt' => $this->created_at?->toIso8601String(),
            'isOwner' => $this->isFromOwner(),
            'replies' => $this->relationLoaded('replies')
                ? array_values($this->replies->map(fn (self $reply): array => $reply->toPublic())->all())
                : [],
        ];
    }

    /**
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function approved(Builder $query): void
    {
        $query->whereNotNull('approved_at');
    }

    /**
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function pending(Builder $query): void
    {
        $query->whereNull('approved_at');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'approved_at' => 'immutable_datetime',
        ];
    }
}
