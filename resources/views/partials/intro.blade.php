<section class="relative p-8" id="intro">
    {{-- Label --}}
    <div class="absolute -right-px top-8 translate-x-full" aria-hidden="true">
        <span
            class="select-none uppercase leading-loose tracking-widest text-gray-400 [writing-mode:vertical-rl] dark:text-gray-500">
            // About
        </span>
    </div>

    {{-- Main --}}
    <div class="flex gap-8">
        <div class="flex">
            {{-- Avatar --}}
            <div
                class="rounded-(--radius) size-(--size) relative shrink-0 bg-white [--radius:calc(infinity*1px)] [--size:calc(var(--spacing)*24)] dark:bg-gray-800">
                <img class="rounded-(--radius) size-(--size) absolute inset-0 object-cover object-center"
                    src="{{ asset('images/avatar.jpeg') }}" alt="Medet">
                <div class="rounded-(--radius) absolute inset-0 ring-1 ring-inset ring-gray-950/10 dark:ring-gray-50/10"
                    aria-hidden="true">
                </div>
            </div>
        </div>

        <div>
            {{-- About --}}
            <div class="flex h-24 flex-col justify-center gap-4">
                <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50">Hey, I am Medet.</h1>
                <h2 class="text-xl font-medium text-gray-950 dark:text-gray-50">Crafting code, launching ideas, and
                    building
                    solutions.
                </h2>
            </div>

            {{-- Description --}}
            <div class="mt-4">
                <p class="text-balance text-gray-950 dark:text-gray-50">
                    I’m a full-stack developer and freelancer, creating custom software and sharing my tech
                    knowledge to
                    deliver efficient solutions.
                </p>
            </div>

            {{-- Social Accounts --}}
            <div class="mt-8 flex items-center gap-4">
                @php
                    $socialAccounts = [
                        ['name' => 'X', 'url' => 'https://x.com/tedemedet'],
                        ['name' => 'Instagram', 'url' => 'https://www.instagram.com/tedem.dev/'],
                        ['name' => 'Bluesky', 'url' => 'https://bsky.app/profile/tedem.dev'],
                        ['name' => 'Github', 'url' => 'https://github.com/tedem'],
                    ];
                @endphp

                @foreach ($socialAccounts as $account)
                    @php
                        $account = (object) $account;
                    @endphp

                    <a class="text-gray-950 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400"
                        href="{{ $account->url }}" rel="noopener noreferrer nofollow" target="_blank">
                        {{ $account->name }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</section>
