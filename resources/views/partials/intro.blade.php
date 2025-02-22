<section class="relative p-8" id="intro" aria-labelledby="intro-heading">
    {{-- Label --}}
    <x-vertical-label value="Intro" />

    {{-- Main --}}
    <div class="flex flex-col gap-8 md:flex-row">
        <div class="flex">
            {{-- Avatar --}}
            <x-avatar size="7xl" radius="full" src="{{ $gravatarUrl }}" alt="tedem's Avatar" />
        </div>

        <div>
            {{-- About --}}
            <div class="flex flex-col justify-center gap-4 md:h-24">
                <h1 class="text-4xl font-medium tracking-tight text-gray-950 dark:text-gray-50" id="intro-heading">
                    Hey, I am Medet.
                </h1>
                <h2 class="text-balance text-xl font-medium text-gray-950 dark:text-gray-50">
                    Full-stack Developer & Freelancer
                </h2>
            </div>

            {{-- Description --}}
            <div class="mt-4">
                <p class="text-balance text-gray-950 dark:text-gray-50">
                    I am a full-stack developer with a passion for building applications. I have been working in the
                    industry for over 10 years and have experience in a wide range of technologies.
                </p>
            </div>

            {{-- Social Accounts --}}
            <div class="mt-8 flex items-center gap-4">
                @foreach ($socialAccounts as $account)
                    @php
                        $account = (object) $account;
                    @endphp

                    <a class="text-gray-950 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400"
                        href="{{ $account->url }}" rel="noopener noreferrer nofollow" target="_blank"
                        aria-label="{{ $account->name }}'s profile">
                        {{ $account->name }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
</section>
