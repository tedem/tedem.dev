<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Vite;
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
         * Load the application helpers file.
         */
        if (file_exists($helper = app_path('helpers.php'))) {
            require_once $helper;
        }

        $this->configureView();
        $this->configureURL();
        $this->configureCommands();
        $this->configureModel();
        $this->configureVite();
        $this->configureDate();
    }

    /**
     * Configure Vite for asset management.
     */
    private function configureVite(): void
    {
        // Use Vite for asset management in production.
        Vite::useAggressivePrefetching();
    }

    /**
     * Configure the date handling.
     */
    private function configureDate(): void
    {
        Date::use(CarbonImmutable::class);
    }

    /**
     * Configure global settings for Eloquent models.
     */
    private function configureModel(): void
    {
        Model::unguard();
        Model::shouldBeStrict();
        Model::automaticallyEagerLoadRelationships();
    }

    /**
     * Configure the application URL.
     */
    private function configureURL(): void
    {
        // Force HTTPS in production.
        URL::forceHttps(App::isProduction());
    }

    /**
     * Configure the application commands.
     */
    private function configureCommands(): void
    {
        // Disable destructive commands in production.
        DB::prohibitDestructiveCommands(App::isProduction());
    }

    /**
     * Configure the application view.
     */
    private function configureView(): void
    {
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
    }
}
