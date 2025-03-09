<div>
    <x-slot name="head">
        <x-meta :title="title('Login')" :description="description(['Login to access all the features.'])" />
    </x-slot>

    {{-- Navigation --}}
    <nav class="grid grid-cols-2 gap-4 border-b border-gray-200 p-8 px-8 py-4 dark:border-gray-700"
        aria-label="Auth navigation">
        <x-button class="w-full" as="link" href="{{ route('login') }}" variant="primary" wire:navigate
            wire:navigate-focusable>Login</x-button>
        <x-button class="w-full" as="link" href="{{ route('register') }}" variant="plain" wire:navigate
            wire:navigate-focusable>Register</x-button>
    </nav>

    {{-- Main --}}
    <div class="p-8" role="main">
        {{-- Form --}}
        <form class="space-y-8" wire:submit="login">
            @csrf

            {{-- Username --}}
            <x-field class="space-y-3" error="username">
                <x-label for="username" value="Username" />
                <x-input id="username" type="text" name="username" wire:model.blur="username" required autofocus
                    autocomplete="username" prefix="tedem.dev" placeholder="tedem" />
            </x-field>

            {{-- Password --}}
            <x-field class="space-y-3" error="password">
                <x-label for="password" value="Password" />
                <x-input id="password" type="password" name="password" wire:model.blur="password" required
                    autocomplete="new-password" placeholder="••••••••••" />
            </x-field>

            {{-- Submit --}}
            <div class="flex items-center gap-4">
                <x-button class="w-full" type="submit">Login</x-button>

                <x-button as="link" href="{{ route('register') }}" variant="plain" wire:navigate
                    wire:navigate-focusable>
                    Register
                </x-button>
            </div>
        </form>
    </div>
</div>
