<?php

declare(strict_types=1);

use App\Enums\Locale;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

/*
| The public site, once per language (see App\Enums\Locale): Turkish without a prefix
| (/about, route "about"), English under /en (/en/about, route "en.about").
*/
foreach (Locale::cases() as $locale) {
    Route::prefix($locale->prefix())
        ->name($locale->routePrefix())
        ->middleware(SetLocale::class.':'.$locale->value)
        ->group(function (): void {
            Route::get('/', HomeController::class)->name('home');
            Route::inertia('about', 'site/about')->name('about');
            Route::get('posts', [PostController::class, 'index'])->name('posts');
            // The public id finds the post; the slug is for people and is corrected if it is out of date.
            Route::get('posts/{slug}/{publicId}', [PostController::class, 'show'])
                ->where(['slug' => '[a-z0-9]+(?:-[a-z0-9]+)*', 'publicId' => '[A-Za-z0-9]+'])
                ->name('posts.show');
            Route::inertia('contact', 'site/contact')->name('contact');
            // Both legal pages share one component; the copy lives in resources/js/i18n/legal.
            Route::inertia('terms-of-service', 'site/legal', ['document' => 'terms'])->name('terms');
            Route::inertia('privacy-policy', 'site/legal', ['document' => 'privacy'])->name('privacy');
        });
}

Route::get('sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('robots.txt', RobotsController::class)->name('robots');

// Where password managers and browsers send people to add or manage a passkey.
// It has to stay at the site root, outside the /admin prefix.
Route::get('.well-known/passkey-endpoints', fn () => response()->json([
    'enroll' => route('admin.security.edit'),
    'manage' => route('admin.security.edit'),
]))->name('well-known.passkeys');

require __DIR__.'/admin.php';
