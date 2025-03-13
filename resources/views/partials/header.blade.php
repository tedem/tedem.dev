<header class="border-b border-gray-200 p-8 dark:border-gray-700">
    <div class="flex flex-wrap gap-8 md:items-center md:justify-between">
        {{-- Logo --}}
        <a class="max-md:flex-1/3 order-1 flex items-center gap-2.5" href="{{ route('home') }}" aria-label="Homepage"
            wire:navigate>
            <x-logogram size="sm" />

            <span class="text-lg font-medium text-gray-900 dark:text-gray-100">
                {{ config('app.name', 'tedem') }}
            </span>
        </a>

        {{-- Navigation --}}
        <nav class="flex items-center gap-8 max-md:order-3 max-md:flex-1 md:order-2" aria-label="Main Navigation">
            @foreach (['home' => 'Home', 'about' => 'About', 'contact' => 'Contact'] as $route => $label)
                <a @class([
                    'text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4 dark:text-gray-100',
                    'underline decoration-current underline-offset-4' => request()->routeIs(
                        $route . '*'),
                ]) href="{{ route($route) }}"
                    aria-current="{{ request()->routeIs($route . '*') ? 'page' : 'false' }}" wire:navigate>
                    {{ $label }}
                </a>
            @endforeach
        </nav>

        {{-- Controls --}}
        <div class="max-md:flex-1/3 flex items-center justify-end gap-4 max-md:order-2 md:order-3">
            {{-- User --}}
            <div class="relative" x-data="stateController()" x-on:keydown.escape.prevent.stop="close($refs.button)"
                x-on:focusin.window="!$refs.panel.contains($event.target) && close()">
                {{-- Button --}}
                <button
                    class="-my-1 flex items-center rounded-full p-1 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-800"
                    id="userProfileNavigationButton" x-ref="button" x-on:click="toggle()" :aria-expanded="open"
                    aria-haspopup="menu" aria-controls="userProfileNavigationPanel">
                    <span class="sr-only">User profile navigation</span>
                    @auth
                        <x-avatar radius="full" src="{{ auth()->user()->getGravatarUrl() }}"
                            alt="{{ auth()->user()->username }}" />
                    @else
                        <div class="flex size-8 items-center justify-center rounded-full bg-gray-950/5 dark:bg-white/5">
                            <x-icon.lucide class="size-5 text-gray-600 dark:text-gray-400">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </x-icon.lucide>
                        </div>
                    @endauth
                    <div class="px-2">
                        <x-icon.lucide class="size-5 text-gray-600 dark:text-gray-400">
                            <path class="transition-all" d="m6 9 6 6 6-6"
                                :d="open ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'" />
                        </x-icon.lucide>
                    </div>
                </button>

                {{-- Panel --}}
                <div id="userProfileNavigationPanel" @class([
                    'absolute right-0 z-50 mt-2 origin-top-right overflow-hidden rounded-md border bg-white p-1 shadow-md shadow-gray-950/5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-950/20',
                    'min-w-64' => auth()->check(),
                    'min-w-44' => blank(auth()->user()),
                ]) x-ref="panel" x-show="open"
                    x-transition.origin.top.right x-on:click.outside="close($refs.button)"
                    aria-labelledby="userProfileNavigationButton" role="menu" aria-orientation="vertical" x-cloak>
                    @auth
                        <div class="flex items-center gap-3 px-3 py-2.5">
                            <x-avatar src="{{ auth()->user()->getGravatarUrl() }}" alt="{{ auth()->user()->username }}" />
                            <div class="grid flex-1 text-left">
                                <span class="truncate text-sm font-medium">{{ auth()->user()->username }}</span>
                                <span class="truncate text-xs">{{ auth()->user()->email }}</span>
                            </div>
                        </div>
                        <x-dropdown.divider />
                        <div role="group">
                            <div data-orientation="vertical" role="menuitem" tabindex="-1">
                                <a class="relative flex cursor-default select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    href="{{ route('home') }}" wire:navigate>
                                    <span class="flex w-8 justify-center">
                                        <x-icon.lucide class="size-4 text-gray-600 dark:text-gray-400">
                                            <path
                                                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </x-icon.lucide>
                                    </span>
                                    <span>Settings</span>
                                </a>
                            </div>
                        </div>
                        <x-dropdown.divider />
                        <div role="group">
                            <div data-orientation="vertical" role="menuitem" tabindex="-1">
                                <a class="relative flex cursor-default select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    href="{{ route('home') }}" wire:navigate>
                                    <span class="flex w-8 justify-center">
                                        <x-icon.lucide class="size-4 text-gray-600 dark:text-gray-400">
                                            <circle cx="12" cy="16" r="1" />
                                            <rect x="3" y="10" width="18" height="12" rx="2" />
                                            <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                                        </x-icon.lucide>
                                    </span>
                                    <span>Admin</span>
                                </a>
                            </div>
                        </div>
                        <x-dropdown.divider />
                        <div data-orientation="vertical" role="menuitem" tabindex="-1">
                            <form class="w-full" method="POST" action="{{ route('signOut') }}">
                                @csrf
                                <button
                                    class="relative flex w-full cursor-default select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    type="submit">
                                    <span class="flex w-8 justify-center">
                                        <x-icon.lucide class="size-4 text-gray-600 dark:text-gray-400">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" x2="9" y1="12" y2="12" />
                                        </x-icon.lucide>
                                    </span>
                                    <span>Sign Out</span>
                                </button>
                            </form>
                        </div>
                    @else
                        <div role="group">
                            <div data-orientation="vertical" role="menuitem" tabindex="-1">
                                <a class="relative flex cursor-default select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    href="{{ route('signIn') }}" wire:navigate>
                                    <span class="flex justify-center">
                                        <x-icon.lucide class="size-4 text-gray-600 dark:text-gray-400">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" x2="3" y1="12" y2="12" />
                                        </x-icon.lucide>
                                    </span>
                                    <span>Sign In</span>
                                </a>
                            </div>
                            <div data-orientation="vertical" role="menuitem" tabindex="-1">
                                <a class="relative flex cursor-default select-none items-center gap-3 rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    href="{{ route('signUp') }}" wire:navigate>
                                    <span class="flex justify-center">
                                        <x-icon.lucide class="size-4 text-gray-600 dark:text-gray-400">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <line x1="19" x2="19" y1="8" y2="14" />
                                            <line x1="22" x2="16" y1="11" y2="11" />
                                        </x-icon.lucide>
                                    </span>
                                    <span>Sign Up</span>
                                </a>
                            </div>
                        </div>
                    @endauth
                </div>
            </div>
        </div>
    </div>
</header>
