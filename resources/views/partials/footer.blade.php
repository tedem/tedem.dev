<header class="sticky top-full border-t border-gray-200 p-8">
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
                <p class="text-xs text-gray-600">
                    Laravel v{{ Illuminate\Foundation\Application::VERSION }}
                    (PHP v{{ PHP_VERSION }})
                </p>

                {{-- Torchlight --}}
                <p class="text-xs text-gray-600">
                    Code highlighting provided by
                    <a class="text-gray-950 hover:underline" href="https://torchlight.dev"
                        rel="noopener noreferrer nofollow" target="_blank">Torchlight</a>
                </p>
            </div>
        </div>

        {{-- Navigation --}}
        <nav class="flex items-center gap-8">
            <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4"
                href="javascript:void(0);" rel="noopener noreferrer nofollow"
                onclick="window.scrollTo({top: 0});">Top</a>
        </nav>
    </div>
</header>
