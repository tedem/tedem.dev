<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

/**
 * The admin's reply to a comment: published at once and marked as the author's.
 * Replies always attach to the top-level comment, so a thread stays one level deep.
 * Replying approves the comment too: answering it means it is fine to show.
 */
final class CommentReplyController extends Controller
{
    public function __invoke(Request $request, Comment $comment): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'min:2', 'max:'.Comment::MAX_LENGTH],
        ]);

        /** @var User $user */
        $user = $request->user();
        $parent = $comment->parent ?? $comment;

        if (! $comment->isApproved()) {
            $comment->forceFill(['approved_at' => Date::now()])->save();
        }

        $reply = new Comment([
            'parent_id' => $parent->id,
            'author_name' => $user->name,
            'author_email' => $user->email,
            'body' => $validated['body'],
        ]);
        $reply->post_id = $parent->post_id;
        $reply->user_id = $user->id;
        $reply->approved_at = Date::now();
        $reply->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Reply published.')]);

        return back();
    }
}
