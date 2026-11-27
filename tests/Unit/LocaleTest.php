<?php

declare(strict_types=1);

use App\Enums\Locale;

test('a path belongs to the language of its first segment', function (string $path, Locale $locale): void {
    expect(Locale::fromPath($path))->toBe($locale);
})->with([
    ['/', Locale::Turkish],
    ['about', Locale::Turkish],
    ['english-words', Locale::Turkish],
    ['en', Locale::English],
    ['en/about', Locale::English],
    ['/en/', Locale::English],
    ['enx/about', Locale::Turkish],
    ['admin/posts', Locale::English],
]);
