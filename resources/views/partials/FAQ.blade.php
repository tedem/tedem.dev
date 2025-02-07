<section class="relative space-y-8 p-8" id="FAQ">
    {{-- Label --}}
    <div class="absolute -right-px top-8 translate-x-full max-xl:hidden" aria-hidden="true">
        <span
            class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl] dark:text-gray-500">
            // FAQ
        </span>
    </div>

    {{-- Header --}}
    <div class="space-y-2">
        {{-- Title --}}
        <h2 class="text-2xl font-medium text-gray-950 dark:text-gray-50">
            <span class="text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
            <a href="#FAQ">FAQ</a>
        </h2>

        {{-- Description --}}
        <p class="text-balance text-gray-600 dark:text-gray-400">
            Find answers to the most frequently asked questions.
        </p>
    </div>

    {{-- Main --}}
    <div class="space-y-8">
        {{-- FAQs --}}
        @php
            $FAQs = [
                [
                    'question' => 'What services does tedem provide?',
                    'answer' =>
                        'I provide services in web development, web design, and digital marketing. I work with clients in a variety of industries to provide custom solutions that meet their needs.',
                ],
                [
                    'question' => 'How long does it take to complete a project with tedem?',
                    'answer' =>
                        'The time it takes to complete a project depends on the scope and complexity of the project. I work with clients to establish timelines and milestones to ensure that the project is completed on time and within budget.',
                ],
                [
                    'question' => 'What is the process for working with tedem?',
                    'answer' =>
                        'The process for working with me involves an initial consultation to discuss your needs and goals. I will then create a proposal outlining the scope of work, timeline, and budget. Once the proposal is approved, I will begin work on the project.',
                ],
                [
                    'question' => 'How much does it cost to work with tedem?',
                    'answer' =>
                        'The cost of working with me depends on the scope and complexity of the project. I provide custom quotes for each project based on the client’s needs and goals. I work with clients to establish a budget that meets their needs.',
                ],
                [
                    'question' => 'Which technologies does tedem work with?',
                    'answer' =>
                        'I work with a variety of technologies including PHP, JavaScript, React, and Laravel. I am always learning and adapting to new technologies to provide the best solutions for my clients.',
                ],
                [
                    'question' => 'Does tedem provide ongoing support for projects?',
                    'answer' =>
                        'Yes, I provide ongoing support for projects to ensure that they are running smoothly and meeting the client’s needs. I work with clients to provide updates and maintenance as needed.',
                ],
                [
                    'question' => 'How can I contact tedem?',
                    'answer' =>
                        'You can contact me through the contact form on the website. I will get back to you as soon as possible. You can also reach out to me on social media accounts or send me an email.',
                ],
            ];
        @endphp

        @foreach ($FAQs as $index => $FAQ)
            @php
                $FAQ = (object) $FAQ;
                $index = $index + 1;
            @endphp

            {{-- FAQ --}}
            <dl class="space-y-4" x-data="{ open: false }">
                {{-- Question --}}
                <dt>
                    <button class="flex w-full select-none items-start gap-4 text-left" x-on:click="open = !open"
                        x-bind:aria-expanded="open" aria-expanded="false" type="button"
                        aria-controls="FAQ-{{ $index }}">
                        {{-- Number --}}
                        <div
                            class="border-1 grid size-7 grid-cols-1 grid-rows-1 place-content-center border-gray-700/50 font-mono text-[10px]/7 font-medium text-gray-950 dark:border-white/50 dark:text-white">
                            <div class="col-start-1 row-start-1 grid place-content-center">
                                <div class="h-7 w-5 bg-white dark:bg-gray-900"></div>
                            </div>

                            <div class="col-start-1 row-start-1 grid place-content-center tracking-widest">
                                {{ Str::padLeft($index, 2, '0') }}
                            </div>
                        </div>

                        {{-- Question --}}
                        <div class="flex-1 text-lg font-medium text-gray-950 dark:text-gray-50">
                            {{ $FAQ->question }}
                        </div>

                        {{-- Toggle --}}
                        <div class="flex items-start">
                            <span class="text-2xl/7 font-light text-gray-500 dark:text-gray-400" aria-hidden="true">
                                <span x-cloak x-show="!open">&plus;</span>
                                <span x-cloak x-show="open">&minus;</span>
                            </span>
                        </div>
                    </button>
                </dt>

                {{-- Answer --}}
                <dd class="pl-11" id="FAQ-{{ $index }}" x-show="open" x-cloak x-bind:aria-hidden="!open">
                    <p class="text-gray-600 dark:text-gray-400">
                        {{ $FAQ->answer }}
                    </p>
                </dd>
            </dl>
        @endforeach
    </div>
</section>
