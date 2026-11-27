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
      sidebarOpen: boolean;
      locale: string;
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
