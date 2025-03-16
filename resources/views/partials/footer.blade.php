<footer class="sticky top-full border-t border-gray-200 dark:border-gray-700" role="contentinfo">
    {{-- Main --}}
    <div class="flex gap-8 p-8 max-md:flex-col-reverse md:items-start md:justify-between">
        {{-- Copy --}}
        <div class="flex items-start gap-1">
            <div aria-hidden="true">&copy;</div>
            <div class="space-y-1">
                {{-- App --}}
                <p>
                    <span class="sr-only">&copy;</span>
                    {{ date('Y') }}
                    <span class="font-medium">{{ config('app.name') }}</span>.
                    All rights reserved.
                </p>

                {{-- Laravel --}}
                <p class="text-xs text-gray-600 dark:text-gray-400">
                    <span aria-hidden="true">&ndash;</span>
                    Laravel v{{ Illuminate\Foundation\Application::VERSION }}
                    (PHP v{{ PHP_VERSION }})
                </p>

                {{-- Source Code Repository --}}
                <p class="text-xs text-gray-600 dark:text-gray-400">
                    <span aria-hidden="true">&ndash;</span>
                    Source code available on
                    <a class="font-medium text-gray-950 hover:underline dark:text-gray-50"
                        href="https://github.com/tedem/tedem.dev" rel="noopener noreferrer nofollow" target="_blank">
                        GitHub
                    </a>
                </p>
            </div>
        </div>

        <div class="flex items-center gap-8">
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
    </div>

    {{-- Navigation --}}
    <div
        class="flex gap-8 border-t border-gray-200 p-8 max-md:flex-col md:items-center md:justify-between dark:border-gray-700 dark:text-gray-400">
        <time class="text-sm" datetime="{{ now('GMT+3')->toIso8601String() }}"
            title="{{ now('GMT+3')->toDayDateTimeString() }}">
            {{ now('GMT+3')->format('l, F j, Y') }}
            <span>({{ now('GMT+3')->format('H:i') }})</span>
        </time>

        <nav class="flex items-center gap-8 text-sm max-md:order-2" aria-label="Footer Navigation">
            <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-300"
                href="{{ route('terms-of-service') }}" wire:navigate>Terms of Service</a>
            <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-300"
                href="{{ route('privacy-policy') }}" wire:navigate>Privacy Policy</a>
            <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-300"
                href="#top" rel="noopener noreferrer nofollow" onclick="window.scrollTo({top: 0});">Top</a>
        </nav>
    </div>

    {{-- tedem --}}
    <div class="grid grid-cols-5 gap-px border-t border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700"
        role="presentation">
        @foreach (str_split('tedem') as $char)
            <div class="bg-white p-8 text-center dark:bg-gray-900" aria-hidden="true">
                <span class="text-2xl font-thin uppercase md:text-7xl xl:text-9xl">{{ $char }}</span>
            </div>
        @endforeach
    </div>
</footer>

@if (app()->environment('production'))
    @include('partials.google-analytics')
@endif
