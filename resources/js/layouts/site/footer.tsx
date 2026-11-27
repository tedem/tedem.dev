import Container from '@/components/site/container';
import { EMAIL, MAILTO, SOCIALS, WORDMARK } from '@/content/profile';
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { ArrowUp, ArrowUpRight, Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

type ThemeOption = {
  value: Appearance;
  label: string;
  icon: LucideIcon;
};

const THEMES: readonly ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const subheading = 'text-muted-foreground font-mono text-xs font-normal';

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* -------------------------------------------------------------------------- */
/* Parts                                                                      */
/* -------------------------------------------------------------------------- */

function Contact() {
  return (
    <section aria-labelledby="footer-contact-title">
      <h2 id="footer-contact-title" className={subheading}>
        <span aria-hidden="true">~/</span>say-hello
      </h2>

      <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-7 text-pretty">
        Open to new projects, questions and good ideas.
      </p>

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
  return (
    <section aria-labelledby="footer-social-title">
      <h2 id="footer-social-title" className={subheading}>
        <span aria-hidden="true">~/</span>elsewhere
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
              <span className="sr-only">(opens in a new tab)</span>
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

  return (
    <div role="group" aria-label="Theme" className="border-border inline-flex border">
      {THEMES.map(({ value, label, icon: Icon }) => {
        const selected = appearance === value;

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
  return (
    <footer className="border-border border-t">
      <Container border={true}>
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 md:gap-16 lg:py-16">
          <Contact />
          <Socials />
        </div>

        <div className="border-border text-muted-foreground flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm">
          {/* The year is computed in the browser, so a prerendered page never shows a stale one. */}
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> tedem. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ThemeSwitch />

            <a href="#" className={`hover:text-primary flex items-center gap-2 py-1 transition-colors ${focusRing}`}>
              Back to top
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Wordmark />
      </Container>
    </footer>
  );
}
