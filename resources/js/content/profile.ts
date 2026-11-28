import { Bluesky, GitHub, Instagram, X } from '@/components/shared/icons/brands';
import type { ComponentType, SVGProps } from 'react';

/*
 * Who I am, in one place. The home page sections and the /about page both read from here,
 * so a change to the bio, stack or links shows up everywhere at once.
 */

export type Fact = {
  label: string;
  value: string;
};

export type Principle = {
  title: string;
  detail: string;
};

export type StackGroup = {
  key: 'languages' | 'frameworks' | 'platform' | 'tooling';
  items: readonly string[];
};

export type SocialLink = {
  href: string;
  label: string;
  handle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Copy (bio, role, focus areas, principles, contact lines) lives in i18n/messages, per language.

/** The name next to the logo mark: site header, footer, admin sidebar. */
export const WORDMARK = 'tedem';

/** First name, as the hero greets visitors ("Hi, I'm Medet.") and as search engines see the site's author. */
export const NAME = 'Medet';

/** Full legal name: the data controller in the Privacy Policy and the party in the Terms of Service. */
export const LEGAL_NAME = 'Medet Erdal';

// Experience grows by itself: enter the year you started (month is 0-based, so 0 = January).
export const CAREER_START = new Date(2012, 0, 1);

/** Group labels are translated: see `profile.stackGroups` in i18n/messages. */
export const STACK_GROUPS: readonly StackGroup[] = [
  { key: 'languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Swift'] },
  { key: 'frameworks', items: ['React', 'Next.js', 'Laravel', 'SwiftUI', 'Tailwind CSS'] },
  { key: 'platform', items: ['Node.js', 'PostgreSQL', 'MySQL', 'Redis'] },
  { key: 'tooling', items: ['Docker', 'Git'] },
];

/** Every stack item as one flat list (the home page marquee). */
export const STACK: readonly string[] = STACK_GROUPS.flatMap((group) => group.items);

export const EMAIL = 'hello@tedem.dev';
export const MAILTO = `mailto:${EMAIL}`;

/** A mailto: link with the subject line filled in ("Project inquiry", in the page's language). */
export const mailtoWithSubject = (subject: string) => `${MAILTO}?subject=${encodeURIComponent(subject)}`;

// TODO: set your usual working hours (24h clock, owner's timezone, end is exclusive).
export const WORKING_HOURS = { start: 9, end: 18 } as const;

/** True during working hours on a weekday, in the owner's timezone. */
export function isAtDesk(hour: number, isWeekend: boolean) {
  return !isWeekend && hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end;
}

/** 9 -> "09:00". */
export const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

export const SOCIALS: readonly SocialLink[] = [
  { href: 'https://github.com/tedem', label: 'GitHub', handle: 'tedem', icon: GitHub },
  { href: 'https://x.com/tedemedet', label: 'X', handle: 'tedemedet', icon: X },
  { href: 'https://instagram.com/tedemedet', label: 'Instagram', handle: 'tedemedet', icon: Instagram },
  { href: 'https://bsky.app/profile/tedem.dev', label: 'Bluesky', handle: 'tedem.dev', icon: Bluesky },
];

/** Whole years between `start` and `now` (the year only counts after the anniversary). */
export function yearsSince(start: Date, now: Date) {
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return Math.max(0, years);
}
