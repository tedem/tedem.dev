<?php

declare(strict_types=1);

namespace App\Models;

use App\Markdown\MarkdownRenderer;
use Carbon\CarbonImmutable;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;

/**
 * A blog post, written in Markdown in the admin area.
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string $body
 * @property CarbonImmutable|null $published_at
 * @property CarbonImmutable|null $created_at
 * @property CarbonImmutable|null $updated_at
 */
#[Fillable(['title', 'slug', 'description', 'body', 'published_at'])]
final class Post extends Model
{
    /** @use HasFactory<PostFactory> */
    use HasFactory;

    private const int WORDS_PER_MINUTE = 200;

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
     * @return array{slug: string, title: string, description: string, publishedAt: string|null, updatedAt: string|null, readingMinutes: int}
     */
    public function toSummary(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'publishedAt' => $this->published_at?->toDateString(),
            'updatedAt' => $this->updated_at?->toDateString(),
            'readingMinutes' => $this->readingMinutes(),
        ];
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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'immutable_datetime',
        ];
    }
}
