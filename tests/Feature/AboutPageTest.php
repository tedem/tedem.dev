<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('the about page can be rendered', function (): void {
    $this->get(route('about'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/about'));
});
