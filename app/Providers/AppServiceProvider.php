<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Register a view composer that binds social media accounts data to all views.
         *
         * This view composer will attach an array of social media accounts to every view
         * rendered by the application.
         *
         * @param  \Illuminate\View\View  $view  The view instance being composed.
         */
        view()->composer('*', function ($view): void {
            $view->with('socialAccounts', [
                ['name' => 'X', 'url' => 'https://x.com/tedemedet'],
                ['name' => 'Instagram', 'url' => 'https://www.instagram.com/tedem.dev/'],
                ['name' => 'Bluesky', 'url' => 'https://bsky.app/profile/tedem.dev'],
                ['name' => 'Github', 'url' => 'https://github.com/tedem'],
            ]);
        });
    }
}
