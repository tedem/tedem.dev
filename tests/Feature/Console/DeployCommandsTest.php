<?php

declare(strict_types=1);

use Illuminate\Process\PendingProcess;
use Illuminate\Support\Facades\Process;

/*
 * deploy:install and deploy:update only run other programs, so the tests fake them and
 * check what runs, in which order, and what happens when one fails.
 *
 * Stray processes are blocked: these commands run `git reset --hard` and
 * `composer install --no-dev`, which must never reach the real working copy.
 */

beforeEach(function (): void {
    Process::preventStrayProcesses();
});

/**
 * Fakes every process and records each command line ("npm run build:ssr") in order. The
 * listed commands fail with exit code 1; everything else succeeds. Matched on the joined
 * arguments, since Laravel's own patterns see the shell-escaped command line.
 *
 * @param  list<string>  $failing
 */
function fakeProcesses(array $failing = []): void
{
    ranCommands(reset: true);

    Process::fake(function (PendingProcess $process) use ($failing) {
        $command = is_array($process->command) ? implode(' ', $process->command) : (string) $process->command;
        ranCommands($command);

        return Process::result(exitCode: in_array($command, $failing, true) ? 1 : 0);
    });
}

/**
 * The commands the fake has run so far; with an argument, records one more.
 *
 * @return list<string>
 */
function ranCommands(?string $command = null, bool $reset = false): array
{
    static $commands = [];

    if ($reset) {
        $commands = [];
    }

    if ($command !== null) {
        $commands[] = $command;
    }

    return $commands;
}

test('an update fetches, goes down, builds, and comes back up', function (): void {
    fakeProcesses();

    $this->artisan('deploy:update')->assertSuccessful();

    expect(array_slice(ranCommands(), 0, 11))->toBe([
        'git fetch --prune origin main',
        'php artisan down --render=maintenance --retry=60 --refresh=15',
        'git reset --hard origin/main',
        'composer install --no-dev --optimize-autoloader --no-interaction --no-progress',
        'npm ci --no-audit --no-fund',
        'php artisan optimize:clear',
        'npm run build:ssr',
        'php artisan migrate --force',
        'php artisan optimize',
        'php artisan inertia:stop-ssr',
        'php artisan up',
    ]);
});

test('a failed fetch leaves the site up and untouched', function (): void {
    fakeProcesses(['git fetch --prune origin main']);

    $this->artisan('deploy:update')->assertFailed();

    expect(ranCommands())->toBe(['git fetch --prune origin main']);
});

test('a failed step after going down keeps the site in maintenance mode', function (): void {
    fakeProcesses(['npm run build:ssr']);

    $this->artisan('deploy:update')
        ->expectsOutputToContain('still in maintenance mode')
        ->assertFailed();

    expect(ranCommands())->not->toContain('php artisan migrate --force')
        ->not->toContain('php artisan up');
});

test('no running SSR server does not fail the deploy', function (): void {
    fakeProcesses(['php artisan inertia:stop-ssr']);

    $this->artisan('deploy:update')->assertSuccessful();

    expect(ranCommands())->toContain('php artisan up');
});

test('another branch can be deployed', function (): void {
    fakeProcesses();

    $this->artisan('deploy:update', ['--branch' => 'release'])->assertSuccessful();

    expect(ranCommands())->toContain('git fetch --prune origin release')
        ->toContain('git reset --hard origin/release');
});

test('install links storage, builds and migrates without generating a key that exists', function (): void {
    fakeProcesses();
    config(['app.key' => 'base64:'.base64_encode(str_repeat('a', 32))]);

    $this->artisan('deploy:install')->assertSuccessful();

    expect(ranCommands())->not->toContain('php artisan key:generate --force')
        ->toContain('php artisan storage:link')
        ->toContain('npm run build:ssr')
        ->toContain('php artisan migrate --force');
});

test('install generates the app key when there is none', function (): void {
    fakeProcesses();
    config(['app.key' => '']);

    $this->artisan('deploy:install')->assertSuccessful();

    expect(ranCommands()[0])->toBe('php artisan key:generate --force');
});

test('deploy commands refuse to run on a development machine', function (string $command): void {
    fakeProcesses();
    app()->detectEnvironment(fn (): string => 'local');

    $this->artisan($command)->expectsOutputToContain('only run on the server')->assertFailed();

    Process::assertNothingRan();
})->with(['deploy:update', 'deploy:install']);
