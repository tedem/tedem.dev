<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'tedem') }}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="min-h-lvh bg-gray-50 font-sans text-gray-950 antialiased selection:bg-teal-100 selection:text-teal-700">
    <div class="mx-auto min-h-lvh max-w-4xl border-x border-gray-200 bg-white">
        @include('partials.header')

        <main class="divide-y divide-gray-200">
            {{ $slot }}
        </main>
    </div>
</body>

</html>
