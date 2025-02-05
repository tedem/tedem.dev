<header class="border-b border-gray-200 p-8">
    <div class="flex items-center justify-between">
        {{-- Logo --}}
        <a class="flex items-center gap-2 text-lg font-medium text-gray-900" href="{{ route('home') }}">
            <span class="text-gray-500" aria-hidden="true">//.</span>
            <span>{{ config('app.name', 'tedem') }}</span>
        </a>

        {{-- Navigation --}}
        <nav class="flex items-center gap-8">
            @foreach (['home' => 'Home', 'about' => 'About', 'contact' => 'Contact'] as $route => $label)
                <a class="text-gray-900 hover:underline hover:decoration-current hover:underline-offset-4"
                    href="{{ route($route) }}">{{ $label }}</a>
            @endforeach
        </nav>
    </div>
</header>
