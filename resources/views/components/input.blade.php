@props(['prefix' => null, 'suffix' => null, 'status' => '0'])

@php
    // Validate the status
    $status = in_array($status, ['0', '1', '2']) ? $status : '0';
@endphp

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
        class="h-full flex-1 rounded-[calc(var(--rounded)-(4px-1px))] border-0 bg-transparent px-3 text-sm text-gray-950 focus:outline-none dark:text-white"
        {{ $attributes }}>

    {{-- Status Label --}}
    @if ($attributes->has('required') || $attributes->has('status'))
        @php
            $statusVariables = (object) match ($status) {
                '0' => ['label' => 'Required', 'class' => 'text-gray-950 dark:text-white'],
                '1' => ['label' => 'Valid', 'class' => 'text-green-600 dark:text-green-400'],
                '2' => ['label' => 'Invalid', 'class' => 'text-red-600 dark:text-red-400'],
            };
        @endphp
        <span
            class="flex size-[calc((var(--spacing)*8)-2px)] items-center justify-center rounded-[calc(var(--rounded)-(4px-1px))] hover:bg-gray-200/60 dark:hover:bg-gray-800/60"
            aria-label="{{ $statusVariables->label }}" title="{{ $statusVariables->label }}">
            <svg class="{{ $statusVariables->class }} size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                @if ($status === '1')
                    <path d="M20 6 9 17l-5-5" />
                @elseif ($status === '2')
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                @else
                    <path d="M12 6v12" />
                    <path d="M17.196 9 6.804 15" />
                    <path d="m6.804 9 10.392 6" />
                @endif
            </svg>
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
