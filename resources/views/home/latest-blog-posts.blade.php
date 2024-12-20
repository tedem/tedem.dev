<section class="py-12" id="latest-blog-posts">
    <x-container>
        <div class="grid grid-cols-1 gap-16">
            <div>
                <div class="space-y-6">
                    <div class="flex items-center gap-8">
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            <a class="focus:outline-hidden focus-visible:text-teal-600" href="#latest-blog-posts">
                                Latest blog posts
                            </a>
                        </h2>
                        <div class="h-px flex-1 bg-slate-100 bg-gradient-to-r from-slate-200/0 via-slate-300 to-slate-200/0"
                            aria-hidden="true"></div>
                    </div>
                    <p class="text-balance max-w-2xl text-slate-600">
                        I like to learn new things and share what I have learnt.
                        You can find the main software related blog posts here.
                    </p>
                </div>
            </div>

            <div class="relative rounded-2xl border border-slate-200 bg-white">
                <ul class="divide-y divide-slate-200">
                    <li>
                        <article class="flex gap-4 p-4">
                            {{-- Photo --}}
                            <div
                                class="rounded-(--radius) group relative aspect-video h-14 [--radius:var(--radius-lg)] motion-safe:overflow-clip">
                                <img class="size-full rounded-(--radius) absolute inset-0 object-cover motion-safe:transition-transform motion-safe:group-hover:scale-110"
                                    src="https://picsum.photos/1280/720" alt="">

                                <div class="rounded-(--radius) absolute inset-0 ring-1 ring-inset ring-slate-950/10"
                                    aria-hidden="true"></div>
                            </div>

                            {{-- Main --}}
                            <div class="grid content-between gap-1">
                                <h2 class="text-base/7 font-medium text-slate-950">
                                    <a class="focus:outline-hidden focus-visible:text-teal-600" href="#">
                                        <span class="line-clamp-1">
                                            The Future of Web Development The Future of Web
                                            Development
                                        </span>
                                    </a>
                                </h2>

                                <div class="flex items-center gap-2.5">
                                    <time class="whitespace-nowrap text-xs text-slate-700" datetime="2020-03-16">
                                        Mar 16, 2020
                                    </time>

                                    <span class="text-slate-200">/</span>

                                    <div class="flex items-center gap-2">
                                        <div
                                            class="size-6 rounded-(--radius) relative shrink-0 [--radius:_calc(infinity_*_1px)]">
                                            <img class="rounded-(--radius) absolute inset-0 object-cover"
                                                src="https://i.pravatar.cc/300" alt="">
                                            <div class="rounded-(--radius) absolute inset-0 ring-1 ring-inset ring-slate-950/10"
                                                aria-hidden="true"></div>
                                        </div>

                                        <a class="focus:outline-hidden whitespace-nowrap text-xs font-medium focus-visible:text-teal-600"
                                            href="#">
                                            Medet Erdal
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-1" aria-hidden="true"></div>

                            <div class="grid content-between gap-1 max-md:hidden">
                                <div class="flex items-center justify-end gap-4">
                                    <ul
                                        class="*:first:*:rounded-l-full *:last:*:rounded-r-full flex items-center gap-x-0.5 text-xs">
                                        <li class="">
                                            <a class="focus:outline-hidden inline-block whitespace-nowrap bg-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200 focus-visible:bg-slate-200"
                                                href="#">Marketing</a>
                                        </li>
                                        <li>
                                            <a class="focus:outline-hidden inline-block whitespace-nowrap bg-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200 focus-visible:bg-slate-200"
                                                href="#">Development</a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex items-center justify-end gap-2.5">
                                    <span class="whitespace-nowrap text-xs lowercase text-slate-700">4 comments</span>

                                    <span class="text-slate-200">/</span>

                                    <span class="whitespace-nowrap text-xs lowercase text-slate-700">
                                        <span class="lg:hidden">4m read</span>
                                        <span class="max-lg:hidden">Perfect for a 4-minute coffee break</span>
                                    </span>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <a class="focus:outline-hidden flex h-14 w-10 items-center justify-center rounded-lg bg-white transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 motion-safe:focus:translate-x-1"
                                    href="#">
                                    <span class="sr-only">Read more</span>
                                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    </li>
                </ul>

                <div aria-hidden="true">
                    <div
                        class="absolute -top-px left-4 h-px w-2/3 bg-slate-200 bg-gradient-to-r from-slate-200/0 via-slate-300 to-slate-200/0">
                    </div>
                    <div
                        class="absolute -bottom-px right-4 h-px w-2/3 bg-slate-200 bg-gradient-to-r from-slate-200/0 via-slate-300 to-slate-200/0">
                    </div>
                </div>
            </div>
        </div>
    </x-container>
</section>
