{{-- Header --}}
<header class="py-12">
    <div class="mx-auto max-w-7xl max-lg:px-4 lg:px-8">
        <div class="flex items-center gap-x-8 lg:gap-x-12">
            {{-- Identity --}}
            <div class="flex items-center gap-4">
                <div class="flex shrink-0 items-center">
                    <a class="group inline-flex" href="{{ route('home') }}">
                        <div class="size-9 flex items-center justify-center rounded-md bg-slate-950 shadow-[0_1px_3px_theme(colors.black/24%),inset_0_1px_theme(colors.white/16%)] transition-all group-hover:scale-105 group-focus:-translate-y-1 group-focus:scale-105"
                            aria-hidden="true">
                            <span class="text-lg font-semibold text-slate-100">/</span>
                        </div>
                        <span class="sr-only">{{ config('app.name') }}</span>
                    </a>
                </div>
                <div class="max-sm:hidden">
                    <a href="{{ route('home') }}">
                        <h1 class="text-2xl font-bold lowercase tracking-wide text-slate-950">
                            {{ config('app.name') }}
                        </h1>
                    </a>
                </div>
            </div>

            {{-- WIP --}}
            <div
                class="flex items-center gap-2 rounded-full border border-dashed border-slate-300 py-px pl-1 pr-3 text-xs/6 font-medium text-slate-900 max-lg:hidden">
                <div
                    class="size-5 flex items-center justify-center rounded-full bg-slate-950 shadow-[0_1px_3px_theme(colors.black/24%),inset_0_1px_theme(colors.white/16%)]">
                    <x-heroicon-c-arrow-path class="size-2.5 text-slate-50" aria-hidden="true" />
                </div>
                <span class="whitespace-nowrap lowercase">Work in progress</span>
            </div>

            <div class="ml-auto flex items-center">
                {{-- Navigation --}}
                <nav class="max-md:hidden">
                    <ul class="flex items-center gap-x-12">
                        <li>
                            <a class="whitespace-nowrap font-semibold leading-6 text-slate-800 transition-all hover:text-teal-800"
                                href="{{ route('home') }}">
                                Articles
                            </a>
                        </li>
                        <li>
                            <a class="whitespace-nowrap font-semibold leading-6 text-slate-800 transition-all hover:text-teal-700"
                                href="{{ route('home') }}">
                                Works
                            </a>
                        </li>
                        <li>
                            <a class="whitespace-nowrap font-semibold leading-6 text-slate-800 transition-all hover:text-teal-700"
                                href="{{ route('home') }}">
                                About
                            </a>
                        </li>
                        <li>
                            <a class="inline-flex h-9 items-center rounded-full bg-slate-950 px-4 shadow-[0_1px_3px_theme(colors.black/24%),inset_0_1px_theme(colors.white/16%)] transition hover:bg-slate-800"
                                href="{{ route('home') }}">
                                <span class="whitespace-nowrap font-semibold text-white">
                                    Get in touch
                                </span> </a>
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
                        class="flex h-9 items-center justify-center rounded-md bg-slate-950 px-3 shadow-[0_1px_3px_theme(colors.black/24%),inset_0_1px_theme(colors.white/16%)] transition hover:bg-slate-800"
                        x-ref="button" x-on:click="toggle()" :aria-expanded="open"
                        :aria-controls="$id('responsive-navigation')">
                        <x-heroicon-o-bars-2 class="size-6 text-slate-50" aria-hidden="true" />
                        <span class="sr-only">Responsive toggle</span>
                    </button>

                    {{-- Panel --}}
                    <div class="min-w-56 absolute right-0 mt-2 rounded-lg border-t-4 border-slate-950 bg-white shadow-md"
                        x-ref="panel" x-show="open" x-transition.origin.top.right
                        x-on:click.outside="close($refs.button)" :id="$id('responsive-navigation')"
                        style="display: none;">
                        <a class="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            Articles
                        </a>

                        <a class="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            Works
                        </a>

                        <a class="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
                            href="{{ route('home') }}">
                            About
                        </a>

                        <a class="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-slate-50 disabled:text-slate-500"
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
