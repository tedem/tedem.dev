<header class="sticky top-full border-t border-gray-200 p-8 dark:border-gray-700">
    <div class="flex items-start justify-between">
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
                    Laravel v{{ Illuminate\Foundation\Application::VERSION }}
                    (PHP v{{ PHP_VERSION }})
                </p>

                {{-- Torchlight --}}
                <p class="text-xs text-gray-600 dark:text-gray-400">
                    Code highlighting provided by
                    <a class="text-gray-950 hover:underline dark:text-gray-300" href="https://torchlight.dev"
                        rel="noopener noreferrer nofollow" target="_blank">Torchlight</a>
                </p>
            </div>
        </div>

        <div class="flex items-center gap-8">
            {{-- Navigation --}}
            <nav class="flex items-center gap-8">
                <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-300"
                    href="javascript:void(0);" rel="noopener noreferrer nofollow"
                    onclick="window.scrollTo({top: 0});">Top</a>
            </nav>

            {{-- Theme Switcher --}}
            <div class="flex h-11 items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
                <button class="flex size-9 items-center justify-center rounded-full"
                    x-on:click="setThemeModePreference('system')"
                    x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': themeModeStatus === 'system' }">
                    <span>&#9680;</span>
                    <span class="sr-only">System</span>
                </button>
                <button class="flex size-9 items-center justify-center rounded-full"
                    x-on:click="setThemeModePreference('light')"
                    x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': themeModeStatus === 'light' }">
                    <span>&#9728;</span>
                    <span class="sr-only">Light</span>
                </button>
                <button class="flex size-9 items-center justify-center rounded-full"
                    x-on:click="setThemeModePreference('dark')"
                    x-bind:class="{ 'bg-white dark:bg-gray-700 ring-1 ring-gray-950/10 shadow-xs': themeModeStatus === 'dark' }">
                    <span>&#9790;</span>
                    <span class="sr-only">Dark</span>
                </button>
            </div>
        </div>
    </div>
</header>
