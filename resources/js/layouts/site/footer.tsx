import Container from '@/components/site/container';
import { EMAIL, MAILTO, SOCIALS, WORDMARK } from '@/content/profile';
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { useMessages, useRoutes } from '@/i18n';
import { useLegalDocument } from '@/i18n/legal';
import { Link } from '@inertiajs/react';
import { openCookieSettings } from '@/lib/cookie-consent';
import { ArrowUp, ArrowUpRight, Cookie, Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

type ThemeOption = {
  value: Appearance;
  icon: LucideIcon;
};

const THEMES: readonly ThemeOption[] = [
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
  { value: 'system', icon: Monitor },
];

const subheading = 'text-muted-foreground font-mono text-xs font-normal';

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* -------------------------------------------------------------------------- */
/* Parts                                                                      */
/* -------------------------------------------------------------------------- */

function Contact() {
  const t = useMessages();

  return (
    <section aria-labelledby="footer-contact-title">
      <h2 id="footer-contact-title" className={subheading}>
        <span aria-hidden="true">~/</span>
        {t.footer.sayHello}
      </h2>

      <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-7 text-pretty">{t.footer.sayHelloText}</p>

      <a
        href={MAILTO}
        className={`hover:text-primary mt-4 inline-block text-xl font-medium tracking-tight break-all transition-colors sm:text-2xl ${focusRing}`}
      >
        {EMAIL}
      </a>
    </section>
  );
}

function Socials() {
  const t = useMessages();

  return (
    <section aria-labelledby="footer-social-title">
      <h2 id="footer-social-title" className={subheading}>
        <span aria-hidden="true">~/</span>
        {t.footer.elsewhere}
      </h2>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {SOCIALS.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group hover:text-primary flex items-center gap-2 py-1 transition-colors ${focusRing}`}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="font-medium">{label}</span>
              <span className="sr-only">{t.common.opensInNewTab}</span>
              <ArrowUpRight
                className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Light / dark / system picker. Reuses the starter kit's useAppearance hook, so
 * the choice is stored and applied the same way as everywhere else in the app.
 * Icon-only buttons: each has a name (aria-label) and a tooltip (title), and the
 * selected one is exposed with aria-pressed, not just a different background.
 */
function ThemeSwitch() {
  const { appearance, updateAppearance } = useAppearance();
  const t = useMessages();

  return (
    <div role="group" aria-label={t.footer.theme.label} className="border-border inline-flex border">
      {THEMES.map(({ value, icon: Icon }) => {
        const selected = appearance === value;
        const label = t.footer.theme[value];

        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={selected}
            title={label}
            onClick={() => updateAppearance(value)}
            className={`flex size-8 items-center justify-center transition-colors ${focusRing} ${
              selected ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Oversized wordmark. Purely decorative: hidden from assistive tech, not
 * selectable, ignores the pointer, and fades out towards the bottom.
 * The size follows the width of its own box (cqw), so it spans the container
 * on any screen.
 * The colour is solid on purpose: a semi-transparent colour (e.g. text-foreground/10)
 * gets darker wherever two letters touch. Default letter spacing keeps them apart.
 */
function Wordmark() {
  return (
    <div aria-hidden="true" className="@container pointer-events-none overflow-hidden select-none">
      <p className="text-muted mask-[linear-gradient(to_bottom,black_35%,transparent)] text-center text-[clamp(6rem,30cqw,40rem)] leading-none font-extrabold whitespace-nowrap">
        {WORDMARK}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const t = useMessages();
  const routes = useRoutes();
  const terms = useLegalDocument('terms');
  const privacy = useLegalDocument('privacy');

  return (
    <footer className="border-border border-t">
      <Container border={true}>
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 md:gap-16 lg:py-16">
          <Contact />
          <Socials />
        </div>

        <div className="border-border text-muted-foreground flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm">
          {/* The year is computed in the browser, so a prerendered page never shows a stale one. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {WORDMARK}. {t.footer.rights}
            </p>

            <nav aria-label={t.footer.legal}>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <li>
                  <Link
                    href={routes.privacy().url}
                    className={`hover:text-primary py-1 transition-colors ${focusRing}`}
                  >
                    {privacy.title}
                  </Link>
                </li>
                <li>
                  <Link href={routes.terms().url} className={`hover:text-primary py-1 transition-colors ${focusRing}`}>
                    {terms.title}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ThemeSwitch />

            <button
              type="button"
              onClick={openCookieSettings}
              className={`hover:text-primary flex items-center gap-2 py-1 transition-colors ${focusRing}`}
            >
              <Cookie className="size-4" aria-hidden="true" />
              {t.footer.cookieSettings}
            </button>

            <a href="#" className={`hover:text-primary flex items-center gap-2 py-1 transition-colors ${focusRing}`}>
              {t.footer.backToTop}
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Wordmark />
      </Container>
    </footer>
  );
}
