<x-layouts.app>
    <x-slot name="head">
        <x-meta :title="title('Contact')" :description="description(['Here you can learn more about how to reach me.', 'I’m always open to new ideas.'])" />
    </x-slot>

    {{-- Header --}}
    <div class="relative space-y-4 p-8">
        {{-- Label --}}
        <x-vertical-label value="Contact" />

        {{-- Title --}}
        <x-headline level="1" size="4xl" value="Contact" id="contact-title" />

        {{-- Description --}}
        <p class="text-balance text-xl font-light text-gray-950 dark:text-gray-50" id="contact-description"
            aria-labelledby="contact-title">
            Here you can learn more about how to reach me. I'm always open to new ideas.
        </p>
    </div>

    {{-- Main --}}
    <div class="p-8" role="main" aria-labelledby="contact-title" aria-describedby="contact-description">
        <article class="prose dark:prose-invert">
            <p class="text-lg">
                You can contact me via email at
                <a href="mailto:hello@tedem.dev">hello@tedem.dev</a> or through my social media accounts linked below.
            </p>
            <p class="mt-5">
                Please find my social media links below to connect further!
            </p>
        </article>
    </div>

    {{-- Social Accounts --}}
    @include('partials.social-accounts')
</x-layouts.app>
