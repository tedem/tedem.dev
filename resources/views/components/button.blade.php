@props([
    'as' => 'button',
    'variant' => 'primary',
    'size' => 'md',
    'rounded' => 'md',
    'value' => null,
])

@php
    $variantClasses = match ($variant) {
        'primary' => collect([
            'bg-gray-950 text-white hover:bg-gray-950/90 focus:ring-2 focus:ring-offset-2 focus:ring-gray-950 focus:ring-offset-white',
            'dark:bg-white dark:text-gray-950 dark:hover:bg-white/90 dark:focus:ring-white dark:focus:ring-offset-gray-900',
        ])->filter()->implode(' '),
        'secondary' => collect([
            'bg-gray-200 text-gray-950 hover:bg-gray-200/90 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:ring-offset-white',
            'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700/90 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900',
        ])->filter()->implode(' '),
        'destructive' => collect([
            'bg-red-700 text-white hover:bg-red-700/90 focus:ring-2 focus:ring-offset-2 focus:ring-red-700 focus:ring-offset-white',
            'dark:bg-red-800 dark:hover:bg-red-800/90 dark:focus:ring-red-800 dark:focus:ring-offset-gray-900',
        ])->filter()->implode(' '),
        'outline' => collect([
            'bg-white text-gray-950 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 focus:ring-offset-white',
            'border border-gray-300',
            'dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900',
            'dark:border-gray-700',
        ])->filter()->implode(' '),
        'plain' => collect([
            'bg-transparent text-gray-950 hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:ring-offset-white',
            'dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900',
        ])->filter()->implode(' '),
        'link' => collect([
            'bg-transparent text-gray-950 hover:underline hover:underline-offset-4 focus:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200 focus-visible:ring-offset-white',
            'dark:text-white dark:focus-visible:ring-gray-700 dark:focus-visible:ring-offset-gray-900',
        ])->filter()->implode(' '),
    };

    $sizeClasses = match ($size) {
        'sm' => 'h-8 px-3 gap-1.5',
        'md' => 'h-10 px-4 gap-2',
        'lg' => 'h-12 px-5 gap-2.5',
        'xl' => 'h-14 px-6 gap-3',
    };

    $roundedClasses = match ($rounded) {
        'none' => 'rounded-none',
        'xs' => 'rounded-xs',
        'sm' => 'rounded-sm',
        'md' => 'rounded-md',
        'lg' => 'rounded-lg',
        'xl' => 'rounded-xl',
        'full' => 'rounded-full',
    };

    $classes = collect([
        'inline-flex items-center justify-center whitespace-nowrap text-sm select-none font-medium',
        'focus:outline-none',
        $variantClasses,
        $sizeClasses,
        $roundedClasses,
        'disabled:pointer-events-none disabled:opacity-50',
    ])->filter()->implode(' ');
@endphp

@if ($as === 'button')
    <button {{ $attributes->merge(['class' => $classes]) }}>
        {{ $value ?? $slot }}
    </button>
@endif

@if ($as === 'link')
    <a {{ $attributes->merge(['class' => $classes]) }}>
        {{ $value ?? $slot }}
    </a>
@endif
