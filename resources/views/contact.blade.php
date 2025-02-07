<x-layouts.app>
    {{-- Header --}}
    <div class="relative space-y-4 p-8">
        {{-- Label --}}
        <div class="absolute -right-px top-8 translate-x-full max-xl:hidden" aria-hidden="true">
            <span
                class="select-none uppercase leading-loose tracking-widest text-gray-500 [writing-mode:vertical-rl] dark:text-gray-400">
                // Contact
            </span>
        </div>

        {{-- Title --}}
        <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="contact-title">Contact Me</h1>

        {{-- Description --}}
        <p class="text-balance text-xl font-medium text-gray-950 dark:text-gray-50" id="contact-description"
            aria-labelledby="contact-title">
            Welcome to my personal contact page. Here you can learn more about how to reach me. I'm always open to new
            ideas.
        </p>
    </div>

    {{-- Main --}}
    <div class="p-8" role="main" aria-labelledby="contact-title" aria-describedby="contact-description">
        <article class="max-w-[65ch] text-gray-700 dark:text-gray-300">
            <p class="text-lg">
                You can contact me via email at
                <a class="font-medium text-gray-950 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400"
                    href="mailto:hello@tedem.dev">hello@tedem.dev</a> or through my social media accounts linked below.
            </p>
            <p class="mt-5">
                Please find my social media links below to connect further!
            </p>
        </article>
    </div>

    {{-- Social Accounts --}}
    @include('partials.social-accounts')
</x-layouts.app>
