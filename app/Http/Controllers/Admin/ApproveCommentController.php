<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

/**
 * Publishes a reader's comment on the site.
 */
final class ApproveCommentController extends Controller
{
    public function __invoke(Comment $comment): RedirectResponse
    {
        $comment->forceFill(['approved_at' => Date::now()])->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Comment approved.')]);

        return back();
    }
}
