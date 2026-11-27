<?php

declare(strict_types=1);

namespace App\Console\Commands\Concerns;

use Illuminate\Support\Facades\Process;
use RuntimeException;

/**
 * Shell steps shared by deploy:install and deploy:update. Each step runs in the project
 * root as its own process, so Artisan steps load the code on disk at that moment (the
 * freshly pulled code during an update), not the code the deploy command started with.
 */
trait RunsDeploySteps
{
    /** Seconds one step may take; the asset build is the slow one. */
    private const int STEP_TIMEOUT = 900;

    /**
     * The deploy commands rewrite the working copy (`git reset --hard`, `composer install
     * --no-dev`), so they refuse to run on a development machine.
     */
    private function refusesLocally(): bool
    {
        if (! app()->isLocal()) {
            return false;
        }

        $this->components->error('APP_ENV is local: deploy commands only run on the server.');

        return true;
    }

    /**
     * Dependencies, assets (client and SSR bundles), database and caches: everything a
     * new version of the code needs before it can serve requests.
     */
    private function build(): void
    {
        $this->step('Installing PHP dependencies', ['composer', 'install', '--no-dev', '--optimize-autoloader', '--no-interaction', '--no-progress']);
        $this->step('Installing Node dependencies', ['npm', 'ci', '--no-audit', '--no-fund']);
        // Before the build: Wayfinder reads the routes during it and must not see a stale route cache.
        $this->step('Clearing caches', ['php', 'artisan', 'optimize:clear']);
        $this->step('Building assets', ['npm', 'run', 'build:ssr']);
        $this->step('Running migrations', ['php', 'artisan', 'migrate', '--force']);
        $this->step('Caching config, routes and views', ['php', 'artisan', 'optimize']);
    }

    /**
     * Stops the SSR server so systemd starts it again with the new bundle. Not an error
     * when none is running (inertia:stop-ssr exits 1 then).
     */
    private function restartSsr(): void
    {
        $this->step('Restarting the SSR server', ['php', 'artisan', 'inertia:stop-ssr'], mayFail: true);
    }

    /**
     * Runs one step and streams its output. Throws when it fails, unless `mayFail`.
     *
     * @param  list<string>  $command
     */
    private function step(string $title, array $command, bool $mayFail = false): void
    {
        $this->components->info($title);

        $result = Process::path(base_path())
            ->timeout(self::STEP_TIMEOUT)
            ->run($command, function (string $type, string $output): void {
                $this->output->write($output);
            });

        if ($result->failed() && ! $mayFail) {
            throw new RuntimeException(sprintf('[%s] failed with exit code %d.', implode(' ', $command), $result->exitCode()));
        }
    }
}
