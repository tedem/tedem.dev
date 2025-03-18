@props([
    'level' => null,
    'size' => null,
    'thickness' => null,
    'prefix' => null,
    'link' => null,
    'linkClass' => null,
    'value' => null,
])

@php
    // Set the headline level
    $level = match ($level) {
        '1' => 1,
        '2' => 2,
        '3' => 3,
        default => 2,
    };

    // Set the headline size
    $sizeClasses = match ($size) {
        'xs' => 'text-xs',
        'sm' => 'text-sm',
        'base' => 'text-base',
        'lg' => 'text-lg',
        'xl' => 'text-xl',
        '2xl' => 'text-2xl',
        '3xl' => 'text-3xl',
        '4xl' => 'text-4xl',
        '5xl' => 'text-5xl',
        '6xl' => 'text-6xl',
        '7xl' => 'text-7xl',
        '8xl' => 'text-8xl',
        '9xl' => 'text-9xl',
        default => 'text-2xl',
    };

    // Set the thickness of the headline
    $thicknessClasses = match ($thickness) {
        'light' => 'font-light',
        'medium' => 'font-medium',
        'semibold' => 'font-semibold',
        'bold' => 'font-bold',
        default => 'font-medium',
    };

    // Base classes
    $baseClasses = collect([
        'flex items-center gap-3 text-2xl text-gray-950 dark:text-gray-50',
        $sizeClasses,
        $thicknessClasses,
    ])->filter()->implode(' ');

    // Prefix classes
    $prefixClasses = 'select-none text-gray-500';

    // Base attributes
    $baseAttributes = $attributes->merge(['class' => $baseClasses]);

    // Link attributes
    $linkAttributes = collect([
        'class' => $linkClass,
        'href' => $link,
    ])->filter()->map(function ($value, $key) {
        return $key . '="' . $value . '"';
    })->implode(' ');
@endphp

@if ($level === 1)
    <h1 {{ $baseAttributes }}>
        @if ($prefix)
            <span class="{{ $prefixClasses }}">{{ $prefix }}</span>
        @endif
        @if ($link)
        <a {!! $linkAttributes !!}>{{ $value ?? $slot }}</a>
        @else
            {{ $value ?? $slot }}
        @endif
    </h1>
@endif

@if ($level === 2)
    <h2 {{ $baseAttributes }}>
        @if ($prefix)
            <span class="{{ $prefixClasses }}">{{ $prefix }}</span>
        @endif
        @if ($link)
        <a {!! $linkAttributes !!}>{{ $value ?? $slot }}</a>
        @else
            {{ $value ?? $slot }}
        @endif
    </h2>
@endif

@if ($level === 3)
    <h3 {{ $baseAttributes }}>
        @if ($prefix)
            <span class="{{ $prefixClasses }}">{{ $prefix }}</span>
        @endif
        @if ($link)
        <a {!! $linkAttributes !!}>{{ $value ?? $slot }}</a>
        @else
            {{ $value ?? $slot }}
        @endif
    </h3>
@endif
