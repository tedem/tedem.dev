<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('the contact page can be rendered', function (): void {
    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/contact'));
});
