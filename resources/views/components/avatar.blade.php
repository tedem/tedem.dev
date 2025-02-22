@props(['size' => 'md', 'radius' => 'md', 'src' => '', 'alt' => ''])

@php
    $sizeClasses = [
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
    ][$size];

    $radiusClasses = [
        'none' => '[--radius:0]',
        'xs' => '[--radius:var(--radius-xs)]',
        'sm' => '[--radius:var(--radius-sm)]',
        'md' => '[--radius:var(--radius-md)]',
        'lg' => '[--radius:var(--radius-lg)]',
        'xl' => '[--radius:var(--radius-xl)]',
        'full' => '[--radius:calc(infinity*1px)]',
    ][$radius];
@endphp

<div
    class="rounded-(--radius) size-(--size) {{ $radiusClasses }} {{ $sizeClasses }} relative shrink-0 bg-white dark:bg-gray-800">
    <img class="rounded-(--radius) absolute inset-0 object-cover object-center" src="{{ $src }}"
        alt="{{ $alt }}" loading="lazy">
    <div class="rounded-(--radius) absolute inset-0 ring-1 ring-inset ring-gray-950/10 dark:ring-gray-50/10"
        aria-hidden="true"></div>
</div>
