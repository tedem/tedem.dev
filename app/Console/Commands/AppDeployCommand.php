<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;

final class AppDeployCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:deploy {--install : Perform a fresh install} {--update : Perform an update}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy the application to the server.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        if ($this->option('install')) {
            $this->info('Starting full installation process...');
            $this->install();
        } elseif ($this->option('update')) {
            $this->info('Starting update process...');
            $this->update();
        } else {
            $this->error('Please specify either --install or --update.');
        }
    }

    /**
     * Full installation process.
     */
    private function install(): void
    {
        if (file_exists('vendor')) {
            $this->error('The application is already installed. Use the update command instead.');

            return;
        }

        if (! file_exists('.env')) {
            $this->error('The .env file does not exist. Please create it before running the installation.');

            return;
        }

        $this->info('Disabling file mode...');
        exec('sudo git config core.fileMode false');

        $this->info('Setting up file permissions...');
        exec('sudo chmod -R 775 storage bootstrap/cache');

        $this->info('Installing PHP dependencies...');
        exec('sudo COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader');

        $this->info('Installing NPM dependencies...');
        exec('sudo npm install');

        $this->info('Building assets...');
        exec('sudo npm run build');

        $this->info('Generating application key...');
        exec('sudo php artisan key:generate');

        $this->info('Running migrations...');
        exec('sudo php artisan migrate --force');

        $this->info('Optimizing the application...');
        exec('sudo php artisan optimize');

        $this->info('Full installation completed successfully!');
    }

    /**
     * Update application process.
     */
    private function update(): void
    {
        $this->info('Clearing caches...');
        exec('sudo php artisan optimize:clear');

        $this->info('Pulling latest changes...');
        exec('sudo git pull origin main');

        $this->info('Installing PHP dependencies...');
        exec('sudo COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader');

        $this->info('Installing NPM dependencies...');
        exec('sudo npm install');

        $this->info('Building assets...');
        exec('sudo npm run build');

        $this->info('Running migrations...');
        exec('sudo php artisan migrate --force');

        $this->info('Optimizing the application...');
        exec('sudo php artisan optimize');

        $this->info('Update completed successfully!');
    }
}
