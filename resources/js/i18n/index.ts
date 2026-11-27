import en, { type Messages } from '@/i18n/messages/en';
import tr from '@/i18n/messages/tr';
import * as routesTr from '@/routes';
import * as routesEn from '@/routes/en';
import { show as showEn } from '@/routes/en/posts';
import { show as showTr } from '@/routes/posts';
import { usePage } from '@inertiajs/react';

/*
 * The public site comes in Turkish (default, unprefixed URLs) and English (/en/...).
 * The server decides the language from the route and shares it as the `locale` prop;
 * everything here reads that prop, so a page never has to pass the language around.
 * Admin and auth pages stay English and do not use this module.
 */

export type Locale = 'tr' | 'en';

export type { Messages };

export const LOCALES: Record<Locale, { label: string; intl: string }> = {
  tr: { label: 'Türkçe', intl: 'tr-TR' },
  en: { label: 'English', intl: 'en-GB' },
};

const MESSAGES: Record<Locale, Messages> = { tr, en };

type SiteRoutes = {
  home: () => { url: string };
  about: () => { url: string };
  posts: () => { url: string };
  contact: () => { url: string };
  post: (args: { slug: string; publicId: string }) => { url: string };
};

const ROUTES: Record<Locale, SiteRoutes> = {
  tr: { home: routesTr.home, about: routesTr.about, posts: routesTr.posts, contact: routesTr.contact, post: showTr },
  en: { home: routesEn.home, about: routesEn.about, posts: routesEn.posts, contact: routesEn.contact, post: showEn },
};

/** The language of the current page. */
export function useLocale(): Locale {
  return usePage().props.locale;
}

/** The copy of the current page's language. */
export function useMessages(): Messages {
  return MESSAGES[useLocale()];
}

/** Route helpers for the public pages, in the current page's language. */
export function useRoutes(): SiteRoutes {
  return ROUTES[useLocale()];
}

export type SitePage = {
  label: string;
  /** Terminal-style path shown instead of the label: "~/", "~/hakkımda". Decoration only: URLs are English in both languages. */
  code: string;
  href: string;
};

/** The four public pages in the current language: home, about, posts, contact. */
export function useSitePages(): readonly SitePage[] {
  const t = useMessages();
  const routes = useRoutes();

  return [
    { label: t.nav.home, code: '~/', href: routes.home().url },
    { label: t.nav.about, code: `~/${t.paths.about}`, href: routes.about().url },
    { label: t.nav.posts, code: `~/${t.paths.posts}`, href: routes.posts().url },
    { label: t.nav.contact, code: `~/${t.paths.contact}`, href: routes.contact().url },
  ];
}

// UTC on both ends: "2026-11-26" is a calendar day, not an instant, and must not shift
// a day between the server render and the visitor's timezone.
const DATE_FORMATS = Object.fromEntries(
  Object.entries(LOCALES).map(([locale, { intl }]) => [
    locale,
    new Intl.DateTimeFormat(intl, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }),
  ]),
) as Record<Locale, Intl.DateTimeFormat>;

/** "2026-11-26" -> "26 Nov 2026" / "26 Kas 2026". */
export function formatPostDate(day: string, locale: Locale) {
  return DATE_FORMATS[locale].format(new Date(`${day}T00:00:00Z`));
}
