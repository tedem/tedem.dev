<section class="relative space-y-8 p-8" id="projects">
    {{-- Absolute --}}
    <div class="absolute -right-px top-8 translate-x-full" aria-hidden="true">
        <span class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl]">
            // Projects
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
    <div class="space-y-8">
        <div class="grid grid-cols-2 gap-8">
            {{-- mybbcode.com --}}
            <div
                class="relative space-y-4 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-gray-300">
                <div class="flex items-center gap-4">
                    {{-- Figure --}}
                    <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <span class="uppercase text-gray-600" aria-hidden="true">m</span>
                    </div>

                    {{-- Heading --}}
                    <div class="space-y-1">
                        {{-- Title --}}
                        <h3 class="text-lg font-medium text-gray-950">
                            <a href="https://mybbcode.com/" rel="noopener noreferrer nofollow" target="_blank">
                                <span>mybbcode.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <p class="text-xs text-gray-600">
                            2019 &mdash; Present
                        </p>
                    </div>

                    {{-- External --}}
                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                {{-- Description --}}
                <p class="relative line-clamp-3 text-balance text-sm text-gray-700">
                    MyBBCode is a comprehensive platform offering plugins, themes, modifications, translations and more
                    for the free and open source forum software MyBB.
                </p>
            </div>

            {{-- settiny.com --}}
            <div
                class="relative space-y-4 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-gray-300">
                <div class="flex items-center gap-4">
                    {{-- Figure --}}
                    <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <span class="uppercase text-gray-600" aria-hidden="true">s</span>
                    </div>

                    {{-- Heading --}}
                    <div class="space-y-1">
                        {{-- Title --}}
                        <h3 class="text-lg/tight font-medium text-gray-950">
                            <a href="https://settiny.com/" rel="noopener noreferrer nofollow" target="_blank">
                                <span>settiny.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <p class="text-xs text-gray-600">
                            2022 &mdash; Present
                        </p>
                    </div>

                    {{-- External --}}
                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500" aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                {{-- Description --}}
                <p class="relative line-clamp-3 text-balance text-sm text-gray-700">
                    Settiny is a gaming platform that offers esports news, reviews, and interviews, as well as player
                    settings, peripherals (gear), and configs. It also has game tools and a team finder.
                </p>
            </div>
        </div>

        {{-- Github Repositories --}}
        @if ($githubRepos->isNotEmpty())
            <div class="space-y-8">
                {{-- Heading --}}
                <div class="flex items-center gap-4">
                    <div class="h-px w-4 bg-gray-200" aria-hidden="true"></div>
                    <h3>
                        <span class="font-medium">GitHub Repositories</span>
                        <span class="text-gray-400">/</span>
                        <span>{{ $githubRepos->count() }}</span>
                    </h3>
                    <div class="h-px flex-1 bg-gray-200" aria-hidden="true"></div>
                    <div>
                        <a class="text-sm" href="https://github.com/{{ env('GITHUB_USERNAME') }}?tab=repositories"
                            rel="noopener noreferrer nofollow" target="_blank">View all &rarr;</a>
                    </div>
                    <div class="h-px w-4 bg-gray-200" aria-hidden="true"></div>
                </div>

                {{-- Repositories --}}
                <div class="grid grid-cols-2 gap-8">
                    @foreach ($githubRepos->sortByDesc('created_at')->take(4) as $repo)
                        @php
                            $repo = (object) $repo;
                        @endphp

                        {{-- Repo --}}
                        <div
                            class="relative space-y-4 rounded-2xl border border-gray-200 p-4 transition-colors hover:border-gray-300">
                            <div class="flex items-center gap-4">
                                {{-- Figure --}}
                                <div
                                    class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                    <span class="uppercase text-gray-600"
                                        aria-hidden="true">{{ Str::substr($repo->name, 0, 1) }}</span>
                                </div>

                                {{-- Main --}}
                                <div class="space-y-1">
                                    {{-- Title --}}
                                    <h3 class="text-lg font-medium text-gray-950">
                                        <a href="{{ $repo->html_url }}" rel="noopener noreferrer nofollow"
                                            target="_blank">
                                            <span>{{ $repo->name }}</span>
                                            <span class="absolute inset-0" aria-hidden="true"></span>
                                        </a>
                                    </h3>

                                    {{-- Meta --}}
                                    <div class="text-xs text-gray-600">
                                        {{ \Carbon\Carbon::parse($repo->created_at)->diffForHumans() }}
                                        {{-- Star counts --}}
                                        @if ($repo->stargazers_count > 0)
                                            <span class="text-gray-600">/</span>
                                            <span>{{ $repo->stargazers_count }} stars</span>
                                        @endif
                                    </div>
                                </div>

                                {{-- External --}}
                                <div class="ml-auto">
                                    <span class="text-2xl font-light text-gray-500" aria-hidden="true">&#x2197;</span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</section>
