<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * Readers' comments on a published post. A new comment waits for the admin's approval
 * (Admin\CommentController) before it shows on the site.
 *
 * Each IP may send a few comments a minute and a daily handful more. Going over is a
 * validation error on the `form` key rather than a 429 response, so the visitor stays on
 * the post and the form says why (in the page's language: the client words every error).
 */
final class CommentController extends Controller
{
    /**
     * Name of the honeypot field: hidden from people, so only bots fill it in. Meaningless
     * on purpose: autofill fills fields named like "website" or "url" even when hidden.
     */
    public const string HONEYPOT = 'hp_field';

    /** @var array<string, array{0: int, 1: int}> window => [max attempts, seconds] */
    private const array LIMITS = [
        'minute' => [3, 60],
        'day' => [20, 86400],
    ];

    public function store(Request $request, string $slug, string $publicId): RedirectResponse
    {
        $post = Post::query()->published()->where('public_id', $publicId)->firstOrFail();

        // A bot filled in the hidden field: answer as if it worked, so it learns nothing.
        // Logged, so a real reader caught by it (e.g. by an autofill tool) can be noticed.
        if ($request->filled(self::HONEYPOT)) {
            Log::warning('Comment dropped by the honeypot.', ['post' => $post->id, 'ip' => $request->ip()]);

            return back();
        }

        $validated = $request->validate([
            'author_name' => ['required', 'string', 'max:80'],
            'author_email' => ['required', 'string', 'email', 'max:255'],
            'body' => ['required', 'string', 'min:2', 'max:'.Comment::MAX_LENGTH],
            // Replies go one level deep, to an approved comment on the same post.
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('comments', 'id')
                    ->where('post_id', $post->id)
                    ->whereNull('parent_id')
                    ->whereNotNull('approved_at'),
            ],
        ]);

        $this->throttle($request);

        $post->comments()->create($validated);

        return back();
    }

    /**
     * Counts this comment against the sender's IP, or refuses it once a limit is reached.
     */
    private function throttle(Request $request): void
    {
        foreach (self::LIMITS as $window => [$max]) {
            if (RateLimiter::tooManyAttempts("comments|{$window}|{$request->ip()}", $max)) {
                throw ValidationException::withMessages(['form' => 'throttled']);
            }
        }

        foreach (self::LIMITS as $window => [, $seconds]) {
            RateLimiter::hit("comments|{$window}|{$request->ip()}", $seconds);
        }
    }
}
