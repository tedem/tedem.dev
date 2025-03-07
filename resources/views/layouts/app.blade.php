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
        class="isolate min-h-lvh bg-white max-lg:w-full lg:mx-auto lg:max-w-4xl lg:border-x lg:border-gray-200 lg:dark:border-gray-700 dark:bg-gray-900">
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
