<section class="relative space-y-8 p-8" id="services">
    {{-- Absolute --}}
    <div class="absolute -right-px top-8 translate-x-full" aria-hidden="true">
        <span class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl]">
            // Services
        </span>
    </div>

    {{-- Header --}}
    <div class="space-y-2">
        {{-- Title --}}
        <h2 class="text-2xl font-medium text-gray-950">
            <span class="text-gray-400" aria-hidden="true">//</span>
            <a href="#services">Services</a>
        </h2>

        {{-- Description --}}
        <p class="text-gray-600">Discover the range of services I offer to help you achieve your goals.</p>
    </div>

    {{-- Main --}}
    <div class="space-y-8">
        <div class="grid grid-cols-2 gap-8">
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

                <div class="relative rounded-2xl bg-gray-50 p-4 transition-colors hover:border-gray-300">
                    {{-- Absolute --}}
                    <div class="absolute right-4 top-0 h-0.5 w-8 rounded-full bg-teal-500 ring-2 ring-white"
                        aria-hidden="true"></div>

                    <div class="flex gap-4">
                        {{-- Number --}}
                        <div class="flex w-12 justify-center">
                            <span
                                class="select-none font-mono text-5xl text-gray-500 supports-[-webkit-text-stroke-color]:[-webkit-text-fill-color:white] supports-[-webkit-text-stroke-color]:[-webkit-text-stroke-color:var(--color-gray-500)] supports-[-webkit-text-stroke-color]:[-webkit-text-stroke-width:1px]">{{ $service->id }}</span>
                        </div>

                        {{-- Main --}}
                        <div class="flex-1 space-y-2">
                            {{-- Title --}}
                            <h3 class="text-lg font-medium text-gray-950">
                                <span>{{ $service->name }}</span>
                            </h3>

                            {{-- Description --}}
                            <p class="line-clamp-3 text-balance text-sm text-gray-700">
                                {{ $service->description }}
                            </p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
