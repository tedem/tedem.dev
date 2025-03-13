@props(['size' => 'md', 'as' => '!'])

@php
    $sizeClasses = match ($size) {
        'xs' => '[--size:calc(var(--spacing)*6)]',
        'sm' => '[--size:calc(var(--spacing)*8)]',
        'md' => '[--size:calc(var(--spacing)*10)]',
        'lg' => '[--size:calc(var(--spacing)*12)]',
        'xl' => '[--size:calc(var(--spacing)*14)]',
        default => '[--size:calc(var(--spacing)*10)]',
    };

    $textSizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-sm',
        'md' => 'text-base',
        'lg' => 'text-lg',
        'xl' => 'text-xl',
        default => 'text-base',
    };

    $classes = collect([
        'flex size-(--size) select-none items-center justify-center rounded-full bg-gray-950 text-gray-50 dark:bg-gray-50 dark:text-gray-950',
        $textSizeClasses,
        $sizeClasses,
    ])->filter()->implode(' ');
@endphp

@if ($as === 'link')
    <a href="{{ route('home') }}" aria-label="Homepage">
        <span {{ $attributes->merge(['class' => $classes]) }} aria-hidden="true">//.</span>
    </a>
@else
    <span {{ $attributes->merge(['class' => $classes]) }} aria-hidden="true">//.</span>
@endif
