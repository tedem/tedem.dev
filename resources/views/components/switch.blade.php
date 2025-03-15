<label class="inline-flex items-center">
    <input type="checkbox" {{ $attributes->merge(['class' => 'peer sr-only']) }} @checked($attributes->get('data-checked'))>

    <div class="relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:inset-y-[2px] after:start-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-teal-600"
        aria-hidden="true">
    </div>

    @if (!$slot->isEmpty())
        <span @class([
            'text-sm ml-2.5' => $attributes->has('valuable'),
            'sr-only' => !$attributes->has('valuable'),
        ])>{{ $slot }}</span>
    @endif
</label>
