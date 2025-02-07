<section class="relative space-y-8 p-8 dark:bg-gray-900" id="services" aria-labelledby="services-heading">
    {{-- Label --}}
    <div class="absolute -right-px top-8 translate-x-full max-xl:hidden" aria-hidden="true">
        <span
            class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl] dark:text-gray-500">
            // Services
        </span>
    </div>

    {{-- Header --}}
    <div class="space-y-2">
        {{-- Title --}}
        <h2 class="text-2xl font-medium text-gray-950 dark:text-gray-50" id="services-heading">
            <span class="text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
            <a href="#services">Services</a>
        </h2>

        {{-- Description --}}
        <p class="text-balance text-gray-600 dark:text-gray-300">
            Discover the range of services I offer to help you achieve your goals.
        </p>
    </div>

    {{-- Main --}}
    <div class="space-y-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            @php
                $services = [
                    [
                        'name' => 'Development',
                        'description' => 'Building modern web and mobile applications.',
                    ],
                    [
                        'name' => 'UI/UX Design',
                        'description' => 'Designing user-friendly interfaces and experiences.',
                    ],
                    [
                        'name' => 'Branding & Strategy',
                        'description' => 'Developing brand identities and strategic plans.',
                    ],
                    [
                        'name' => 'SEO Optimization',
                        'description' => 'Improving search engine rankings and visibility.',
                    ],
                ];
            @endphp

            @foreach ($services as $id => $service)
                @php
                    $service = (object) $service;
                    $service->id = $id + 1;
                @endphp

                <div class="relative rounded-2xl bg-gray-50 p-4 hover:border-gray-300 dark:bg-gray-800 dark:hover:border-gray-600"
                    role="region" aria-labelledby="service-{{ $service->id }}-title">
                    {{-- Absolute --}}
                    <div class="absolute right-4 top-0 h-0.5 w-8 rounded-full bg-teal-500 ring-2 ring-white dark:ring-gray-800"
                        aria-hidden="true"></div>

                    <div class="flex gap-4">
                        {{-- Number --}}
                        <div class="flex w-12 justify-center">
                            <span
                                class="dark:[-webkit-text-stroke-color]:[-webkit-text-stroke-color:var(--color-gray-400)] select-none font-mono text-5xl text-gray-500 supports-[-webkit-text-stroke-color]:[-webkit-text-fill-color:white] supports-[-webkit-text-stroke-color]:[-webkit-text-stroke-color:var(--color-gray-500)] supports-[-webkit-text-stroke-color]:[-webkit-text-stroke-width:1px] dark:text-gray-400 dark:supports-[-webkit-text-stroke-color]:[-webkit-text-fill-color:var(--color-gray-900)]">{{ $service->id }}</span>
                        </div>

                        {{-- Main --}}
                        <div class="flex-1 space-y-2">
                            {{-- Title --}}
                            <h3 class="text-lg font-medium text-gray-950 dark:text-gray-50"
                                id="service-{{ $service->id }}-title">
                                <span>{{ $service->name }}</span>
                            </h3>

                            {{-- Description --}}
                            <p class="line-clamp-3 text-balance text-sm text-gray-700 dark:text-gray-400">
                                {{ $service->description }}
                            </p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
