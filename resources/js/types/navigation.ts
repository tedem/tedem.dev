import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
  title: string;
  href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
  title: string;
  href: NonNullable<InertiaLinkProps['href']>;
  icon?: LucideIcon | null;
  isActive?: boolean;
  /** Also active on pages below `href` (e.g. /admin/posts/1/edit for /admin/posts). */
  matchPrefix?: boolean;
};
