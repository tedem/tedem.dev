<!DOCTYPE html>
<html class="overflow-y-scroll scroll-smooth" dir="ltr" lang="{{ $locale }}" x-data="themeModeController()">

{{-- Init JS --}}
@include('partials.init')

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{ $head ?? '' }}

    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>

    @livewireStyles

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body
    class="min-h-lvh bg-gray-50 font-sans text-gray-950 antialiased selection:bg-teal-100 selection:text-teal-700 dark:bg-gray-950 dark:text-gray-50 dark:selection:bg-teal-900 dark:selection:text-teal-100">
    {{-- Container --}}
    <div
        class="mx-auto min-h-lvh max-w-4xl border-x border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 isolate">
        {{-- Top --}}
        <div class="sr-only" id="top">
            Top of the page
        </div>

        {{-- Skip to main content --}}
        <a class="sr-only focus:not-sr-only" href="#main-content">Skip to main content</a>

        {{-- Header --}}
        @include('partials.header')

        {{-- Main --}}
        <main class="divide-y divide-gray-200 dark:divide-gray-700" id="main-content">
            {{ $slot }}
        </main>

        {{-- Footer --}}
        @include('partials.footer')

        @livewireScripts
    </div>
</body>

</html>
