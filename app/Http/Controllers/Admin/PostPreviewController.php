<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Markdown\MarkdownRenderer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Renders unsaved Markdown for the editor's Preview tab, with the same renderer as the
 * public post page, so the preview matches what will be published.
 */
final class PostPreviewController extends Controller
{
    public function __invoke(Request $request, MarkdownRenderer $markdown): JsonResponse
    {
        $validated = $request->validate(['body' => ['present', 'nullable', 'string']]);

        return response()->json(['html' => $markdown->render((string) ($validated['body'] ?? ''))]);
    }
}
