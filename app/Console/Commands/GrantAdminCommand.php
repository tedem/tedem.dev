<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Description('Let a user manage posts in the admin area, or take that away with --revoke')]
#[Signature('admin:grant
        {email : Email address of the account}
        {--revoke : Remove admin rights instead}')]
final class GrantAdminCommand extends Command
{
    public function handle(): int
    {
        $email = (string) $this->argument('email');
        $user = User::query()->where('email', $email)->first();

        if (! $user instanceof User) {
            $this->components->error("No account with the email [{$email}].");

            return self::FAILURE;
        }

        $user->is_admin = ! $this->option('revoke');
        $user->save();

        $this->components->success($user->is_admin
            ? "{$email} can now manage posts."
            : "{$email} can no longer manage posts.");

        return self::SUCCESS;
    }
}
