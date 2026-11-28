import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useMessages } from '@/i18n';
import {
  acceptAll,
  type ConsentCategory,
  type ConsentChoices,
  OPTIONAL_CATEGORIES,
  rejectAll,
  saveConsent,
  setCookieSettingsOpen,
  useCookieConsent,
} from '@/lib/cookie-consent';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { Cookie, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { useId, useState } from 'react';

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

type Category = ConsentCategory | 'necessary';

/** The cookies behind each category, shown so the visitor can check them in the browser. */
const COOKIES: Record<Category, readonly string[]> = {
  necessary: ['session', 'XSRF-TOKEN', 'cookie_consent'],
  preferences: ['appearance'],
};

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const buttonBase = cn(
  'inline-flex h-9 items-center justify-center gap-2 border px-3.5 text-sm font-medium whitespace-nowrap transition-colors',
  'motion-safe:active:translate-y-px',
  focusRing,
);

const buttons = {
  primary: cn(buttonBase, 'border-foreground bg-foreground text-background hover:bg-foreground/85'),
  secondary: cn(buttonBase, 'border-border bg-background text-foreground hover:bg-muted'),
  ghost: cn(buttonBase, 'text-muted-foreground hover:text-foreground border-transparent px-2'),
};

/* -------------------------------------------------------------------------- */
/* Parts                                                                      */
/* -------------------------------------------------------------------------- */

function Heading({ id, className }: { id?: string; className?: string }) {
  const t = useMessages();

  return (
    <p id={id} className={cn('text-muted-foreground flex items-center gap-2 font-mono text-xs', className)}>
      <Cookie className="size-3.5" aria-hidden="true" />
      <span>
        <span aria-hidden="true">~/</span>
        {t.cookies.path}
      </span>
    </p>
  );
}

/** "No tracking" status line, styled like a terminal status light. */
function TrackingStatus() {
  const t = useMessages();

  return (
    <p className="text-muted-foreground flex items-center gap-2 font-mono text-[0.6875rem] tracking-wide uppercase">
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full bg-emerald-500/60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 bg-emerald-500" />
      </span>
      {t.cookies.noTracking}
    </p>
  );
}

/**
 * Square on/off switch matching the site's zero-radius style. Radix gives it
 * role="switch" and aria-checked; the state is also written next to it.
 */
function Switch({
  checked,
  disabled,
  onCheckedChange,
  labelledBy,
  describedBy,
}: {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  labelledBy: string;
  describedBy: string;
}) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cn(
        'group border-border bg-muted relative inline-flex h-6 w-11 shrink-0 items-center border p-0.5 transition-colors',
        'data-[state=checked]:border-foreground data-[state=checked]:bg-foreground',
        'disabled:cursor-not-allowed disabled:opacity-60',
        focusRing,
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'bg-background block size-4 shadow-sm transition-transform duration-200 ease-out',
          'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
          'group-data-[state=unchecked]:bg-muted-foreground/70',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

function CategoryRow({
  category,
  checked,
  onCheckedChange,
}: {
  category: Category;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const t = useMessages();
  const id = useId();
  const locked = category === 'necessary';
  const copy = t.cookies.categories[category];

  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 id={`${id}-title`} className="text-foreground font-medium">
            {copy.title}
          </h3>
          {locked && (
            <span className="text-muted-foreground border-border inline-flex items-center gap-1 border px-1.5 py-0.5 font-mono text-[0.625rem] tracking-wide uppercase">
              <ShieldCheck className="size-3" aria-hidden="true" />
              {t.cookies.alwaysOn}
            </span>
          )}
        </div>

        <p id={`${id}-text`} className="text-muted-foreground mt-1.5 text-sm leading-6 text-pretty">
          {copy.text}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {COOKIES[category].map((name) => (
            <li key={name} className="bg-muted text-muted-foreground px-1.5 py-0.5 font-mono text-[0.6875rem]">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-end gap-1.5 pt-0.5">
        <Switch
          checked={locked || checked}
          disabled={locked}
          onCheckedChange={onCheckedChange}
          labelledBy={`${id}-title`}
          describedBy={`${id}-text`}
        />
        <span className="text-muted-foreground font-mono text-[0.625rem] tracking-wide uppercase" aria-hidden="true">
          {locked || checked ? t.cookies.on : t.cookies.off}
        </span>
      </div>
    </li>
  );
}

/**
 * Settings dialog. Its draft starts from the saved choice each time it opens
 * (the parent remounts it with a new key), and nothing is stored until a button is pressed.
 */
function SettingsDialog({ open, saved }: { open: boolean; saved: ConsentChoices | null }) {
  const t = useMessages();
  const [draft, setDraft] = useState<ConsentChoices>(
    () => saved ?? (Object.fromEntries(OPTIONAL_CATEGORIES.map((category) => [category, false])) as ConsentChoices),
  );

  return (
    <Dialog open={open} onOpenChange={setCookieSettingsOpen}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <div className="border-border border-b p-6">
          <Heading />
          <DialogTitle className="mt-3 text-xl font-semibold tracking-tight">{t.cookies.settingsTitle}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
            {t.cookies.settingsText}
          </DialogDescription>
        </div>

        <ul className="divide-border divide-y p-6">
          <CategoryRow category="necessary" checked />
          {OPTIONAL_CATEGORIES.map((category) => (
            <CategoryRow
              key={category}
              category={category}
              checked={draft[category]}
              onCheckedChange={(checked) => setDraft((current) => ({ ...current, [category]: checked }))}
            />
          ))}
        </ul>

        <div className="border-border bg-muted/40 flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:items-center">
          <button type="button" className={cn(buttons.ghost, 'sm:mr-auto')} onClick={rejectAll}>
            {t.cookies.rejectAll}
          </button>
          <button type="button" className={buttons.secondary} onClick={() => saveConsent(draft)}>
            {t.cookies.save}
          </button>
          <button type="button" className={buttons.primary} onClick={acceptAll}>
            {t.cookies.acceptAll}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * First-visit banner. Not modal: the page stays usable behind it, and it is a
 * labelled region so screen reader users can find it. Accept and reject sit side by side
 * at the same size; neither choice is hidden behind another step.
 */
function Banner() {
  const t = useMessages();
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[26rem]',
        'border-border bg-background/95 supports-backdrop-filter:bg-background/80 border shadow-2xl shadow-black/10 backdrop-blur-md dark:shadow-black/40',
        'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:ease-out',
      )}
    >
      {/* Hairline accent along the top edge. */}
      <div
        aria-hidden="true"
        className="via-foreground/40 absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent to-transparent"
      />

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <Heading />
          <TrackingStatus />
        </div>

        <h2 id={titleId} className="mt-4 text-lg font-semibold tracking-tight text-balance">
          {t.cookies.title}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">{t.cookies.text}</p>

        <button
          type="button"
          onClick={() => setCookieSettingsOpen(true)}
          className={cn(
            'group text-foreground decoration-border hover:decoration-foreground mt-3 inline-flex items-center gap-2 font-mono text-xs underline underline-offset-4 transition-colors',
            focusRing,
          )}
        >
          <SlidersHorizontal
            className="text-muted-foreground group-hover:text-foreground size-3.5 transition-colors"
            aria-hidden="true"
          />
          {t.cookies.customize}
        </button>
      </div>

      {/* Equal width and weight: neither answer is nudged. */}
      <div className="border-border grid grid-cols-2 gap-2 border-t px-5 py-4">
        <button type="button" className={buttons.secondary} onClick={rejectAll}>
          {t.cookies.rejectAll}
        </button>
        <button type="button" className={buttons.primary} onClick={acceptAll}>
          {t.cookies.acceptAll}
        </button>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cookie consent                                                             */
/* -------------------------------------------------------------------------- */

export default function CookieConsent() {
  const { cookieConsent } = usePage().props;
  const { choices, decided, settingsOpen } = useCookieConsent(cookieConsent);
  // A new key each time the dialog opens resets its draft to the saved choice.
  const [openCount, setOpenCount] = useState(0);
  const [wasOpen, setWasOpen] = useState(settingsOpen);

  if (settingsOpen !== wasOpen) {
    setWasOpen(settingsOpen);
    if (settingsOpen) setOpenCount((count) => count + 1);
  }

  return (
    <>
      {!decided && !settingsOpen && <Banner />}
      <SettingsDialog key={openCount} open={settingsOpen} saved={choices} />
    </>
  );
}
