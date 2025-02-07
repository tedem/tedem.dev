<div class="flex items-center gap-4 p-8">
    @foreach ($socialAccounts as $account)
        @php
            $account = (object) $account;
        @endphp

        <a class="text-gray-950 hover:text-teal-600 dark:text-gray-50 dark:hover:text-teal-400" href="{{ $account->url }}"
            rel="noopener noreferrer nofollow" target="_blank">
            {{ $account->name }}
        </a>
    @endforeach
</div>
