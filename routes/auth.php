<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\VerifyEmailController;
use App\Livewire\Actions\SignOut;
use App\Livewire\Auth\ConfirmPassword;
use App\Livewire\Auth\ForgotPassword;
use App\Livewire\Auth\ResetPassword;
use App\Livewire\Auth\SignIn;
use App\Livewire\Auth\SignUp;
use App\Livewire\Auth\VerifyEmail;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('sign-in', SignIn::class)->name('signIn');
    Route::get('sign-up', SignUp::class)->name('signUp');
    Route::get('forgot-password', ForgotPassword::class)->name('password.request');
    Route::get('reset-password/{token}', ResetPassword::class)->name('password.reset');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', VerifyEmail::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::get('confirm-password', ConfirmPassword::class)
        ->name('password.confirm');
});

Route::post('sign-out', SignOut::class)->name('signOut');
