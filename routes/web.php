<?php

declare(strict_types=1);

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::inertia('about', 'site/about')->name('about');
Route::get('posts', [PostController::class, 'index'])->name('posts');
Route::get('posts/{slug}', [PostController::class, 'show'])
    ->where('slug', '[a-z0-9]+(?:-[a-z0-9]+)*')
    ->name('posts.show');
Route::inertia('contact', 'site/contact')->name('contact');

Route::get('sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('robots.txt', RobotsController::class)->name('robots');

// Where password managers and browsers send people to add or manage a passkey.
// It has to stay at the site root, outside the /admin prefix.
Route::get('.well-known/passkey-endpoints', fn () => response()->json([
    'enroll' => route('admin.security.edit'),
    'manage' => route('admin.security.edit'),
]))->name('well-known.passkeys');

require __DIR__.'/admin.php';
