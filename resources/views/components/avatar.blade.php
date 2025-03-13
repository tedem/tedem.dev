@props([
    'size' => 'md',
    'rounded' => 'md',
])

@php
    $sizeClasses = match ($size) {
        'xs' => 'size-4',
        'sm' => 'size-6',
        'md' => 'size-8',
        'lg' => 'size-10',
        'xl' => 'size-12',
        '2xl' => 'size-14',
        '3xl' => 'size-16',
        '4xl' => 'size-18',
        '5xl' => 'size-20',
        '6xl' => 'size-22',
        '7xl' => 'size-24',
        default => 'size-8',
    };

    $roundedClasses = match ($rounded) {
        'none' => '[--radius:0]',
        'xs' => '[--radius:var(--radius-xs)]',
        'sm' => '[--radius:var(--radius-sm)]',
        'md' => '[--radius:var(--radius-md)]',
        'lg' => '[--radius:var(--radius-lg)]',
        'xl' => '[--radius:var(--radius-xl)]',
        'full' => '[--radius:calc(infinity*1px)]',
        default => '[--radius:var(--radius-md)]',
    };

    $classes = collect([
        'rounded-(--radius) relative shrink-0 bg-white dark:bg-gray-800 select-none',
        $sizeClasses,
        $roundedClasses,
    ])->filter()->implode(' ');

    $baseAttributes = $attributes->only('class')->merge(['class' => $classes]);

    $imageAttributes = $attributes->except('class')->merge([
        'class' => 'rounded-(--radius) absolute inset-0 object-cover object-center',
        'loading' => 'lazy',
    ]);
@endphp

<div {{ $baseAttributes }}>
    <img {{ $imageAttributes }}>
    <div class="rounded-(--radius) absolute inset-0 ring-1 ring-inset ring-gray-950/10 dark:ring-gray-50/10"
        aria-hidden="true"></div>
</div>
