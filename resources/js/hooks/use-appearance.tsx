import { hasConsent, onConsentChange } from '@/lib/cookie-consent';
import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
  readonly appearance: Appearance;
  readonly resolvedAppearance: ResolvedAppearance;
  readonly updateAppearance: (mode: Appearance) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';

const prefersDark = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

/**
 * The theme is remembered (localStorage for the client, a cookie for SSR) only with the
 * visitor's consent to preference cookies. Without it the switch still works, for the
 * current visit only.
 */
const persist = (appearance: Appearance): void => {
  localStorage.setItem('appearance', appearance);
  setCookie('appearance', appearance);
};

const forget = (): void => {
  localStorage.removeItem('appearance');
  setCookie('appearance', '', 0);
};

const getStoredAppearance = (): Appearance => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  return (localStorage.getItem('appearance') as Appearance) || 'system';
};

const isDarkMode = (appearance: Appearance): boolean => {
  return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const isDark = isDarkMode(appearance);

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
  listeners.add(callback);

  return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => applyTheme(currentAppearance);

export function initializeTheme(): void {
  if (typeof window === 'undefined') {
    return;
  }

  currentAppearance = getStoredAppearance();
  applyTheme(currentAppearance);

  // Set up system theme change listener
  mediaQuery()?.addEventListener('change', handleSystemThemeChange);

  // Remember the current theme once preference cookies are allowed; forget it when they are not.
  onConsentChange(({ preferences }) => (preferences ? persist(currentAppearance) : forget()));
}

export function useAppearance(): UseAppearanceReturn {
  const appearance: Appearance = useSyncExternalStore(
    subscribe,
    () => currentAppearance,
    () => 'system',
  );

  const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance) ? 'dark' : 'light';

  const updateAppearance = (mode: Appearance): void => {
    currentAppearance = mode;

    if (hasConsent('preferences')) {
      persist(mode);
    }

    applyTheme(mode);
    notify();
  };

  return { appearance, resolvedAppearance, updateAppearance } as const;
}
