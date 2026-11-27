<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\Locale;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
final class PostFactory extends Factory
{
    /**
     * Define the model's default state: a published post.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = mb_rtrim(fake()->unique()->sentence(4), '.');

        return [
            'locale' => Locale::Turkish,
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => fake()->sentence(12),
            'body' => "## Introduction\n\n".fake()->paragraph()."\n\n".fake()->paragraph(),
            'published_at' => now()->subDay(),
        ];
    }

    public function english(): static
    {
        return $this->state(fn (array $attributes): array => ['locale' => Locale::English]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes): array => ['published_at' => null]);
    }

    public function scheduled(): static
    {
        return $this->state(fn (array $attributes): array => ['published_at' => now()->addWeek()]);
    }
}
