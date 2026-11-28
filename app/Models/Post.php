<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Locale;
use App\Markdown\MarkdownRenderer;
use Carbon\CarbonImmutable;
use Database\Factories\PostFactory;
use Dom\HTMLDocument;
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
 * @property-read int|null $comments_count
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

    /**
     * The post's h2 and h3 headings, for its table of contents. The ids are the ones the
     * Markdown renderer gives the headings' permalinks, so the entries link straight to them.
     *
     * @return list<array{level: int, id: string, text: string}>
     */
    public function outline(): array
    {
        $document = $this->document();
        $outline = [];

        foreach ($document->querySelectorAll('h2, h3') as $heading) {
            $permalink = $heading->querySelector('a.heading-permalink');
            $id = $permalink?->getAttribute('id');

            if ($id === null || $id === '') {
                continue;
            }

            $permalink->remove();

            $outline[] = [
                'level' => $heading->tagName === 'H2' ? 2 : 3,
                'id' => $id,
                'text' => mb_trim((string) $heading->textContent),
            ];
        }

        return $outline;
    }

    /**
     * Counts for the post page's side panel, from what a reader sees: the rendered body
     * without the "#" heading permalinks. Code counts as text too.
     *
     * @return array{words: int, characters: int, charactersWithoutSpaces: int, headings: int, codeBlocks: int, links: int, images: int}
     */
    public function stats(): array
    {
        $document = $this->document();

        foreach ($document->querySelectorAll('a.heading-permalink') as $permalink) {
            $permalink->remove();
        }

        $text = mb_trim((string) preg_replace('/\s+/u', ' ', (string) $document->body?->textContent));

        return [
            'words' => $this->countWords($text),
            'characters' => mb_strlen($text),
            'charactersWithoutSpaces' => mb_strlen(str_replace(' ', '', $text)),
            'headings' => $document->querySelectorAll('h2, h3, h4, h5, h6')->length,
            'codeBlocks' => $document->querySelectorAll('pre')->length,
            'links' => $document->querySelectorAll('a[href]')->length,
            'images' => $document->querySelectorAll('img')->length,
        ];
    }

    public function readingMinutes(): int
    {
        return max(1, (int) ceil($this->countWords(strip_tags($this->html())) / self::WORDS_PER_MINUTE));
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

    /**
     * Words in any script: runs of letters and digits, with inner apostrophes and hyphens
     * ("Türkiye’de", "end-to-end"). str_word_count() only knows ASCII letters, so it split
     * Turkish words at every "ş" or "ı".
     */
    private function countWords(string $text): int
    {
        return (int) preg_match_all("/[\\p{L}\\p{N}]+(?:['’-][\\p{L}\\p{N}]+)*/u", $text);
    }

    private function document(): HTMLDocument
    {
        return HTMLDocument::createFromString('<!DOCTYPE html><body>'.$this->html().'</body>', LIBXML_NOERROR);
    }
}
