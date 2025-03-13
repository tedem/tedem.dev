@props(['value'])

<label
    {{ $attributes->merge(['class' => 'inline-flex text-sm font-medium select-none text-gray-950 dark:text-white px-4']) }}>
    <span>{{ $value }}</span>
</label>
