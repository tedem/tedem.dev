<?php

declare(strict_types=1);

use App\Exceptions\RenderErrorPage;
use App\Http\Controllers\Controller;

/*
 * Architecture rules: conventions the codebase already follows, written down so a new
 * file that breaks them fails the test suite instead of slipping into review.
 */

// No debugging leftovers (dd, dump, var_dump, ...) and no deprecated PHP functions.
arch('php')->preset()->php();

// No eval, md5, unserialize and other risky functions.
arch('security')->preset()->security();

// Laravel conventions (controllers, requests, middleware where they belong).
// RenderErrorPage reuses HandleInertiaRequests::share() on purpose: unknown URLs never
// run route middleware, so the error page shares the same props through it.
arch('laravel')->preset()->laravel()->ignoring(RenderErrorPage::class);

arch('strict types everywhere')
    ->expect(['App', 'Database', 'Tests'])
    ->toUseStrictTypes();

arch('strict comparisons')
    ->expect('App')
    ->toUseStrictEquality();

// Classes are final unless they are meant to be extended.
arch('final classes')
    ->expect('App')
    ->classes()
    ->toBeFinal()
    ->ignoring(Controller::class);
