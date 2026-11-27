/*
 * Copy for the posts listing, shared by the home page section and the /posts page,
 * plus the date format every post date on the site uses.
 */

export const POSTS_TITLE = 'Things I keep thinking about.';

export const POSTS_DESCRIPTION = 'A few short notes on making, noticing, and finding a clearer way through.';

export const EMPTY_TITLE = 'No posts found.';

export const EMPTY_DETAIL = 'They may be hiding, procrastinating, or stuck in draft purgatory.';

// UTC on both ends: "2026-11-26" is a calendar day, not an instant, and must not shift
// a day between the server render and the visitor's timezone.
const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2026-11-26" -> "26 Nov 2026". */
export function formatPostDate(day: string) {
  return DATE_FORMAT.format(new Date(`${day}T00:00:00Z`));
}
