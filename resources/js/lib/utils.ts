import type { InertiaLinkProps } from '@inertiajs/react';

// Single class-merging implementation, shared with the shadcn/ui components.
export { cn } from 'cn';

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
  return typeof url === 'string' ? url : url.url;
}
