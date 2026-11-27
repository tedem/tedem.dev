<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('the home page can be rendered', function (): void {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/home'));
});
