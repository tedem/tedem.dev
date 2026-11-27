import Container from '@/components/site/container';
import BrandMark from '@/components/shared/brand-mark';
import { Button } from '@/components/ui/button';
import { MAILTO, WORDMARK } from '@/content/profile';
import { type Locale, LOCALES, useLocale, useMessages, useRoutes, useSitePages } from '@/i18n';
import { login } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

/** Tailwind `md` (768px): the mobile menu is not rendered at or above this width. */
const DESKTOP_QUERY = '(min-width: 48rem)';

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * A home page ("/", "/en") only matches itself; other items also match their
 * sub-pages ("/posts/my-post"). Route helpers may return absolute URLs, so only
 * the path is compared.
 */
function isActive(href: string, path: string, isHome: boolean) {
  const target = new URL(href, 'http://localhost').pathname;
  if (isHome) return path === target;
  return path === target || path.startsWith(`${target}/`);
}

/**
 * Open state for the mobile disclosure menu.
 * Escape closes it and returns focus to the toggle; growing past `md` closes it,
 * so it never comes back "open" after a resize.
 */
function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return { open, toggle, close, toggleRef };
}

/* -------------------------------------------------------------------------- */
/* Parts                                                                      */
/* -------------------------------------------------------------------------- */

function Logo() {
  const routes = useRoutes();

  return (
    <Link href={routes.home().url} className={`flex items-center gap-4 ${focusRing}`}>
      <BrandMark className="size-9" />

      {/* Always in the DOM so the link keeps its name; only visually hidden between md and lg. */}
      <span className="text-foreground text-xl font-semibold tracking-wide md:max-lg:sr-only">{WORDMARK}</span>
    </Link>
  );
}

function NavigationLinks({
  currentPath,
  className = '',
  onNavigate,
}: {
  currentPath: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const navigation = useSitePages();

  return (
    <>
      {navigation.map(({ label, code, href }, index) => {
        const active = isActive(href, currentPath, index === 0);

        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
            // The current page is marked by an underline as well as colour (WCAG 1.4.1).
            className={`text-foreground hover:text-foreground/80 aria-[current=page]:text-primary transition-colors aria-[current=page]:underline aria-[current=page]:underline-offset-4 ${focusRing} ${className}`}
          >
            {/* The "~/" prefix is decoration; the visible text is symbols, so the name comes from the label. */}
            <span className="font-mono" aria-hidden="true">
              {code}
            </span>
            <span className="sr-only">{label}</span>
          </Link>
        );
      })}
    </>
  );
}

/**
 * Link to the same page in the other language (falls back to its home page), e.g. "EN".
 * Named in the language it leads to, with `lang` and `hrefLang` so screen readers pronounce it right.
 */
function LanguageSwitch({ expanded = false, onNavigate }: { expanded?: boolean; onNavigate?: () => void }) {
  const locale = useLocale();
  const t = useMessages();
  const { alternates } = usePage().props;

  const target: Locale = locale === 'tr' ? 'en' : 'tr';
  const href = alternates?.[target] ?? (target === 'tr' ? '/' : '/en');

  return (
    <Button variant={expanded ? 'outline' : 'ghost'} asChild>
      <Link href={href} hrefLang={target} lang={target} aria-label={t.nav.switchLabel} onClick={onNavigate}>
        <span aria-hidden="true" className="font-mono uppercase">
          {target}
        </span>
        {/* The mobile menu has room for the language's own name. */}
        {expanded && <span aria-hidden="true">{LOCALES[target].label}</span>}
      </Link>
    </Button>
  );
}

function Actions({
  contactClassName,
  expanded = false,
  onNavigate,
}: {
  contactClassName?: string;
  expanded?: boolean;
  onNavigate?: () => void;
}) {
  const t = useMessages();

  return (
    <>
      <LanguageSwitch expanded={expanded} onNavigate={onNavigate} />

      <Button variant="outline" asChild>
        <Link href={login().url} onClick={onNavigate}>
          {t.nav.login}
        </Link>
      </Button>

      {/* Plain anchor: Inertia's Link would try to fetch a mailto: URL as a page visit. */}
      <Button asChild className={contactClassName}>
        <a href={MAILTO} onClick={onNavigate}>
          {t.nav.getInTouch}
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export default function Header() {
  const { open, toggle, close, toggleRef } = useMobileMenu();
  const mobileMenuId = useId();
  const t = useMessages();

  const { url } = usePage();
  const currentPath = url.split(/[?#]/)[0];

  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-8">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label={t.nav.main} className="hidden items-center gap-8 md:flex">
            <NavigationLinks currentPath={currentPath} />
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Actions contactClassName="hidden lg:flex" />
          </div>

          {/* Mobile menu toggle. The label stays fixed; aria-expanded carries the state. */}
          <Button
            ref={toggleRef}
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={t.nav.menu}
            aria-controls={mobileMenuId}
            aria-expanded={open}
            onClick={toggle}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </Container>

      {/* Mobile navigation: only one of the two navs is exposed at a time, so they share a name. */}
      <nav
        id={mobileMenuId}
        aria-label={t.nav.main}
        hidden={!open}
        className="border-border bg-background border-t py-6 md:hidden"
      >
        <Container>
          <div className="flex flex-col gap-2">
            <NavigationLinks currentPath={currentPath} className="py-2" onNavigate={close} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Actions expanded onNavigate={close} />
          </div>
        </Container>
      </nav>
    </header>
  );
}
