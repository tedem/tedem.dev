import type { ReactNode } from 'react';

type SectionHeaderProps = {
  /** Id of the <h2>. The parent <section> points at it with aria-labelledby. */
  id: string;
  /** Mono path above the title, without the "~/" prefix (e.g. "approach"). */
  path: string;
  /** Short line next to the path. */
  tagline: string;
  title: ReactNode;
  description: ReactNode;
};

/**
 * The eyebrow + title + description block every section opens with.
 * Renders its own two-column grid, so the section body goes right after it.
 */
export default function SectionHeader({ id, path, tagline, title, description }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 md:gap-x-16">
      <p className="text-primary mb-4 flex items-center gap-4 font-mono text-xs md:col-span-2">
        {/* The path is decoration; the heading below already names the section. */}
        <span aria-hidden="true">~/{path}</span>
        <span className="text-muted-foreground uppercase">{tagline}</span>
      </p>

      <h2
        id={id}
        className="max-w-120 text-[clamp(2.625rem,6vw,4.375rem)] leading-none font-medium tracking-[-0.075em]"
      >
        {title}
      </h2>

      <div className="justify-end max-md:mt-8 md:flex md:items-end">
        <p className="text-muted-foreground text-sm leading-7 text-pretty md:max-w-2xs">{description}</p>
      </div>
    </div>
  );
}
