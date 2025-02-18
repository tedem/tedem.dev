<header class="border-b border-gray-200 p-8 dark:border-gray-700">
    <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {{-- Logo --}}
        <a class="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100" href="{{ route('home') }}"
            aria-label="Homepage">
            <span
                class="size-7 rounded-full bg-gray-950 text-center text-xs/7 text-gray-50 dark:bg-gray-50 dark:text-gray-950"
                aria-hidden="true">//.</span>
            <span>{{ config('app.name', 'tedem') }}</span>
        </a>

        {{-- Navigation --}}
        <nav class="flex items-center gap-8" aria-label="Main Navigation">
            @foreach (['home' => 'Home', 'about' => 'About', 'contact' => 'Contact'] as $route => $label)
                <a class="{{ request()->routeIs($route . '*') ? 'underline decoration-current underline-offset-4' : '' }} text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-100"
                    href="{{ route($route) }}">{{ $label }}</a>
            @endforeach
        </nav>
    </div>
</header>
