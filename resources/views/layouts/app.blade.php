<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'tedem') }}</title>

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">

    {{-- Scripts --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body
    class="isolate bg-slate-950 font-sans text-base antialiased [text-rendering:optimizeLegibility] selection:bg-teal-300 selection:text-teal-950">
    <div class="my-2 min-h-[calc(100lvh-calc(var(--spacing)*4))] rounded-lg bg-slate-50 lg:mx-2">
        @include('partials.header')

        <main>
            {{ $slot }}
        </main>

        @include('partials.footer')
    </div>
</body>

</html>
