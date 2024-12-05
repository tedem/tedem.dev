{{-- Header --}}
<header class="py-12">
    <div class="mx-auto max-w-7xl max-lg:px-4 lg:px-8">
        <div class="flex items-center gap-x-8 lg:gap-x-12">
            {{-- Identity --}}
            <div class="flex items-center gap-4">
                <div class="flex shrink-0 items-center">
                    <a class="group inline-flex outline-0" href="{{ route('home') }}">
                        <div class="size-9 flex items-center justify-center rounded-md bg-slate-950 shadow-[0_1px_3px_theme(colors.black/0.24),inset_0_1px_theme(colors.white/0.24)] group-focus-visible:ring-2 group-focus-visible:ring-teal-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-50 motion-safe:transition-all motion-safe:group-hover:scale-105 motion-safe:group-focus:-translate-y-1 motion-safe:group-focus:scale-105"
                            aria-hidden="true">
                            {{-- https://lucide.dev/icons/terminal --}}
                            <svg class="size-4 text-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" aria-hidden="true">
                                <polyline points="4 17 10 11 4 5" />
                                <line x1="12" x2="20" y1="19" y2="19" />
                            </svg>
                        </div>
                        <span class="sr-only">{{ config('app.name') }}</span>
                    </a>
                </div>
                <div>
                    <a class="group outline-0" href="{{ route('home') }}">
                        <h1 class="text-xl font-semibold lowercase text-slate-950 group-focus-visible:text-teal-700">
                            {{ config('app.name') }}
                        </h1>
                    </a>
                </div>
            </div>

            {{-- WIP --}}
            <div
                class="group relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-px text-xs/6 font-medium text-slate-900 motion-safe:transition-all motion-safe:hover:scale-110 motion-safe:hover:border-slate-300 max-lg:hidden">
                <div>
                    {{-- https://lucide.dev/icons/loader-circle --}}
                    <svg class="size-3 text-slate-600 motion-safe:group-hover:animate-spin"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </div>
                <span
                    class="inline-flex h-3.5 w-px rounded-full bg-slate-300 motion-safe:transition-transform motion-safe:group-hover:rotate-12"
                    aria-hidden="true"></span>
                <span class="whitespace-nowrap lowercase">Work in progress</span>
                <div class="pointer-events-none" aria-hidden="true">
                    <div
                        class="absolute -top-px left-8 right-4 h-px bg-gradient-to-r from-slate-200/0 via-slate-400 to-slate-200/0">
                    </div>
                    <div
                        class="absolute -bottom-px left-4 right-8 h-px bg-gradient-to-r from-slate-200/0 via-slate-400 to-slate-200/0">
                    </div>
                </div>
            </div>

            <div class="ml-auto flex items-center">
                {{-- Navigation --}}
                <nav class="max-md:hidden">
                    <ul class="flex items-center gap-x-12">
                        <li>
                            <a class="whitespace-nowrap text-sm font-semibold leading-6 text-slate-800 outline-0 transition-all hover:text-teal-700 focus-visible:text-teal-700"
                                href="{{ route('home') }}">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a class="whitespace-nowrap text-sm font-semibold leading-6 text-slate-800 outline-0 transition-all hover:text-teal-700 focus-visible:text-teal-700"
                                href="{{ route('home') }}">
                                Works
                            </a>
                        </li>
                        <li>
                            <a class="whitespace-nowrap text-sm font-semibold leading-6 text-slate-800 outline-0 transition-all hover:text-teal-700 focus-visible:text-teal-700"
                                href="{{ route('home') }}">
                                About
                            </a>
                        </li>
                        <li class="inline-flex">
                            <a class="group inline-flex h-9 items-center gap-2.5 rounded-full bg-slate-950 px-4 shadow-[0_1px_3px_theme(colors.black/0.24),inset_0_1px_theme(colors.white/0.16)] outline-0 transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                                href="{{ route('home') }}">
                                <span
                                    class="relative -ml-3.5 inline-flex h-8 w-11 overflow-clip rounded-full bg-slate-50">
                                    {{-- https://lucide.dev/icons/send --}}
                                    <svg class="size-4 absolute left-[14px] top-2/4 shrink-0 -translate-y-2/4 text-slate-950 motion-safe:transition-all motion-safe:group-hover:left-[44px] motion-safe:group-focus:left-[44px]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" aria-hidden="true">
                                        <path
                                            d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                                        <path d="m21.854 2.147-10.94 10.939" />
                                    </svg>
                                    {{-- https://lucide.dev/icons/move-right --}}
                                    <svg class="size-4 absolute -left-[16px] top-2/4 hidden shrink-0 -translate-y-2/4 text-slate-950 group-hover:left-[14px] group-focus:left-[14px] motion-safe:inline motion-safe:transition-all"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" aria-hidden="true">
                                        <path d="M18 8L22 12L18 16" />
                                        <path d="M2 12H22" />
                                    </svg>
                                </span>
                                <span class="whitespace-nowrap text-sm font-semibold text-white">
                                    Get in touch
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {{-- Responsive Navigation --}}
                <div class="relative md:hidden" x-data="responsiveNavigation"
                    x-on:keydown.escape.prevent.stop="close($refs.button)"
                    x-on:focusin.window="! $refs.panel.contains($event.target) && close()"
                    x-id="['responsive-navigation']">
                    {{-- Button --}}
                    <button
                        class="flex h-9 items-center justify-center rounded-md border border-slate-300 bg-slate-50 px-4 shadow-[0_1px_2px_theme(colors.black/0.06),_inset_0_1px_theme(colors.white)] outline-0 transition hover:bg-white focus:bg-white focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                        x-ref="button" x-on:click="toggle()" :aria-expanded="open"
                        :aria-controls="$id('responsive-navigation')">
                        {{-- https://lucide.dev/icons/menu --}}
                        <svg class="size-4 text-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" aria-hidden="true">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                        <span class="sr-only">Responsive toggle</span>
                    </button>

                    {{-- Panel --}}
                    <div class="min-w-56 absolute right-0 mt-2 rounded-lg border-t-4 border-slate-950 bg-white shadow-md"
                        x-ref="panel" x-show="open" x-transition.origin.top.right
                        x-on:click.outside="close($refs.button)" :id="$id('responsive-navigation')"
                        style="display: none;">
                        <a class="flex w-full items-center gap-2 px-6 py-3 text-left text-sm max-md:text-base first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            Blog
                        </a>

                        <a class="flex w-full items-center gap-2 px-6 py-3 text-left text-sm max-md:text-base first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            Works
                        </a>

                        <a class="flex w-full items-center gap-2 px-6 py-3 text-left text-sm max-md:text-base first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            About
                        </a>

                        <a class="flex w-full items-center gap-2 px-6 py-3 text-left text-sm max-md:text-base first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            <span class="font-medium">Get in touch</span>
                        </a>
                    </div>
                </div>

                <script>
                    document.addEventListener('alpine:init', () => {
                        Alpine.data('responsiveNavigation', () => ({
                            open: false,
                            toggle() {
                                if (this.open) {
                                    return this.close()
                                }

                                this.$refs.button.focus()

                                this.open = true
                            },
                            close(focusAfter) {
                                if (!this.open) return

                                this.open = false

                                focusAfter && focusAfter.focus()
                            }
                        }))
                    })
                </script>
            </div>
        </div>
    </div>
</header>
