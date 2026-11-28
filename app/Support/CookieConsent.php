<?php

declare(strict_types=1);

namespace App\Support;

use Illuminate\Http\Request;
use JsonException;

/**
 * Reads the visitor's cookie choices (resources/js/lib/cookie-consent.ts writes them),
 * so the first render already knows whether to show the consent banner.
 */
final class CookieConsent
{
    public const string COOKIE = 'cookie_consent';

    /** Keep in step with CONSENT_VERSION in cookie-consent.ts. */
    public const int VERSION = 1;

    /** @var list<string> */
    public const array CATEGORIES = ['preferences'];

    /**
     * The choice per optional category, or null when the visitor has not chosen yet or the
     * cookie is from another version of the categories.
     *
     * @return array<string, bool>|null
     */
    public static function fromRequest(Request $request): ?array
    {
        $raw = $request->cookie(self::COOKIE);

        if (! is_string($raw) || $raw === '') {
            return null;
        }

        try {
            $value = json_decode($raw, true, 4, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            return null;
        }

        if (! is_array($value) || ($value['v'] ?? null) !== self::VERSION) {
            return null;
        }

        $choices = [];

        foreach (self::CATEGORIES as $category) {
            $choices[$category] = ($value[$category] ?? false) === true;
        }

        return $choices;
    }
}
