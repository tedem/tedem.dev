@props(['error' => null])

<div class="space-y-3">
    {{ $slot }}

    @if ($error)
        <x-error for="{{ $error }}" />
    @endif
</div>
