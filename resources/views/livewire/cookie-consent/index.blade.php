<div>
    <x-slot name="head">
        <x-meta :title="title('Cookie Consent')" :description="description([
            'This page is used to display the cookie consent information.',
            'It is used to inform the user about the use of cookies on the website.',
        ])" />
    </x-slot>

    {{-- Header --}}
    <div class="relative space-y-4 border-b border-gray-200 p-8 dark:border-gray-700">
        {{-- Label --}}
        <x-vertical-label value="Cookie Consent" />

        {{-- Title --}}
        <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="cookie-consent-title">
            Cookie Consent
        </h1>

        {{-- Description --}}
        <p class="text-balance text-xl font-light text-gray-950 dark:text-gray-50" aria-labelledby="cookie-consent-title">
            This page is used to display the cookie consent information.
            It is used to inform the user about the use of cookies on the website.
        </p>
    </div>

    {{-- Main --}}
    <div class="space-y-8 p-8" role="main" aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description">

        {{-- Essential Cookies --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between gap-8">
                <h2 class="text-2xl font-medium">Essential Cookies</h2>

                <x-switch id="essential-cookies" data-checked="{{ $essentialCookiesStatus }}" name="essential-cookies"
                    wire:model.live="essentialCookiesStatus" value="{{ $essentialCookiesStatus }}" disabled>
                    Allow Essential Cookies
                </x-switch>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                These cookies are necessary for the website to function and cannot be switched off in our
                systems. They are usually only set in response to actions made by you which amount to a request for
                services, such as setting your privacy preferences, logging in or filling in forms.
            </p>

            <ul class="list-inside list-disc text-sm">
                @forelse ($essentialCookies as $cookie)
                    <li class="font-mono text-yellow-600 dark:text-yellow-400">{{ $cookie }}</li>
                @empty
                    <li class="text-lime-600 dark:text-lime-400">
                        No essential cookies are used on this website.
                    </li>
                @endforelse
            </ul>
        </div>

        {{-- Analytic Cookies --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between gap-8">
                <h2 class="text-2xl font-medium">Analytic Cookies</h2>

                <x-switch id="analytic-cookies" data-checked="{{ $analyticCookiesStatus }}" name="analytic-cookies"
                    wire:model.live="analyticCookiesStatus" value="{{ $analyticCookiesStatus }}">
                    Allow Analytic Cookies
                </x-switch>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                of our site. They help us to know which pages are the most and least popular and see how visitors move
                around the site.
            </p>

            <ul class="list-inside list-disc text-sm">
                @forelse ($analyticCookies as $cookie)
                    <li class="font-mono text-yellow-600 dark:text-yellow-400">{{ $cookie }}</li>
                @empty
                    <li class="text-lime-600 dark:text-lime-400">
                        No analytic cookies are used on this website.
                    </li>
                @endforelse
            </ul>
        </div>

        {{-- Marketing Cookies --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between gap-8">
                <h2 class="text-2xl font-medium">Marketing Cookies</h2>

                <x-switch id="marketing-cookies" data-checked="{{ $marketingCookiesStatus }}" name="marketing-cookies"
                    wire:model.live="marketingCookiesStatus" value="{{ $marketingCookiesStatus }}">
                    Allow Marketing Cookies
                </x-switch>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                These cookies may be set through our site by our advertising partners. They may be used by those
                companies to build a profile of your interests and show you relevant adverts on other sites.
                They do not store directly personal information, but are based on uniquely identifying your browser
                and internet device.
            </p>

            <ul class="list-inside list-disc text-sm">
                @forelse ($marketingCookies as $cookie)
                    <li class="font-mono text-yellow-600 dark:text-yellow-400">{{ $cookie }}</li>
                @empty
                    <li class="text-lime-600 dark:text-lime-400">
                        No marketing cookies are used on this website.
                    </li>
                @endforelse
            </ul>
        </div>

        {{-- Functional Cookies --}}
        <div class="space-y-4">
            <div class="flex items-center justify-between gap-8">
                <h2 class="text-2xl font-medium">Functional Cookies</h2>

                <x-switch id="functional-cookies" data-checked="{{ $functionalCookiesStatus }}"
                    name="functional-cookies" wire:model.live="functionalCookiesStatus"
                    value="{{ $functionalCookiesStatus }}">
                    Allow Functional Cookies
                </x-switch>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                These cookies enable the website to provide enhanced functionality and personalization.
                They may be set by us or by third-party providers whose services we have added to our pages.
            </p>

            <ul class="list-inside list-disc text-sm">
                @forelse ($functionalCookies as $cookie)
                    <li class="font-mono text-yellow-600 dark:text-yellow-400">{{ $cookie }}</li>
                @empty
                    <li class="text-lime-600 dark:text-lime-400">
                        No functional cookies are used on this website.
                    </li>
                @endforelse
            </ul>
        </div>
    </div>
</div>
