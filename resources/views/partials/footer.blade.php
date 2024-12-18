{{-- Footer --}}
<footer class="sticky top-full py-12">
    <div class="mx-auto max-w-7xl max-lg:px-4 lg:px-8">
        {{-- Primary --}}
        <div
            class="relative bg-slate-900 text-slate-300 max-lg:-mx-4 max-lg:px-4 max-lg:py-12 lg:rounded-2xl lg:p-12 lg:shadow-2xl 2xl:-mx-12">
            {{-- Main --}}
            <div class="grid grid-cols-12 gap-12">
                <div class="col-span-12 space-y-8 md:col-span-6 lg:col-span-4">
                    <div class="flex shrink-0 items-center">
                        <a class="outline-hidden group inline-flex" href="{{ route('home') }}">
                            <div class="size-9 flex items-center justify-center rounded-md bg-slate-50 group-focus-visible:ring-2 group-focus-visible:ring-teal-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-900 motion-safe:transition-all motion-safe:group-hover:scale-105 motion-safe:group-focus:-translate-y-1 motion-safe:group-focus:scale-105"
                                aria-hidden="true">
                                {{-- https://lucide.dev/icons/terminal --}}
                                <svg class="size-4 text-slate-900" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <polyline points="4 17 10 11 4 5" />
                                    <line x1="12" x2="20" y1="19" y2="19" />
                                </svg>
                            </div>
                            <span class="sr-only">{{ config('app.name') }}</span>
                        </a>
                    </div>

                    <p class="text-balance text-sm text-slate-300">
                        Making the world a better place through constructing elegant hierarchies.
                    </p>

                    <div class="mt-6 flex items-center gap-6">
                        <a class="focus:outline-hidden group -m-1 rounded p-1 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            aria-label="Follow on X (Formally known as Twitter)" href="https://x.com/tedemedet"
                            target="_blank">
                            {{-- https://icons.getbootstrap.com/icons/twitter-x/ --}}
                            <svg class="size-5 fill-slate-400 transition group-hover:fill-slate-200"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                        </a>

                        <a class="focus:outline-hidden group -m-1 rounded p-1 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            aria-label="Follow on Instagram" href="https://www.instagram.com/tedem.dev/"
                            target="_blank">
                            {{-- https://icons.getbootstrap.com/icons/instagram/ --}}
                            <svg class="size-5 fill-slate-400 transition group-hover:fill-slate-200"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                        </a>

                        <a class="focus:outline-hidden group -m-1 rounded p-1 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            aria-label="Follow on GitHub" href="https://github.com/tedem" target="_blank">
                            {{-- https://icons.getbootstrap.com/icons/github/ --}}
                            <svg class="size-5 fill-slate-400 transition group-hover:fill-slate-200"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                        </a>

                        <a class="focus:outline-hidden group -m-1 rounded p-1 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            aria-label="Follow on LinkedIn" href="https://linkedin.com/in/tedem" target="_blank">
                            {{-- https://icons.getbootstrap.com/icons/linkedin/ --}}
                            <svg class="size-5 fill-slate-400 transition group-hover:fill-slate-200"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="col-span-12 space-y-8 md:col-span-6 lg:col-span-3">
                    <h3 class="text-sm/6 font-semibold text-white">Projects</h3>
                    <ul class="space-y-4 text-sm">
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="https://settiny.com/" target="_blank" rel="external">Settiny</a>
                            <span class="text-slate-500">&mdash;</span>
                            <span class="text-slate-400">2021</span>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="https://mybbcode.com/" target="_blank" rel="external">MyBBCode</a>
                            <span class="text-slate-500">&mdash;</span>
                            <span class="text-slate-400">2019</span>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="https://hesap.tools/" target="_blank" rel="external">Hesap</a>
                            <span class="text-slate-500">&mdash;</span>
                            <span class="text-slate-400">2023</span>
                        </li>
                    </ul>
                </div>

                <div class="col-span-12 space-y-8 md:col-span-6 lg:col-span-3">
                    <h3 class="text-sm/6 font-semibold text-white">Navigation</h3>
                    <ul class="space-y-4 text-sm">
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">About</a>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">Works</a>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">Blog</a>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">Contact</a>
                        </li>
                    </ul>
                </div>

                <div class="col-span-12 space-y-8 md:col-span-6 lg:col-span-2">
                    <h3 class="text-sm/6 font-semibold text-white">Legal</h3>
                    <ul class="space-y-4 text-sm">
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">Terms of Service</a>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">Privacy Policy</a>
                        </li>
                        <li>
                            <a class="focus:outline-hidden text-slate-300 transition hover:text-slate-100 focus-visible:text-teal-400"
                                href="{{ route('home') }}">License</a>
                        </li>
                    </ul>
                </div>
            </div>

            {{-- Newsletter --}}
            <div
                class="mt-12 border-t border-slate-700 pt-12 max-md:space-y-8 md:flex md:items-center md:justify-between">
                <div class="space-y-1">
                    <h3 class="text-sm font-semibold text-slate-100">Subscribe to our newsletter</h3>
                    <p class="line-clamp-1 text-sm text-slate-300">
                        The latest news, blog posts, and resources, sent to your inbox weekly.
                    </p>
                </div>

                <div class="flex gap-4">
                    <form class="relative isolate flex w-full items-center pr-1 md:w-80 lg:w-96">
                        <label class="sr-only" for="email-adress">Email address</label>
                        <input
                            class="peer flex-auto bg-transparent px-4 py-2.5 text-[0.8125rem]/6 text-teal-400 placeholder:text-teal-400 focus:outline-none"
                            id="email-adress" required type="email" autocomplete="email" name="email"
                            placeholder="Email address" />
                        <button
                            class="flex-none cursor-pointer rounded-md bg-teal-700 py-1.5 pl-2.5 pr-[calc(9/16*1rem)] text-[0.8125rem]/6 font-semibold text-white transition hover:bg-teal-800 focus:outline-none"
                            type="submit">
                            Get updates
                            <span aria-hidden="true">→</span>
                        </button>
                        <div
                            class="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-teal-900">
                        </div>
                        <div
                            class="bg-white/2.5 absolute inset-0 -z-10 rounded-lg ring-1 ring-teal-800 transition peer-focus:ring-teal-500">
                        </div>
                    </form>
                </div>
            </div>

            {{-- Border --}}
            <div aria-hidden="true">
                <div
                    class="absolute left-4 top-0 h-px w-2/3 bg-slate-800 bg-gradient-to-r from-teal-200/0 via-teal-300 to-teal-200/0">
                </div>
                <div
                    class="absolute bottom-0 right-4 h-px w-2/3 bg-slate-800 bg-gradient-to-r from-teal-200/0 via-teal-300 to-teal-200/0">
                </div>
            </div>
        </div>

        {{-- Secondary --}}
        <div
            class="flex flex-col items-center border-t border-t-slate-200 pt-12 max-md:gap-y-1 md:flex-row md:justify-between md:gap-8">
            {{-- Copy --}}
            <div>
                <p class="text-slate-500">
                    &copy;
                    {{ now()->format('Y') == '2020' ? now()->format('Y') : '2020-' . now()->format('Y') }}
                    <strong
                        class="text-center font-medium text-slate-600 md:text-left">{{ config('app.name') }}</strong>.
                    All rights reserved.
                </p>
            </div>

            {{-- Timezone --}}
            <div>
                <p class="text-slate-500">
                    {{ now()->format('d M y, H:i') }} ({{ config('app.timezone') }})
                </p>
            </div>
        </div>
    </div>
</footer>
