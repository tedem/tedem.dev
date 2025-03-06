<header class="border-b border-gray-200 p-8 dark:border-gray-700">
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {{-- Logo --}}
        <a class="flex items-center gap-2.5" href="{{ route('home') }}" aria-label="Homepage" wire:navigate>
            <x-logogram size="sm" />

            <span class="text-lg font-medium text-gray-900 dark:text-gray-100">
                {{ config('app.name', 'tedem') }}
            </span>
        </a>

        {{-- Navigation --}}
        <nav class="flex items-center gap-8" aria-label="Main Navigation">
            @foreach (['home' => 'Home', 'about' => 'About', 'contact' => 'Contact'] as $route => $label)
                <a @class([
                    'text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-100',
                    'underline decoration-current underline-offset-4' => request()->routeIs(
                        $route . '*'),
                ]) href="{{ route($route) }}"
                    aria-current="{{ request()->routeIs($route . '*') ? 'page' : 'false' }}" wire:navigate>
                    {{ $label }}
                </a>
            @endforeach
        </nav>
    </div>
</header>
