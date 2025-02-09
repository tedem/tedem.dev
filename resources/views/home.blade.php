<x-layouts.app>
    <x-slot name="head">
        <x-meta title="{{ config('app.name') }} — Developer"
            description="I'm a full-stack developer with 10+ years of experience, passionate about building applications and skilled in a wide range of technologies." />
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
