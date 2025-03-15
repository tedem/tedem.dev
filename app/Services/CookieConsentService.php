<?php

declare(strict_types=1);

namespace App\Services;

final class CookieConsentService
{
    /**
     * @var array
     *
     * An array to store the user's cookie consent preferences.
     */
    private array $cookieConsent;

    /**
     * CookieConsentService constructor.
     *
     * This constructor initializes the cookie consent settings by decoding the
     * 'cookie_consent' cookie (if it exists) from JSON format into an associative array.
     * If the cookie does not exist or is invalid, it initializes an empty array.
     *
     * @return void
     */
    public function __construct()
    {
        $cookieConsent = json_decode($_COOKIE['cookie_consent'] ?? '{}', true);

        $this->cookieConsent = $cookieConsent ?? [];
    }

    /**
     * Retrieve the value of a specific key from the cookie consent data.
     *
     * @param  string  $key  The key to retrieve the value for.
     * @param  mixed  $default  The default value to return if the key does not exist.
     * @return mixed The value associated with the specified key, or the default value if the key does not exist.
     */
    public function get(string $key, $default = null)
    {
        return $this->cookieConsent[$key] ?? $default;
    }

    /**
     * Retrieve all cookie consent data.
     *
     * @return array An array containing all cookie consent information.
     */
    public function all(): array
    {
        return $this->cookieConsent;
    }
}
