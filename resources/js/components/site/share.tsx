import { Bluesky, X } from '@/components/shared/icons/brands';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useMessages } from '@/i18n';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { Check, Link2, Linkedin, Mail, Share2 } from 'lucide-react';
import { type ComponentType, type SVGProps, useEffect, useState } from 'react';

/*
 * Sharing a post: plain links to each network's own share page, opened in a new tab.
 * No widgets or scripts from those networks load here, so nothing is sent to them
 * unless the reader clicks (the Privacy Policy promises no third-party trackers).
 * Plus "copy link", and the device's own share sheet where the browser has one.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type Target = {
  name: string;
  href: string;
  icon: Icon;
  /** Opens in a new tab; email opens the mail app instead. */
  external: boolean;
};

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** Hacker News has no icon set here; its mark is a "Y" in a square. */
function HackerNews({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 4.5 8 9l3-4.5M8 9v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** The post's absolute address, built from the app URL so server and browser agree. */
export function useShareUrl(path: string) {
  const { appUrl } = usePage().props;
  return new URL(path, appUrl).href;
}

function useTargets(title: string, url: string): Target[] {
  const t = useMessages();
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  return [
    { name: 'X', href: `https://x.com/intent/post?text=${text}&url=${u}`, icon: X, external: true },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: Linkedin,
      external: true,
    },
    {
      name: 'Bluesky',
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: Bluesky,
      external: true,
    },
    {
      name: 'Hacker News',
      href: `https://news.ycombinator.com/submitlink?u=${u}&t=${text}`,
      icon: HackerNews,
      external: true,
    },
    {
      name: t.posts.share.email,
      href: `mailto:?subject=${text}&body=${encodeURIComponent(t.posts.share.emailBody(title, url))}`,
      icon: Mail,
      external: false,
    },
  ];
}

/** Whether the browser has a native share sheet; known only after hydration. */
function useCanShare() {
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === 'function'), []);
  return canShare;
}

function CopyButton({ url, variant }: { url: string; variant: 'list' | 'icon' }) {
  const t = useMessages();
  const { status, copy } = useCopyToClipboard();
  const copied = status === 'copied';
  const label = copied ? t.posts.linkCopied : t.posts.copyLink;
  const Icon = copied ? Check : Link2;

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={() => copy(url)}
        aria-label={label}
        title={label}
        className={cn(iconButton, copied && 'border-foreground text-foreground')}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className="sr-only" aria-live="polite">
          {copied ? t.posts.linkCopied : ''}
        </span>
      </button>
    );
  }

  return (
    <button type="button" onClick={() => copy(url)} className={listItem}>
      <Icon className={cn('size-4 shrink-0', copied && 'text-emerald-600 dark:text-emerald-400')} aria-hidden="true" />
      <span aria-live="polite">{label}</span>
    </button>
  );
}

const listItem = cn(
  'group text-muted-foreground hover:text-foreground hover:bg-muted/50 -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 px-2 py-1.5 text-sm transition-colors',
  focusRing,
);

const iconButton = cn(
  'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 flex size-10 items-center justify-center border transition-colors',
  focusRing,
);

/** A labelled list, for the side rail on wide screens. */
export function ShareList({ title, url }: { title: string; url: string }) {
  const t = useMessages();
  const targets = useTargets(title, url);

  return (
    <section aria-labelledby="share-list-title">
      <h2 id="share-list-title" className="text-muted-foreground mb-3 font-mono text-xs">
        <span aria-hidden="true">~/</span>
        {t.posts.share.label.toLocaleLowerCase()}
      </h2>
      <ul className="flex flex-col">
        {targets.map(({ name, href, icon: Icon, external }) => (
          <li key={name}>
            <a
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={external ? `${t.posts.share.on(name)} ${t.common.opensInNewTab}` : undefined}
              className={listItem}
            >
              <Icon className="size-4 shrink-0" />
              {name}
            </a>
          </li>
        ))}
        <li>
          <CopyButton url={url} variant="list" />
        </li>
      </ul>
    </section>
  );
}

/** A row of icon buttons, for the end of the post on narrower screens. */
export function ShareBar({ title, url, className }: { title: string; url: string; className?: string }) {
  const t = useMessages();
  const targets = useTargets(title, url);
  const canShare = useCanShare();

  return (
    <section
      aria-labelledby="share-bar-title"
      className={cn('flex flex-wrap items-center justify-between gap-4', className)}
    >
      <h2 id="share-bar-title" className="text-muted-foreground font-mono text-xs">
        <span aria-hidden="true">~/</span>
        {t.posts.share.label.toLocaleLowerCase()}
      </h2>
      <ul className="flex flex-wrap gap-2">
        {canShare && (
          <li>
            <button
              type="button"
              onClick={() => navigator.share({ title, url }).catch(() => undefined)}
              className={cn(iconButton, 'w-auto gap-2 px-3 text-sm')}
            >
              <Share2 className="size-4" aria-hidden="true" />
              {t.posts.share.native}
            </button>
          </li>
        )}
        {targets.map(({ name, href, icon: Icon, external }) => {
          const label = external ? t.posts.share.on(name) : name;

          return (
            <li key={name}>
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                aria-label={external ? `${label} ${t.common.opensInNewTab}` : label}
                title={label}
                className={iconButton}
              >
                <Icon className="size-4" />
              </a>
            </li>
          );
        })}
        <li>
          <CopyButton url={url} variant="icon" />
        </li>
      </ul>
    </section>
  );
}
