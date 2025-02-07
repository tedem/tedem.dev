<section class="relative space-y-8 p-8" id="projects" aria-labelledby="projects-heading">
    {{-- Label --}}
    <div class="absolute -right-px top-8 translate-x-full max-xl:hidden" aria-hidden="true">
        <span
            class="select-none uppercase leading-loose tracking-widest text-gray-500 [writing-mode:vertical-rl] dark:text-gray-400">
            // Projects
        </span>
    </div>

    {{-- Header --}}
    <div class="space-y-2">
        {{-- Title --}}
        <h2 class="text-2xl font-medium text-gray-950 dark:text-gray-50" id="projects-heading">
            <span class="text-gray-400 dark:text-gray-500" aria-hidden="true">//</span>
            <a href="#projects">Projects</a>
        </h2>

        {{-- Description --}}
        <p class="text-balance text-gray-600 dark:text-gray-400">
            Explore my personal projects and open-source contributions.
        </p>
    </div>

    {{-- Main --}}
    <div class="space-y-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            {{-- mybbcode.com --}}
            <div class="relative space-y-4 rounded-2xl border border-gray-200 p-4 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                role="article" aria-labelledby="mybbcode-title">
                <div class="flex items-center gap-4">
                    {{-- Figure --}}
                    <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                        aria-hidden="true">
                        <span class="uppercase text-gray-600 dark:text-gray-400">m</span>
                    </div>

                    {{-- Heading --}}
                    <div class="space-y-1">
                        {{-- Title --}}
                        <h3 class="text-lg font-medium text-gray-950 dark:text-gray-50" id="mybbcode-title">
                            <a href="https://mybbcode.com/" rel="noopener noreferrer nofollow" target="_blank">
                                <span>mybbcode.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                            2019 &mdash; Present
                        </p>
                    </div>

                    {{-- External --}}
                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500 dark:text-gray-400"
                            aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                {{-- Description --}}
                <p class="relative line-clamp-3 text-balance text-sm text-gray-700 dark:text-gray-300">
                    MyBBCode is a comprehensive platform offering plugins, themes, modifications, translations and more
                    for the free and open source forum software MyBB.
                </p>
            </div>

            {{-- settiny.com --}}
            <div class="relative space-y-4 rounded-2xl border border-gray-200 p-4 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                role="article" aria-labelledby="settiny-title">
                <div class="flex items-center gap-4">
                    {{-- Figure --}}
                    <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                        aria-hidden="true">
                        <span class="uppercase text-gray-600 dark:text-gray-400">s</span>
                    </div>

                    {{-- Heading --}}
                    <div class="space-y-1">
                        {{-- Title --}}
                        <h3 class="text-lg/tight font-medium text-gray-950 dark:text-gray-50" id="settiny-title">
                            <a href="https://settiny.com/" rel="noopener noreferrer nofollow" target="_blank">
                                <span>settiny.com</span>
                                <span class="absolute inset-0" aria-hidden="true"></span>
                            </a>
                        </h3>

                        {{-- Year --}}
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                            2022 &mdash; Present
                        </p>
                    </div>

                    {{-- External --}}
                    <div class="ml-auto">
                        <span class="text-2xl font-light text-gray-500 dark:text-gray-400"
                            aria-hidden="true">&#x2197;</span>
                    </div>
                </div>

                {{-- Description --}}
                <p class="relative line-clamp-3 text-balance text-sm text-gray-700 dark:text-gray-300">
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
                    <div class="h-px w-4 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
                    <h3>
                        <span class="font-medium">GitHub Repositories</span>
                        <span class="text-gray-400 dark:text-gray-500">/</span>
                        <span>{{ $githubRepos->count() }}</span>
                    </h3>
                    <div class="h-px flex-1 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
                    <div class="max-md:hidden">
                        <a class="text-sm" href="https://github.com/{{ env('GITHUB_USERNAME') }}?tab=repositories"
                            rel="noopener noreferrer nofollow" target="_blank">View all &rarr;</a>
                    </div>
                    <div class="h-px w-4 bg-gray-200 max-md:hidden dark:bg-gray-700" aria-hidden="true"></div>
                </div>

                {{-- Repositories --}}
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                    @foreach ($githubRepos->sortByDesc('created_at')->take(4) as $repo)
                        @php
                            $repo = (object) $repo;
                        @endphp

                        {{-- Repo --}}
                        <div class="relative space-y-4 rounded-2xl border border-gray-200 p-4 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                            role="article" aria-labelledby="repo-{{ $repo->id }}-title">
                            <div class="flex items-center gap-4">
                                {{-- Figure --}}
                                <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
                                    aria-hidden="true">
                                    <span
                                        class="uppercase text-gray-600 dark:text-gray-400">{{ Str::substr($repo->name, 0, 1) }}</span>
                                </div>

                                {{-- Main --}}
                                <div class="space-y-1">
                                    {{-- Title --}}
                                    <h3 class="text-lg font-medium text-gray-950 dark:text-gray-50"
                                        id="repo-{{ $repo->id }}-title">
                                        <a href="{{ $repo->html_url }}" rel="noopener noreferrer nofollow"
                                            target="_blank">
                                            <span>{{ $repo->name }}</span>
                                            <span class="absolute inset-0" aria-hidden="true"></span>
                                        </a>
                                    </h3>

                                    {{-- Meta --}}
                                    <div class="text-xs text-gray-600 dark:text-gray-400">
                                        {{ \Carbon\Carbon::parse($repo->created_at)->diffForHumans() }}
                                        {{-- Star counts --}}
                                        @if ($repo->stargazers_count > 0)
                                            <span class="text-gray-600 dark:text-gray-400">/</span>
                                            <span>{{ $repo->stargazers_count }} stars</span>
                                        @endif
                                    </div>
                                </div>

                                {{-- External --}}
                                <div class="ml-auto">
                                    <span class="text-2xl font-light text-gray-500 dark:text-gray-400"
                                        aria-hidden="true">&#x2197;</span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
</section>
