<?php

declare(strict_types=1);

namespace App\Livewire;

use Livewire\Attributes\Layout;
use Livewire\Attributes\Validate;
use Livewire\Component;

#[Layout('layouts.app')]
final class CookieConsent extends Component
{
    public array $essentialCookies = [];

    public array $analyticCookies = [];

    public array $marketingCookies = [];

    public array $functionalCookies = [];

    #[Validate('boolean')]
    public bool $essentialCookiesStatus = true;

    #[Validate('boolean')]
    public bool $analyticCookiesStatus = false;

    #[Validate('boolean')]
    public bool $marketingCookiesStatus = false;

    #[Validate('boolean')]
    public bool $functionalCookiesStatus = false;

    private string $cookieConsentKey = 'cookie_consent';

    /**
     * Mount method to initialize the cookie consent status and preferences.
     */
    public function mount(): void
    {
        $this->initializeCookies();
        $this->setCookieConsent();
        $this->updateCookieConsent();
    }

    /**
     * Handles cookie preference updates.
     */
    public function updated(): void
    {
        $this->updateCookieConsent();
    }

    /**
     * Render the view for cookie consent.
     */
    public function render()
    {
        return view('livewire.cookie-consent.index');
    }

    /**
     * Set the cookie consent preferences based on existing cookies.
     */
    private function setCookieConsent(): void
    {
        $cookieConsent = json_decode($_COOKIE[$this->cookieConsentKey] ?? '{}', true);

        if ($cookieConsent) {
            $this->essentialCookiesStatus = $cookieConsent['essential'] ?? true;
            $this->analyticCookiesStatus = $cookieConsent['analytic'] ?? false;
            $this->marketingCookiesStatus = $cookieConsent['marketing'] ?? false;
            $this->functionalCookiesStatus = $cookieConsent['functional'] ?? false;
        }
    }

    /**
     * Update the user's cookie consent preferences and save them in a cookie.
     */
    private function updateCookieConsent(): void
    {
        $cookieConsent = [
            'essential' => $this->essentialCookiesStatus,
            'analytic' => $this->analyticCookiesStatus,
            'marketing' => $this->marketingCookiesStatus,
            'functional' => $this->functionalCookiesStatus,
        ];

        setcookie($this->cookieConsentKey, json_encode($cookieConsent), [
            'expires' => time() + 60 * 60 * 24 * 365,
            'path' => '/',
            'samesite' => 'Lax',
            'secure' => app()->environment('production'),
            'httponly' => false,
        ]);
    }

    /**
     * Method to initialize cookie arrays based on the cookie type.
     */
    private function initializeCookies(): void
    {
        $this->essentialCookies = $this->cookieDisplayFormat($this->essentialCookies());
        $this->analyticCookies = $this->cookieDisplayFormat($this->analyticCookies());
        $this->marketingCookies = $this->cookieDisplayFormat($this->marketingCookies());
        $this->functionalCookies = $this->cookieDisplayFormat($this->functionalCookies());
    }

    /**
     * Formats and sorts cookies based on their naming conventions.
     *
     * This method takes an array of cookies and categorizes them into three groups:
     * - Cookies containing a dot ('.')
     * - Cookies containing a dash ('-')
     * - Cookies containing an underscore ('_')
     *
     * Each group of cookies is then sorted alphabetically.
     *
     * @param  array  $cookies  An array of cookies to be formatted and sorted.
     * @return array An array of cookies sorted and merged by their naming conventions.
     */
    private function cookieDisplayFormat(array $cookies): array
    {
        $dottedCookies = array_filter($cookies, fn ($cookie): bool => str_contains((string) $cookie, '.'));
        $dashCookies = array_filter($cookies, fn ($cookie): bool => str_contains((string) $cookie, '-'));
        $underscoreCookies = array_filter($cookies, fn ($cookie): bool => str_contains((string) $cookie, '_'));

        $sortedDottedCookies = $dottedCookies;
        $sortedDashCookies = $dashCookies;
        $sortedUnderscoreCookies = $underscoreCookies;

        sort($sortedDottedCookies);
        sort($sortedDashCookies);
        sort($sortedUnderscoreCookies);

        return array_merge($sortedDottedCookies, $sortedDashCookies, $sortedUnderscoreCookies);
    }

    /**
     * Returns all cookies that are not analytic cookies (based on specific criteria).
     *
     * @return array List of essential cookies.
     */
    private function essentialCookies(): array
    {
        return array_filter($this->getAllCookies(),
            fn ($cookie): bool => ! str_starts_with((string) $cookie, '_ga'));
    }

    /**
     * Returns cookies that are considered analytic cookies (based on specific criteria).
     *
     * @return array List of analytic cookies.
     */
    private function analyticCookies(): array
    {
        return array_filter($this->getAllCookies(),
            fn ($cookie): bool => str_starts_with((string) $cookie, '_ga'));
    }

    /**
     * Returns an empty array for marketing cookies (custom logic can be applied).
     *
     * @return array List of marketing cookies (empty by default).
     */
    private function marketingCookies(): array
    {
        return [];
    }

    /**
     * Returns an empty array for functional cookies (custom logic can be applied).
     *
     * @return array List of functional cookies (empty by default).
     */
    private function functionalCookies(): array
    {
        return [];
    }

    /**
     * Returns all cookies available in the $_COOKIE superglobal.
     *
     * @return array List of all cookies.
     */
    private function getAllCookies(): array
    {
        return array_keys($_COOKIE);
    }
}
