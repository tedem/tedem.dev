import { useEffect, useState } from 'react';

/** How far below the top of the viewport a heading counts as "being read": under the sticky header. */
const READING_LINE = 160;

/**
 * Scrollspy for a table of contents: the id of the section being read, which is the last
 * one whose element has passed the reading line. With `lastAtBottom`, reaching the end of
 * the page marks the last section, since short final sections can never reach the line;
 * leave it off when other content (comments, say) follows the sections.
 */
export function useActiveSection(ids: readonly string[], { lastAtBottom = true } = {}) {
  const [active, setActive] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= READING_LINE) current = id;
      }
      if (lastAtBottom && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids, lastAtBottom]);

  return active;
}
