<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

final class PostRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $post = $this->route('post');

        return [
            'title' => ['required', 'string', 'max:200'],
            'slug' => [
                'required', 'string', 'max:200', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('posts', 'slug')->ignore($post instanceof Post ? $post->id : null),
            ],
            'description' => ['required', 'string', 'max:300'],
            'body' => ['required', 'string'],
            // Empty: draft. A date in the future schedules the post.
            'published_at' => ['nullable', 'date'],
        ];
    }

    /**
     * An empty slug comes from the title; any slug is normalised ("Hello World!" -> "hello-world").
     */
    protected function prepareForValidation(): void
    {
        $slug = $this->input('slug');
        $source = is_string($slug) && $slug !== '' ? $slug : $this->input('title');

        $this->merge(['slug' => Str::slug(is_string($source) ? $source : '')]);
    }
}
