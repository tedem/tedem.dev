<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\CookieConsentService;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        /**
         * Register the CookieConsentService class in the service container.
         */
        $this->app->singleton(CookieConsentService::class,
            fn (): CookieConsentService => new CookieConsentService());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Load the application helpers file.
         */
        if (file_exists($helper = app_path('helpers.php'))) {
            require_once $helper;
        }

        /**
         * Registers a view composer that is applied to all views.
         *
         * This composer adds a 'locale' variable to each view, which contains the current
         * application locale with underscores replaced by hyphens.
         *
         * @param  \Illuminate\View\View  $view  The view instance being composed.
         */
        View::composer('*', function ($view): void {
            $view->with('locale', str_replace('_', '-', app()->getLocale()));
        });

        /**
         * Register a view composer that binds social media accounts data to all views.
         *
         * This view composer will attach an array of social media accounts to every view
         * rendered by the application.
         *
         * @param  \Illuminate\View\View  $view  The view instance being composed.
         */
        View::composer('*', function ($view): void {
            $view->with('socialAccounts', [
                ['name' => 'X', 'url' => 'https://x.com/tedemedet'],
                ['name' => 'Instagram', 'url' => 'https://www.instagram.com/tedem.dev/'],
                ['name' => 'Bluesky', 'url' => 'https://bsky.app/profile/tedem.dev'],
                ['name' => 'Github', 'url' => 'https://github.com/tedem'],
            ]);
        });

        /**
         * Registers a view composer that attaches the 'cookieConsent' variable to all views.
         *
         * This view composer is applied to all views ('*') and adds a 'cookieConsent' variable
         * which is an instance of the CookieConsentService class.
         *
         * @param  \Illuminate\View\View  $view  The view instance being composed.
         * @return void
         */
        View::composer('*', function ($view): void {
            $view->with('cookieConsent', app(CookieConsentService::class));
        });

        $this->configureForceHttps();
    }

    /**
     * Configure the application to force HTTPS in production environment.
     *
     * This method checks if the application is running in the 'production' environment.
     * If it is, it forces all URLs to use the HTTPS scheme.
     */
    private function configureForceHttps(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
