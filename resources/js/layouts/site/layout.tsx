import Header from '@/layouts/site/header';
import Footer from '@/layouts/site/footer';
import { useLocale, useMessages } from '@/i18n';
import { useEffect } from 'react';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const t = useMessages();

  // The server sets <html lang> on the first load; client visits between languages update it here.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <div className="flex min-h-lvh w-full flex-col">
        {/* Top of the page */}
        <div className="sr-only" id="top">
          {t.layout.topOfPage}
        </div>

        {/* Skip link */}
        <a className="sr-only focus:not-sr-only" href="#main-content">
          {t.layout.skipToContent}
        </a>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />
      </div>
    </>
  );
}
