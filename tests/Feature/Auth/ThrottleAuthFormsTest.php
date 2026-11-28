<?php

declare(strict_types=1);

/*
 * Registration and password reset links are rate limited per IP (ThrottleAuthForms and the
 * limiters in FortifyServiceProvider). The requests carry invalid input: validation fails
 * after the throttle has counted them, so no users or mails are created.
 */

test('registration allows five attempts a minute per IP', function (): void {
    foreach (range(1, 5) as $attempt) {
        $this->post(route('register.store'))->assertRedirect();
    }

    $this->post(route('register.store'))->assertTooManyRequests();

    // Another IP has its own budget.
    $this->withServerVariables(['REMOTE_ADDR' => '203.0.113.9'])
        ->post(route('register.store'))
        ->assertRedirect();
});

test('registration allows twenty attempts an hour per IP', function (): void {
    foreach (range(1, 4) as $minute) {
        foreach (range(1, 5) as $attempt) {
            $this->post(route('register.store'))->assertRedirect();
        }

        $this->travel(1)->minutes();
    }

    $this->post(route('register.store'))->assertTooManyRequests();

    $this->travel(1)->hours();

    $this->post(route('register.store'))->assertRedirect();
});

test('password reset links allow five requests a minute per IP', function (): void {
    foreach (range(1, 5) as $attempt) {
        $this->post(route('password.email'), ['email' => "nobody{$attempt}@example.com"])->assertRedirect();
    }

    $this->post(route('password.email'), ['email' => 'nobody6@example.com'])->assertTooManyRequests();

    $this->travel(1)->minutes();

    $this->post(route('password.email'), ['email' => 'nobody7@example.com'])->assertRedirect();
});

test('other auth forms are not throttled by it', function (): void {
    foreach (range(1, 8) as $attempt) {
        $this->get(route('register'))->assertOk();
    }
});
