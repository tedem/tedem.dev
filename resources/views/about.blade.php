@php
    $title = 'About — ' . config('app.name');
    $description = implode(' ', [
        'Welcome to my personal about page.',
        'Here you can learn more about my mission, vision, and values.',
    ]);
@endphp

<x-layouts.app>
    <x-slot name="head">
        <x-meta title="{{ $title }}" description="{{ $description }}" />
    </x-slot>

    {{-- Header --}}
    <div class="relative space-y-4 p-8">
        {{-- Label --}}
        <x-vertical-label value="About" />

        {{-- Title --}}
        <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="about-title">About</h1>

        {{-- Description --}}
        <p class="text-balance text-xl font-light text-gray-950 dark:text-gray-50" aria-labelledby="about-title">
            Welcome to my personal about page. Here you can learn more about my mission, vision, and values.
        </p>
    </div>

    {{-- Main --}}
    <div class="p-8" role="main" aria-labelledby="about-title" aria-describedby="about-description">
        <article class="prose dark:prose-invert">
            <p class="text-lg">
                I’m a full-stack developer and freelancer, creating custom software and sharing my tech knowledge to
                deliver efficient solutions.
            </p>
            <p>
                I’m passionate about building software that is scalable, maintainable, and
                secure. I’m also a strong advocate for open-source software and the Laravel PHP framework. I’m always
                looking for new opportunities to collaborate with other developers and businesses. Feel free to reach
                out to me if you have any questions or would like to work together. I’m always open to new ideas and
                challenges. Let’s build something amazing together!
            </p>
            <h2 class="flex items-center gap-3" id="mission-title">
                <span class="select-none text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
                Mission
            </h2>
            <p aria-labelledby="mission-title">
                My mission is to help businesses and developers build better software. I believe that technology can
                transform the world and make it a better place. I’m committed to creating software that is efficient,
                reliable, and secure. I’m also dedicated to sharing my knowledge and expertise with others to help them
                succeed in their own projects. I believe that by working together, we can achieve great things.
            </p>
            <h2 class="flex items-center gap-3" id="vision-title">
                <span class="select-none text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
                Vision
            </h2>
            <p aria-labelledby="vision-title">
                My vision is to create a world where technology is accessible to everyone. I believe that technology
                should be inclusive and empower people to achieve their goals. I’m committed to creating software that
                is user-friendly and easy to use. I’m also dedicated to sharing my knowledge and expertise with others
                to help them succeed in their own projects. I believe that by working together, we can achieve great
                things.
            </p>
            <h2 class="flex items-center gap-3" id="values-title">
                <span class="select-none text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
                Values
            </h2>
            <p aria-labelledby="values-title">
                My values are integrity, excellence, and collaboration. I believe in doing the right thing, even when
                no one is looking. I’m committed to delivering high-quality work that meets the needs of my clients. I’m
                also dedicated to working with others to achieve common goals. I believe that by working together, we
                can
                achieve great things.
            </p>
            <h2 class="flex items-center gap-3" id="feedback-title">
                <span class="select-none text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
                Feedback
            </h2>
            <p aria-labelledby="feedback-title">
                I welcome any feedback and thoughts you may have, as they are invaluable in improving our journey
                together. Thank you for visiting my page. I value every connection and am excited about potential
                collaborations!
            </p>
            <h2 class="flex items-center gap-3" id="contact-title">
                <span class="select-none text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
                Contact
            </h2>
            <p aria-labelledby="contact-title">
                You can
                <a href="{{ route('contact') }}">contact</a>
                me through the contact form on the website. I will get back to you as soon as possible.
                You can also reach out to me on social media accounts or send me an
                <a href="mailto:hello@tedem.dev">email</a>.
            </p>
            <p>
                I'm always open to suggestions, so don't hesitate to reach out!
            </p>
        </article>
    </div>

    {{-- Social Accounts --}}
    @include('partials.social-accounts')
</x-layouts.app>
