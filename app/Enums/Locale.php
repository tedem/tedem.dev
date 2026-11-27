<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * The public site's languages. Turkish is the default: its URLs have no prefix (/about).
 * English lives under /en (/en/about). Page names in URLs are English in both languages;
 * only the copy is translated. Route names follow the prefix rule: "about" for Turkish,
 * "en.about" for English. The admin area is not localized.
 */
enum Locale: string
{
    case Turkish = 'tr';
    case English = 'en';

    /**
     * Fixed pages of the site, by their language-neutral key.
     *
     * @var list<string>
     */
    public const array PAGES = ['home', 'about', 'posts', 'contact'];

    public static function default(): self
    {
        return self::Turkish;
    }

    /**
     * The language a route belongs to, from its name ("en.about" is English).
     */
    public static function fromRouteName(?string $name): self
    {
        foreach (self::cases() as $locale) {
            if ($locale !== self::default() && str_starts_with((string) $name, $locale->value.'.')) {
                return $locale;
            }
        }

        return self::default();
    }

    /**
     * URL prefix: none for the default language.
     */
    public function prefix(): string
    {
        return $this === self::default() ? '' : $this->value;
    }

    /**
     * Route name prefix: none for the default language, "en." for English.
     */
    public function routePrefix(): string
    {
        return $this === self::default() ? '' : $this->value.'.';
    }

    /**
     * Route name of a page in this language: "about" or "en.about".
     */
    public function route(string $page): string
    {
        return $this->routePrefix().$page;
    }
}
