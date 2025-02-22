@php
    $title = 'Developer';
    $description = implode(' ', [
        'I am a full-stack developer with a passion for creating web applications.',
        'I have experience in building web applications using Laravel, Vue.js, and Tailwind CSS.',
    ]);
@endphp

<x-layouts.app>
    <x-slot name="head">
        <x-meta :title="$title" :description="$description" />
    </x-slot>

    {{-- Intro --}}
    @include('partials.intro')

    {{-- Projects --}}
    @include('partials.projects')

    {{-- Services --}}
    @include('partials.services')

    {{-- FAQ --}}
    @include('partials.FAQ')

    {{-- Ataturk --}}
    @include('partials.ataturk')
</x-layouts.app>
