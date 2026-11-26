<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Settings\SecurityController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

/*
| The admin area: everything behind a login lives under /admin, with route names
| prefixed `admin.`. Fortify's own routes (login, registration, password reset,
| two-factor, passkeys) use the same /admin prefix through config/fortify.php.
*/

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::middleware(['auth'])->group(function (): void {
        Route::redirect('settings', '/admin/settings/profile')->name('settings');

        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    });

    Route::middleware(['auth', 'verified'])->group(function (): void {
        Route::inertia('/', 'admin/dashboard')->name('dashboard');

        Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('settings/security', [SecurityController::class, 'edit'])
            ->middleware(RequirePassword::class)
            ->name('security.edit');

        Route::put('settings/password', [SecurityController::class, 'update'])
            ->middleware('throttle:6,1')
            ->name('user-password.update');

        Route::inertia('settings/appearance', 'admin/settings/appearance')->name('appearance.edit');
    });
});
