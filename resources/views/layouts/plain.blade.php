<!DOCTYPE html>
<html class="overflow-y-scroll scroll-smooth" dir="ltr" lang="{{ $locale }}" x-data="appearanceModeController()">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{ $head ?? '' }}

    @include('partials.init')

    @livewireStyles

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body
    class="min-h-lvh bg-gray-50 font-sans text-gray-950 antialiased selection:bg-teal-100 selection:text-teal-700 dark:bg-gray-950 dark:text-gray-50 dark:selection:bg-teal-900 dark:selection:text-teal-100">
    {{-- Container --}}
    <div
        class="isolate min-h-lvh bg-white max-md:w-full md:mx-auto md:max-w-lg md:border-x md:border-gray-200 dark:bg-gray-900 md:dark:border-gray-700">
        {{-- Header --}}
        <header>
            <div class="flex items-center justify-center border-b border-gray-200 p-8 dark:border-gray-700">
                {{-- Logo --}}
                <x-logogram size="lg" as="link" />
            </div>
        </header>

        {{-- Main --}}
        <main class="divide-y divide-gray-200 dark:divide-gray-700">
            {{ $slot }}
        </main>

        {{-- Footer --}}
        <footer class="sticky top-full border-t border-gray-200 dark:border-gray-700">
            @if (request()->routeIs('register'))
                {{-- Note for Registration --}}
                <div class="border-b border-gray-200 p-8 dark:border-gray-700">
                    <p class="text-balance text-center text-sm text-gray-600 dark:text-gray-400">
                        By registering, you agree to our
                        <a class="font-medium text-gray-950 underline dark:text-white"
                            href="{{ route('terms-of-service') }}" wire:navigate>Terms of Service</a>
                        and
                        <a class="font-medium text-gray-950 underline dark:text-white"
                            href="{{ route('privacy-policy') }}" wire:navigate>Privacy Policy</a>.
                    </p>
                </div>
            @endif

            <div class="flex items-center justify-between gap-8 p-8">
                {{-- Copy --}}
                <a class="text-sm text-gray-700 dark:text-gray-300" href="{{ route('home') }}">
                    &copy; {{ date('Y') }} {{ config('app.name') }}
                </a>

                {{-- Theme Switcher --}}
                <div class="flex h-11 items-center gap-1 rounded-full bg-gray-100 p-1 max-md:order-1 dark:bg-gray-800"
                    role="group" aria-label="Theme Switcher">
                    <button class="flex size-9 items-center justify-center rounded-full"
                        x-on:click="applyAppearanceMode('system')"
                        x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': appearanceModeStatus === 'system' }"
                        aria-pressed="false" aria-label="System Theme">
                        <span>&#9680;</span>
                    </button>
                    <button class="flex size-9 items-center justify-center rounded-full"
                        x-on:click="applyAppearanceMode('light')"
                        x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': appearanceModeStatus === 'light' }"
                        aria-pressed="false" aria-label="Light Theme">
                        <span>&#9728;</span>
                    </button>
                    <button class="flex size-9 items-center justify-center rounded-full"
                        x-on:click="applyAppearanceMode('dark')"
                        x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': appearanceModeStatus === 'dark' }"
                        aria-pressed="false" aria-label="Dark Theme">
                        <span>&#9790;</span>
                    </button>
                </div>
            </div>
        </footer>

        {{-- Google Analytics --}}
        @if (app()->environment('production'))
            @include('partials.google-analytics')
        @endif

        @livewireScripts
    </div>
</body>

</html>
