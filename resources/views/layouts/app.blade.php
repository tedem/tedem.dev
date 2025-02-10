<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}" x-data="themeModeController()">

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

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body
    class="min-h-lvh bg-gray-50 font-sans text-gray-950 antialiased selection:bg-teal-100 selection:text-teal-700 dark:bg-gray-950 dark:text-gray-50 dark:selection:bg-teal-900 dark:selection:text-teal-100">
    <div class="mx-auto min-h-lvh max-w-4xl border-x border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div class="sr-only" id="top">
            Top of the page
        </div>

        @include('partials.header')

        <main class="divide-y divide-gray-200 dark:divide-gray-700">
            {{ $slot }}
        </main>

        @include('partials.footer')
    </div>
</body>

</html>
