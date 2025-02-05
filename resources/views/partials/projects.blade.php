<section class="relative space-y-8 p-8" id="projects">
    {{-- Absolute --}}
    <div class="absolute -right-px top-8 translate-x-full" aria-hidden="true">
        <span class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl]">
            Projects
        </span>
    </div>

    {{-- Header --}}
    <div class="space-y-2">
        {{-- Title --}}
        <h2 class="text-2xl font-medium text-gray-950">
            <span class="text-gray-400" aria-hidden="true">//</span>
            <a href="#projects">Projects</a>
        </h2>

        {{-- Description --}}
        <p class="text-gray-600">Explore my personal projects and open-source contributions.</p>
    </div>

    {{-- Main --}}
    <div>
        <div class="grid grid-cols-2 gap-8">
            {{-- mybbcode.com --}}
            <div
                class="relative space-y-4 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-gray-300">
                <div class="flex items-center gap-4">
                    {{-- Avatar --}}
                    <div class="flex size-12 items-center justify-center rounded-full bg-slate-100">
                        <span class="uppercase text-gray-600" aria-hidden="true">m</span>
                    </div>

                    {{-- Heading --}}
                    <div>
                        {{-- Title --}}
                        <h3 class="text-lg/tight font-medium text-gray-950">
                            <a href="https://mybbcode.com/" rel="noopener noreferrer" target="_blank">
                                <span>mybbcode.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <span class="text-xs text-gray-600">
                            2019 &mdash; Present
                        </span>
                    </div>

                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                <p class="relative line-clamp-3 text-balance text-sm text-gray-700">
                    MyBBCode is a comprehensive platform offering plugins, themes, modifications, translations and more
                    for the free and open source forum software MyBB.
                </p>
            </div>

            {{-- settiny.com --}}
            <div
                class="relative space-y-4 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-gray-300">
                <div class="flex items-center gap-4">
                    {{-- Avatar --}}
                    <div class="flex size-12 items-center justify-center rounded-full bg-slate-100">
                        <span class="uppercase text-gray-600" aria-hidden="true">s</span>
                    </div>

                    {{-- Heading --}}
                    <div>
                        {{-- Title --}}
                        <h3 class="text-lg/tight font-medium text-gray-950">
                            <a href="https://settiny.com/" rel="noopener noreferrer" target="_blank">
                                <span>settiny.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <span class="text-xs text-gray-600">
                            2022 &mdash; Present
                        </span>
                    </div>

                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                <p class="relative line-clamp-3 text-balance text-sm text-gray-700">
                    Settiny is a gaming platform that offers esports news, reviews, and interviews, as well as player
                    settings, peripherals (gear), and configs. It also has game tools and a team finder.
                </p>
            </div>
        </div>
    </div>
</section>
