<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;

test('the posts page can be rendered', function (): void {
    $this->get(route('posts'))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component('site/posts'));
});
