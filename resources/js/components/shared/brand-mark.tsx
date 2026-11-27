import { cn } from '@/lib/utils';

/**
 * The "//." square of the logo, shared by the site header, the admin sidebar and the
 * auth pages so the brand looks the same everywhere. Decorative: the link around it
 * carries the name (WORDMARK in content/profile.ts). Size it with `className`.
 */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-accent-foreground text-accent flex shrink-0 items-center justify-center text-sm select-none',
        className,
      )}
    >
      //.
    </span>
  );
}
