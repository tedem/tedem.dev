<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Console\Commands\Concerns\RunsDeploySteps;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use RuntimeException;

/**
 * Brings the server up to date with the main branch on GitHub. Run it on the server after
 * pushing (see deploy/README.md).
 *
 * The site shows a static maintenance page while the update runs: the asset build replaces
 * public/build, so pages cannot be served halfway through. If a step fails after that, the
 * site stays in maintenance mode rather than serving half-updated code; fix the cause and
 * run the command again (or `php artisan up` to bring the previous state back).
 */
#[Description('Update the application on the server to the latest commit on main')]
#[Signature('deploy:update
        {--branch=main : Branch to deploy}')]
final class DeployUpdateCommand extends Command
{
    use RunsDeploySteps;

    public function handle(): int
    {
        if ($this->refusesLocally()) {
            return self::FAILURE;
        }

        if (! file_exists(base_path('.env'))) {
            $this->components->error('No .env file. Set the application up with deploy:install first.');

            return self::FAILURE;
        }

        $branch = (string) $this->option('branch');

        try {
            // Network first, while the site is still up: a failed fetch changes nothing.
            $this->step('Fetching '.$branch, ['git', 'fetch', '--prune', 'origin', $branch]);
            // Prerendered: served from storage without the app, so it works while assets rebuild.
            // Browsers reload it every 15 seconds; clients are told to retry after a minute.
            $this->step('Entering maintenance mode', ['php', 'artisan', 'down', '--render=maintenance', '--retry=60', '--refresh=15']);
        } catch (RuntimeException $runtimeException) {
            $this->components->error($runtimeException->getMessage());

            return self::FAILURE;
        }

        try {
            // A reset rather than a merge, so a rewritten history on GitHub still deploys.
            // Only tracked files change; .env and storage/ are not in the repository.
            $this->step('Checking out origin/'.$branch, ['git', 'reset', '--hard', 'origin/'.$branch]);
            $this->build();
            $this->restartSsr();
        } catch (RuntimeException $runtimeException) {
            $this->components->error($runtimeException->getMessage());
            $this->components->warn('The site is still in maintenance mode. Fix the cause and run deploy:update again.');

            return self::FAILURE;
        }

        $this->step('Leaving maintenance mode', ['php', 'artisan', 'up']);

        $this->components->success('Deployed '.$this->currentCommit().'.');

        return self::SUCCESS;
    }

    private function currentCommit(): string
    {
        return mb_trim(Process::path(base_path())->run(['git', 'log', '-1', '--format=%h %s'])->output());
    }
}
