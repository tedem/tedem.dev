import { useSyncExternalStore } from 'react';

/*
 * The visitor's cookie choices, kept in one first-party cookie so the server can render
 * the page with the right state (no banner flash for visitors who already chose).
 *
 * Categories are listed in OPTIONAL_CATEGORIES. Adding one (e.g. 'analytics') means adding
 * it here, to the server's CookieConsent parser and to the copy in i18n/messages; then gate
 * the feature with `hasConsent('analytics')`.
 */

export const CONSENT_COOKIE = 'cookie_consent';

/** Bump when the categories change, so everyone is asked again. Keep in step with CookieConsent.php. */
export const CONSENT_VERSION = 1;

/** About six months, the usual upper bound for keeping a consent choice. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export const OPTIONAL_CATEGORIES = ['preferences'] as const;

export type ConsentCategory = (typeof OPTIONAL_CATEGORIES)[number];

export type ConsentChoices = Record<ConsentCategory, boolean>;

type Listener = () => void;

const listeners = new Set<Listener>();
const changeHandlers = new Set<(choices: ConsentChoices) => void>();

/** undefined: not read from the cookie yet; null: no (valid) choice made. */
let current: ConsentChoices | null | undefined;
let settingsOpen = false;

const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

function parse(raw: string | undefined): ConsentChoices | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(decodeURIComponent(raw));
    if (typeof value !== 'object' || value === null) return null;

    const record = value as Record<string, unknown>;
    if (record.v !== CONSENT_VERSION) return null;

    return Object.fromEntries(
      OPTIONAL_CATEGORIES.map((category) => [category, record[category] === true]),
    ) as ConsentChoices;
  } catch {
    return null;
  }
}

function readCookie(): ConsentChoices | null {
  if (typeof document === 'undefined') return null;

  const entry = document.cookie.split('; ').find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  return parse(entry?.slice(CONSENT_COOKIE.length + 1));
}

function getChoices(): ConsentChoices | null {
  if (current === undefined) current = readCookie();
  return current;
}

/** Whether the visitor allowed a category. Necessary cookies never need asking. */
export function hasConsent(category: ConsentCategory): boolean {
  return getChoices()?.[category] === true;
}

/** Stores the choice, closes the settings and tells every gated feature about it. */
export function saveConsent(choices: ConsentChoices): void {
  const value = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION, ...choices }));
  const secure = window.location.protocol === 'https:' ? ';Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax${secure}`;

  current = choices;
  settingsOpen = false;
  changeHandlers.forEach((handler) => handler(choices));
  notify();
}

export const acceptAll = () =>
  saveConsent(Object.fromEntries(OPTIONAL_CATEGORIES.map((category) => [category, true])) as ConsentChoices);

export const rejectAll = () =>
  saveConsent(Object.fromEntries(OPTIONAL_CATEGORIES.map((category) => [category, false])) as ConsentChoices);

/** Runs whenever the visitor saves a choice; returns an unsubscribe function. */
export function onConsentChange(handler: (choices: ConsentChoices) => void): () => void {
  changeHandlers.add(handler);
  return () => changeHandlers.delete(handler);
}

export function openCookieSettings(): void {
  settingsOpen = true;
  notify();
}

export function setCookieSettingsOpen(open: boolean): void {
  settingsOpen = open;
  notify();
}

/**
 * The current choice and whether the settings dialog is open. `serverChoices` is the
 * choice the server read from the same cookie, used while rendering and hydrating so the
 * markup matches.
 */
export function useCookieConsent(serverChoices: ConsentChoices | null) {
  const choices = useSyncExternalStore(subscribe, getChoices, () => serverChoices);
  const open = useSyncExternalStore(
    subscribe,
    () => settingsOpen,
    () => false,
  );

  return { choices, decided: choices !== null, settingsOpen: open } as const;
}
