import type { Locale } from '@/i18n';
import type { ConsentChoices } from '@/lib/cookie-consent';
import type { Auth } from '@/types/auth';

declare module 'react' {
  interface InputHTMLAttributes<T> {
    passwordrules?: string;
  }
}

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    sharedPageProps: {
      name: string;
      appUrl: string;
      auth: Auth;
      /** The visitor's cookie choices, or null while the consent banner is still due. */
      cookieConsent: ConsentChoices | null;
      sidebarOpen: boolean;
      /** Language of the current page; admin and auth pages are always "en". */
      locale: Locale;
      /** The current page in each language, or null when it has no translated twin (admin, auth). */
      alternates: Record<Locale, string> | null;
      /** The site owner's clock, from HandleInertiaRequests::share(). */
      time: {
        /** IANA timezone name, e.g. "Europe/Istanbul" (APP_TIMEZONE). */
        timezone: string;
        /** Current offset from UTC in minutes, east positive: 180 for UTC+3. */
        offset: number;
      };
      [key: string]: unknown;
    };
  }
}
