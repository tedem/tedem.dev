<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Locale;
use App\Markdown\MarkdownRenderer;
use Carbon\CarbonImmutable;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;
use Override;

/**
 * A blog post, written in Markdown in the admin area.
 *
 * @property int $id
 * @property string $public_id
 * @property Locale $locale
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string $body
 * @property CarbonImmutable|null $published_at
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Comment> $comments
 */
#[Fillable(['locale', 'title', 'slug', 'description', 'body', 'published_at'])]
final class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    private const int WORDS_PER_MINUTE = 200;

    private const int PUBLIC_ID_LENGTH = 6;

    /**
     * A new post is in the site's default language until told otherwise.
     *
     * @var array<string, mixed>
     */
    #[Override]
    protected $attributes = [
        'locale' => Locale::Turkish->value,
    ];

    /**
     * A new, unused code for a post's URL: six random letters and digits. Assigned once when
     * the post is created and never changed, so a post's links outlive any rename.
     */
    public static function newPublicId(): string
    {
        do {
            $code = Str::random(self::PUBLIC_ID_LENGTH);
        } while (self::query()->where('public_id', $code)->exists());

        return $code;
    }

    /**
     * The public address, under the post's own language: /posts/{slug}/{publicId} for
     * Turkish, /en/posts/{slug}/{publicId} for English.
     */
    public function url(): string
    {
        return route($this->locale->route('posts.show'), ['slug' => $this->slug, 'publicId' => $this->public_id]);
    }

    /** @return HasMany<Comment, $this> */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null && $this->published_at->isPast();
    }

    /**
     * The body rendered to HTML. Cached per version of the post, since code highlighting
     * makes rendering the slowest part of showing a post.
     */
    public function html(): string
    {
        $version = $this->updated_at?->getTimestamp() ?? 0;

        return Cache::rememberForever(
            "posts.{$this->id}.html.{$version}",
            fn (): string => resolve(MarkdownRenderer::class)->render($this->body),
        );
    }

    public function readingMinutes(): int
    {
        return max(1, (int) ceil(str_word_count(strip_tags($this->html())) / self::WORDS_PER_MINUTE));
    }

    /**
     * What a post list needs: everything but the body.
     *
     * @return array{slug: string, publicId: string, title: string, description: string, publishedAt: string|null, updatedAt: string|null, readingMinutes: int}
     */
    public function toSummary(): array
    {
        return [
            'slug' => $this->slug,
            'publicId' => $this->public_id,
            'title' => $this->title,
            'description' => $this->description,
            'publishedAt' => $this->published_at?->toDateString(),
            'updatedAt' => $this->updated_at?->toDateString(),
            'readingMinutes' => $this->readingMinutes(),
        ];
    }

    protected static function booted(): void
    {
        self::creating(function (self $post): void {
            $post->public_id ??= self::newPublicId();
        });
    }

    /**
     * Posts whose publication date has come; drafts (no date) and scheduled posts are left out.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', Date::now());
    }

    /**
     * Posts written in the given language.
     *
     * @param  Builder<self>  $query
     */
    #[Scope]
    protected function inLocale(Builder $query, Locale $locale): void
    {
        $query->where('locale', $locale->value);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'locale' => Locale::class,
            'published_at' => 'immutable_datetime',
        ];
    }
}
