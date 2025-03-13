<div class="mt-8 flex flex-col gap-8">
    <p class="text-center">
        Please verify your email address by clicking on the link we just emailed to you.
    </p>

    @if (session('status') == 'verification-link-sent')
        <p class="text-center">
            A new verification link has been sent to the email address you provided during registration.
        </p>
    @endif

    <div class="flex flex-col items-center justify-between space-y-4">
        <x-button class="w-full" wire:click="sendVerification">
            Resend Verification Email
        </x-button>

        <x-button variant="plain" wire:click="signOut">
            Sign Out
        </x-button>
    </div>
</div>
