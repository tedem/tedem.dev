<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Console\Commands\Concerns\RunsDeploySteps;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use RuntimeException;

/**
 * First-time setup on the server, after cloning the repository, writing .env and running
 * `composer install` once (Artisan needs vendor/ to start). Safe to run again: it only
 * generates an app key when there is none. See deploy/README.md.
 */
#[Description('Set the application up on the server for the first time')]
#[Signature('deploy:install')]
final class DeployInstallCommand extends Command
{
    use RunsDeploySteps;

    public function handle(): int
    {
        if ($this->refusesLocally()) {
            return self::FAILURE;
        }

        if (! file_exists(base_path('.env'))) {
            $this->components->error('No .env file. Copy deploy/.env.production.example to .env and fill it in first.');

            return self::FAILURE;
        }

        try {
            if (blank(config('app.key'))) {
                $this->step('Generating the application key', ['php', 'artisan', 'key:generate', '--force']);
            }

            $this->step('Linking public storage', ['php', 'artisan', 'storage:link']);
            $this->build();
            $this->restartSsr();
        } catch (RuntimeException $runtimeException) {
            $this->components->error($runtimeException->getMessage());

            return self::FAILURE;
        }

        $this->components->success('Installed. Later versions go out with deploy:update.');

        return self::SUCCESS;
    }
}
