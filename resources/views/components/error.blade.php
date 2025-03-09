@props(['for'])

@error($for)
    <div class="px-4">
        <p class="text-sm text-red-500">{{ $message }}</p>
    </div>
@enderror
