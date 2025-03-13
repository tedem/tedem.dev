<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/about', [App\Http\Controllers\AboutController::class, 'index'])->name('about');

Route::get('/contact', [App\Http\Controllers\ContactController::class, 'index'])->name('contact');

Route::get('/terms-of-service', fn () => view('terms-of-service.index'))->name('terms-of-service');
Route::get('/privacy-policy', fn () => view('privacy-policy.index'))->name('privacy-policy');

require __DIR__.'/auth.php';
