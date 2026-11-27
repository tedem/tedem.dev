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
  label: string;
  items: readonly string[];
};

export type SocialLink = {
  href: string;
  label: string;
  handle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// TODO: replace the placeholder content below with your own.
export const LEAD = 'I build web products end to end, from the database and API to the interface people actually use.';

export const BODY =
  'I care about accessibility, performance and maintainable code, and I like owning a feature from the first idea to production.';

/** The name next to the logo mark: site header, footer, admin sidebar. */
export const WORDMARK = 'tedem';

/** First name, as the hero greets visitors ("Hi, I'm Medet.") and as search engines see the site's author. */
export const NAME = 'Medet';

/** Short summary of the about section and the /about page. */
export const ABOUT_DESCRIPTION = 'Who I am, what I do and the tools I reach for.';

export const ROLE = 'Full stack developer';
export const LOCATION = 'İstanbul, Turkey';
export const FOCUS = 'End-to-end products';

// Experience grows by itself: enter the year you started (month is 0-based, so 0 = January).
export const CAREER_START = new Date(2012, 0, 1);

export const FOCUS_AREAS: readonly Fact[] = [
  { label: 'Frontend', value: 'Accessible, fast interfaces with React and Next.js.' },
  { label: 'Backend', value: 'APIs and data models with Node.js, PHP and Laravel.' },
  { label: 'Mobile', value: 'Native iOS apps with Swift and SwiftUI.' },
];

export const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Find the real question.',
    detail: 'Listen closely, make sense of the moving parts, and agree on what matters before making anything.',
  },
  {
    title: 'Make it feel inevitable.',
    detail: 'Give the idea a clear shape through considered design, useful technology, and a little restraint.',
  },
  {
    title: 'Refine until it feels right.',
    detail: 'Fine-tune interactions, remove friction, and give the final details the attention they deserve.',
  },
];

export const STACK_GROUPS: readonly StackGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Swift'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Laravel', 'SwiftUI', 'Tailwind CSS'] },
  { label: 'Platform & data', items: ['Node.js', 'PostgreSQL', 'MySQL', 'Redis'] },
  { label: 'Tooling', items: ['Docker', 'Git'] },
];

/** Every stack item as one flat list (the home page marquee). */
export const STACK: readonly string[] = STACK_GROUPS.flatMap((group) => group.items);

export const EMAIL = 'hello@tedem.dev';
export const MAILTO = `mailto:${EMAIL}`;
export const MAILTO_WITH_SUBJECT = `${MAILTO}?subject=${encodeURIComponent('Project inquiry')}`;

export const CONTACT_TITLE = 'Have a good one in mind?';
export const CONTACT_DESCRIPTION = "Let's talk about your project and see if we're a good fit for each other.";
export const AVAILABILITY = 'Available for new projects';
export const REPLY_TIME = 'I usually reply within 24 hours.';

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
