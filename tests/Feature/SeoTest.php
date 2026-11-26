<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('pages share the app url for canonical links', function (): void {
    config(['app.url' => 'https://tedem.dev']);

    $this->get(route('about'))
        ->assertInertia(fn (Assert $page): Assert => $page->where('appUrl', 'https://tedem.dev'));
});
