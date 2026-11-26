import Container from '@/components/site/container';
import SectionHeader from '@/components/site/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Check, ChevronDown, Copy, Mail } from 'lucide-react';
import { useId, useState } from 'react';
import {
  AVAILABILITY,
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  EMAIL,
  MAILTO,
  MAILTO_WITH_SUBJECT,
  REPLY_TIME,
  SOCIALS,
  type SocialLink,
} from '@/content/profile';

import { useCopyToClipboard, type CopyStatus } from '@/hooks/use-copy-to-clipboard';

const VISIBLE_COUNT = 2;

const COPY_MESSAGES: Record<CopyStatus, string> = {
  idle: '',
  copied: 'Email address copied to clipboard',
  error: 'Could not copy the email address. Use the email link instead.',
};

const focusRing =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function AvailabilityStatus() {
  return (
    <p className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
      </span>
      {AVAILABILITY}
    </p>
  );
}

function EmailCard() {
  const { status, copy } = useCopyToClipboard();
  const copied = status === 'copied';

  return (
    <div className="border-border flex flex-col justify-between gap-8 p-8 max-md:border-b md:border-r">
      <div>
        <AvailabilityStatus />

        <a
          href={MAILTO}
          className={cn(
            'hover:text-primary mt-4 block text-xl font-medium tracking-tight break-all transition-colors sm:text-2xl',
            focusRing,
          )}
        >
          {EMAIL}
        </a>
        <p className="text-muted-foreground mt-2 text-sm">{REPLY_TIME}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <a href={MAILTO_WITH_SUBJECT}>
            <Mail aria-hidden="true" />
            Get in touch
          </a>
        </Button>
        <Button size="lg" variant="outline" type="button" onClick={() => copy(EMAIL)}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy email'}
        </Button>

        {/* Announces success or failure; the button label alone is not announced. */}
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {COPY_MESSAGES[status]}
        </span>
      </div>
    </div>
  );
}

function SocialItem({ href, label, handle, icon: Icon }: SocialLink) {
  return (
    <li className="border-border border-b first:border-t">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('group hover:text-primary flex items-center gap-4 py-4 transition-colors', focusRing)}
      >
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground ml-auto text-sm">{handle}</span>
        <span className="sr-only">(opens in a new tab)</span>
        <ArrowUpRight
          className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}

function SocialList() {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const headingId = useId();

  const visible = expanded ? SOCIALS : SOCIALS.slice(0, VISIBLE_COUNT);
  const hiddenCount = SOCIALS.length - VISIBLE_COUNT;

  return (
    <div className="p-8">
      <h3 id={headingId} className="text-muted-foreground font-mono text-xs font-normal">
        Elsewhere
      </h3>

      <ul className="mt-4" id={listId} aria-labelledby={headingId}>
        {visible.map((social) => (
          <SocialItem key={social.label} {...social} />
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={listId}
          className={cn(
            'border-border text-muted-foreground hover:text-primary flex w-full items-center gap-3 border-b py-4 text-left text-sm transition-colors',
            focusRing,
          )}
        >
          <span className="font-medium">{expanded ? 'Show less' : 'Show more'}</span>
          {!expanded && (
            <>
              <Badge variant="outline" aria-hidden="true">
                +{hiddenCount}
              </Badge>
              <span className="sr-only">
                ({hiddenCount} more {hiddenCount === 1 ? 'link' : 'links'})
              </span>
            </>
          )}
          <ChevronDown
            className={cn(
              'ml-auto size-4 shrink-0 transition-transform motion-reduce:transition-none',
              expanded && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <section className="border-border border-t" id="contact" aria-labelledby="contact-title">
      <Container border={true}>
        <div className="py-8 lg:py-16">
          <SectionHeader
            id="contact-title"
            path="contact"
            tagline="Good things start a conversation"
            title={CONTACT_TITLE}
            description={CONTACT_DESCRIPTION}
          />

          <div className="border-border bg-muted/30 mt-8 grid border md:mt-16 md:grid-cols-2">
            <EmailCard />
            <SocialList />
          </div>
        </div>
      </Container>
    </section>
  );
}
