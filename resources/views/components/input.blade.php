@props(['prefix' => null, 'suffix' => null])

<div
    class="has-focus-within:outline-none has-focus-within:ring-2 has-focus-within:ring-gray-300 has-focus-within:ring-offset-2 has-focus-within:ring-offset-white dark:has-focus-within:ring-gray-700 dark:has-focus-within:ring-offset-gray-900 flex h-10 items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 p-1 [--rounded:var(--radius-lg)] dark:border-gray-700 dark:bg-gray-950 dark:text-white">
    {{-- Prefix Label --}}
    @if ($prefix)
        <span
            class="flex h-[calc((var(--spacing)*8)-2px)] items-center justify-center rounded-[calc(var(--rounded)-(4px-1px))] bg-gray-200/60 px-3 text-sm text-gray-950 dark:bg-gray-800/60 dark:text-white">
            {{ $prefix }}
        </span>
    @endif

    {{-- Input --}}
    <input
        class="size-full flex-1 rounded-[calc(var(--rounded)-(4px-1px))] border-0 bg-transparent px-3 text-sm text-gray-950 focus:outline-none dark:text-white"
        {{ $attributes }}>

    {{-- Status Label --}}
    @if ($attributes->has('required'))
        <span
            class="flex size-[calc((var(--spacing)*8)-2px)] shrink-0 items-center justify-center rounded-[calc(var(--rounded)-(4px-1px))] hover:bg-gray-200/60 dark:hover:bg-gray-800/60"
            aria-label="Required" title="Required">
            <x-icon.lucide class="size-3.5 text-gray-950 dark:text-white">
                <path d="M12 6v12" />
                <path d="M17.196 9 6.804 15" />
                <path d="m6.804 9 10.392 6" />
            </x-icon.lucide>
        </span>
    @endif

    {{-- Suffix Label --}}
    @if ($suffix)
        <span
            class="flex h-[calc((var(--spacing)*8)-2px)] items-center justify-center rounded-[calc(var(--rounded)-(4px-1px))] bg-gray-200/60 px-3 text-sm text-gray-950 dark:bg-gray-800/60 dark:text-white">
            {{ $suffix }}
        </span>
    @endif
</div>
