<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Moderation: readers' comments wait here until approved. Approving and replying have
 * their own controllers (ApproveCommentController, CommentReplyController).
 */
final class CommentController extends Controller
{
    private const array FILTERS = ['pending', 'approved', 'all'];

    public function index(Request $request): Response
    {
        $filter = in_array($request->query('status'), self::FILTERS, true) ? $request->query('status') : 'pending';

        $comments = Comment::query()
            ->with(['post', 'parent'])
            ->when($filter === 'pending', fn ($query) => $query->pending())
            ->when($filter === 'approved', fn ($query) => $query->approved())
            ->latest()
            ->limit(200)
            ->get()
            ->map(fn (Comment $comment): array => [
                'id' => $comment->id,
                'name' => $comment->author_name,
                'email' => $comment->author_email,
                'body' => $comment->body,
                'isOwner' => $comment->isFromOwner(),
                'createdAt' => $comment->created_at?->toIso8601String(),
                'approvedAt' => $comment->approved_at?->toIso8601String(),
                'post' => [
                    'title' => $comment->post->title,
                    'url' => $comment->post->url().'#comment-'.$comment->id,
                ],
                'parent' => $comment->parent === null ? null : [
                    'name' => $comment->parent->author_name,
                    'excerpt' => Str::limit($comment->parent->body, 120),
                ],
            ]);

        return Inertia::render('admin/comments/index', [
            'comments' => $comments,
            'filter' => $filter,
            'counts' => [
                'pending' => Comment::query()->pending()->count(),
                'approved' => Comment::query()->approved()->count(),
                'all' => Comment::query()->count(),
            ],
        ]);
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Comment deleted.')]);

        return back();
    }
}
