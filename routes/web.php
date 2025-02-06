<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return view('home');
})->name('about');

Route::get('/contact', function () {
    return view('home');
})->name('contact');
