<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

/*
 * Props every page receives (HandleInertiaRequests::share()). Their TypeScript types live in
 * resources/js/types/global.d.ts; keep both in step when one changes.
 */

test('the owner clock is shared as a timezone and a UTC offset in minutes', function (): void {
    config(['app.timezone' => 'Europe/Istanbul']);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page): Assert => $page
            ->where('time', fn ($time): bool => array_keys($time->all()) === ['timezone', 'offset']
                && $time['timezone'] === 'Europe/Istanbul'
                && $time['offset'] === 180));
});
