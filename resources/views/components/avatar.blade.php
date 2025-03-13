@props([
    'size' => 'md',
    'rounded' => 'md',
])

@php
    $sizeClasses = match ($size) {
        'xs' => '[--size:calc(var(--spacing)*4)]',
        'sm' => '[--size:calc(var(--spacing)*6)]',
        'md' => '[--size:calc(var(--spacing)*8)]',
        'lg' => '[--size:calc(var(--spacing)*10)]',
        'xl' => '[--size:calc(var(--spacing)*12)]',
        '2xl' => '[--size:calc(var(--spacing)*14)]',
        '3xl' => '[--size:calc(var(--spacing)*16)]',
        '4xl' => '[--size:calc(var(--spacing)*18)]',
        '5xl' => '[--size:calc(var(--spacing)*20)]',
        '6xl' => '[--size:calc(var(--spacing)*22)]',
        '7xl' => '[--size:calc(var(--spacing)*24)]',
        default => '',
    };

    $roundedClasses = match ($rounded) {
        'none' => '[--radius:0]',
        'xs' => '[--radius:var(--radius-xs)]',
        'sm' => '[--radius:var(--radius-sm)]',
        'md' => '[--radius:var(--radius-md)]',
        'lg' => '[--radius:var(--radius-lg)]',
        'xl' => '[--radius:var(--radius-xl)]',
        'full' => '[--radius:calc(infinity*1px)]',
        default => '',
    };

    $classes = collect([
        'rounded-(--radius) size-(--size) relative shrink-0 bg-white dark:bg-gray-800',
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
