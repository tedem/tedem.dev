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
      auth: Auth;
      sidebarOpen: boolean;
      locale: string;
      time: {
        timezone: string;
        now: string;
        utc_offset: string;
      };
      [key: string]: unknown;
    };
  }
}
