<?php

declare(strict_types=1);

use App\Livewire\Actions\Logout;
use App\Livewire\Auth\Login;
use App\Livewire\Auth\Register;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', Login::class)->name('login');
    Route::get('register', Register::class)->name('register');
});

Route::post('logout', Logout::class)->name('logout');
