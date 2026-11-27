<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->latest('updated_at')
            ->get()
            ->map(fn (Post $post): array => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'publicId' => $post->public_id,
                'status' => $this->status($post),
                'publishedAt' => $post->published_at?->toIso8601String(),
                'updatedAt' => $post->updated_at?->toIso8601String(),
            ]);

        return Inertia::render('admin/posts/index', ['posts' => $posts]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/create');
    }

    public function store(PostRequest $request): RedirectResponse
    {
        $post = Post::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Post created.')]);

        return to_route('admin.posts.edit', $post);
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('admin/posts/edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'description' => $post->description,
                'body' => $post->body,
                // The value a datetime-local input expects, in the app's timezone.
                'publishedAt' => $post->published_at?->setTimezone(config('app.timezone'))->format('Y-m-d\TH:i'),
                'status' => $this->status($post),
                'url' => $post->isPublished() ? $post->url() : null,
            ],
        ]);
    }

    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Post saved.')]);

        return back();
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Post deleted.')]);

        return to_route('admin.posts.index');
    }

    /**
     * @return 'draft'|'scheduled'|'published'
     */
    private function status(Post $post): string
    {
        return match (true) {
            $post->published_at === null => 'draft',
            $post->isPublished() => 'published',
            default => 'scheduled',
        };
    }
}
