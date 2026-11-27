<?php

declare(strict_types=1);

use App\Models\User;

test('it grants and revokes admin rights', function (): void {
    $user = User::factory()->create(['email' => 'owner@example.com']);

    $this->artisan('admin:grant', ['email' => 'owner@example.com'])->assertSuccessful();
    expect($user->refresh()->is_admin)->toBeTrue();

    $this->artisan('admin:grant', ['email' => 'owner@example.com', '--revoke' => true])->assertSuccessful();
    expect($user->refresh()->is_admin)->toBeFalse();
});

test('it fails for an unknown email', function (): void {
    $this->artisan('admin:grant', ['email' => 'nobody@example.com'])->assertFailed();
});

test('new accounts are not admins', function (): void {
    expect(User::factory()->create()->is_admin)->toBeFalse();
});
