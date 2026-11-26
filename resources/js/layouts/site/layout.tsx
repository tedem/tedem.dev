import Header from '@/layouts/site/header';
import Footer from '@/layouts/site/footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-lvh w-full flex-col">
        {/* Top of the page */}
        <div className="sr-only" id="top">
          Top of the page
        </div>

        {/* Skip link */}
        <a className="sr-only focus:not-sr-only" href="#main-content">
          Skip to main content
        </a>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />
      </div>
    </>
  );
}
