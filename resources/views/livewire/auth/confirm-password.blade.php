<div>
    <x-slot name="head">
        <x-meta :title="title('Confirm Password')" :description="description([
            'This is a secure area of the application. Please confirm your password before continuing.',
        ])" />
    </x-slot>

    {{-- Navigation --}}
    <nav class="grid grid-cols-2 gap-4 border-b border-gray-200 p-8 px-8 py-4 dark:border-gray-700"
        aria-label="Auth navigation">
        <x-button class="w-full" as="link" href="{{ route('password.confirm') }}" variant="primary" wire:navigate
            wire:navigate-focusable>Confirm Password</x-button>
        <x-button class="w-full" as="link" href="{{ route('home') }}" variant="plain" wire:navigate
            wire:navigate-focusable>Home</x-button>
    </nav>

    {{-- Main --}}
    <div class="space-y-8 p-8" role="main">
        {{-- Session Status --}}
        <x-auth-session-status :status="session('status')" />

        {{-- Form --}}
        <form class="space-y-8" wire:submit="confirmPassword">
            @csrf

            {{-- Password --}}
            <x-field class="space-y-3" error="password">
                <x-label for="password" value="Password" />
                <x-input id="password" type="password" name="password" wire:model.blur="password" required autofocus
                    autocomplete="new-password" placeholder="Password" />
            </x-field>

            {{-- Submit --}}
            <div class="flex items-center gap-4">
                <x-button class="w-full" type="submit" aria-label="Confirm Password">
                    <span wire:target="confirmPassword" wire:loading.remove>Confirm Password</span>
                    <span wire:target="confirmPassword" wire:loading>
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

                <x-button as="link" href="{{ route('home') }}" variant="plain" wire:navigate
                    wire:navigate-focusable>
                    Home
                </x-button>
            </div>
        </form>
    </div>
</div>
