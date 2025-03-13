<div>
    <x-slot name="head">
        <x-meta :title="title('Sign Up')" :description="description(['Sign up to get access to all the features.'])" />
    </x-slot>

    {{-- Navigation --}}
    <nav class="grid grid-cols-2 gap-4 border-b border-gray-200 p-8 px-8 py-4 dark:border-gray-700"
        aria-label="Auth navigation">
        <x-button class="w-full" as="link" href="{{ route('signIn') }}" variant="plain" wire:navigate
            wire:navigate-focusable>Sign In</x-button>
        <x-button class="w-full" as="link" href="{{ route('signUp') }}" variant="primary" wire:navigate
            wire:navigate-focusable>Sign Up</x-button>
    </nav>

    {{-- Main --}}
    <div class="space-y-8 p-8" role="main">
        @if (config('auth.registration'))
            {{-- Form --}}
            <form class="space-y-8" wire:submit="signUp">
                @csrf

                {{-- Username --}}
                <x-field class="space-y-3" error="username">
                    <x-label for="username" value="Username" />
                    <x-input id="username" type="text" name="username" wire:model.blur="username" required autofocus
                        autocomplete="username" prefix="tedem.dev" placeholder="tedem" />
                </x-field>

                {{-- Email --}}
                <x-field class="space-y-3" error="email">
                    <x-label for="email" value="Email" />
                    <x-input id="email" type="email" name="email" wire:model.blur="email" required
                        autocomplete="email" placeholder="example@domain.com" />
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
                    <x-button class="w-full" type="submit" aria-label="Sign Up">
                        <span wire:target="signUp" wire:loading.remove>Sign Up</span>
                        <span wire:target="signUp" wire:loading>
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

                    <x-button as="link" href="{{ route('signIn') }}" variant="plain" wire:navigate
                        wire:navigate-focusable>
                        Sign In
                    </x-button>
                </div>
            </form>
        @else
            <p>Registration is disabled.</p>
        @endif
    </div>
</div>
