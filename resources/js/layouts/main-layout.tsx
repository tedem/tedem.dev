import Header from '@/layouts/main/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
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

        <main className="py-8" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
