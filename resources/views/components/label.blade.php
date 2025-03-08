@props(['value'])

<label {{ $attributes->class(['inline-flex text-sm font-medium select-none text-gray-950 dark:text-white px-4']) }}>
    <span>{{ $value }}</span>
</label>
