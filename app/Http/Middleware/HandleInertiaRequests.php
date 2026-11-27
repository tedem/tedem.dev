<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\Locale;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;
use Override;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    #[Override]
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            // Absolute base for canonical and Open Graph URLs; the page `url` prop is only the path.
            'appUrl' => config('app.url'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // Lazy: the site routes set the language in SetLocale, which runs after this middleware.
            // Pages outside the localized routes (admin, auth, unknown URLs) fall back to English.
            'locale' => fn (): string => (Locale::tryFrom(app()->getLocale()) ?? Locale::English)->value,
            // The current page in each language, for the language switcher; null outside the site.
            'alternates' => fn (): ?array => $this->alternates($request),
            // The site owner's clock (see use-owner-time.ts): IANA timezone and its current
            // offset from UTC in minutes. The client keeps time itself from there.
            'time' => fn (): array => [
                'timezone' => config('app.timezone'),
                'offset' => now()->utcOffset(),
            ],
        ];
    }

    /**
     * Where the language switcher leads from this page: the same page in every language.
     * A post exists in one language only, so from a post it leads to the other language's
     * post list.
     *
     * @return array<string, string>|null
     */
    private function alternates(Request $request): ?array
    {
        $name = (string) $request->route()?->getName();
        $page = Str::after($name, Locale::fromRouteName($name)->routePrefix());

        $target = match (true) {
            in_array($page, Locale::PAGES, true) => $page,
            $page === 'posts.show' => 'posts',
            default => null,
        };

        if ($target === null) {
            return null;
        }

        $alternates = [];

        foreach (Locale::cases() as $locale) {
            $alternates[$locale->value] = route($locale->route($target));
        }

        return $alternates;
    }
}
