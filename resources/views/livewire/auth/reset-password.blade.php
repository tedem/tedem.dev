<div>
    <x-slot name="head">
        <x-meta :title="title('Reset Password')" :description="description(['Enter your new password to regain access.'])" />
    </x-slot>

    {{-- Navigation --}}
    <nav class="grid grid-cols-2 gap-4 border-b border-gray-200 p-8 px-8 py-4 dark:border-gray-700"
        aria-label="Auth navigation">
        <x-button class="w-full" as="link" href="{{ route('password.reset') }}" variant="primary" wire:navigate
            wire:navigate-focusable>Reset Password</x-button>
        <x-button class="w-full" as="link" href="{{ route('login') }}" variant="plain" wire:navigate
            wire:navigate-focusable>Login</x-button>
    </nav>

    {{-- Main --}}
    <div class="space-y-8 p-8" role="main">
        {{-- Session Status --}}
        <x-auth-session-status :status="session('status')" />

        {{-- Form --}}
        <form class="space-y-8" wire:submit="resetPassword">
            @csrf

            {{-- Email --}}
            <x-field class="space-y-3" error="email">
                <x-label for="email" value="Email" />
                <x-input id="email" type="email" name="email" wire:model.blur="email" required autofocus
                    autocomplete="email" placeholder="email@domain.com" />
            </x-field>

            {{-- Password --}}
            <x-field class="space-y-3" error="password">
                <x-label for="password" value="Password" />
                <x-input id="password" type="password" name="password" wire:model.blur="password" required
                    autocomplete="new-password" placeholder="••••••••••" />
            </x-field>

            {{-- Confirm Password --}}
            <x-field class="space-y-3" error="password_confirmation">
                <x-label for="password_confirmation" value="Confirm Password" />
                <x-input id="password_confirmation" type="password" name="password_confirmation"
                    wire:model.blur="password_confirmation" required placeholder="••••••••••" />
            </x-field>

            {{-- Submit --}}
            <div class="flex items-center gap-4">
                <x-button class="w-full" type="submit" aria-label="Reset Password">
                    <span wire:target="resetPassword" wire:loading.remove>Reset Password</span>
                    <span wire:target="resetPassword" wire:loading>
                        <x-icon.lucide class="size-5 animate-spin">
                            <path d="M12 2v4" />
                            <path d="m16.2 7.8 2.9-2.9" />
                            <path d="M18 12h4" />
                            <path d="m16.2 16.2 2.9 2.9" />
                            <path d="M12 18v4" />
                            <path d="m4.9 19.1 2.9-2.9" />
                            <path d="M2 12h4" />
                            <path d="m4.9 4.9 2.9 2.9" />
                        </x-icon.lucide>
                    </span>
                </x-button>

                <x-button as="link" href="{{ route('login') }}" variant="plain" wire:navigate
                    wire:navigate-focusable>
                    Login
                </x-button>
            </div>
        </form>
    </div>
</div>
