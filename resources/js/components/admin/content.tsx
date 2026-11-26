import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import type { AdminVariant } from '@/types';

type Props = React.ComponentProps<'main'> & {
  variant?: AdminVariant;
};

export function AdminContent({ variant = 'sidebar', children, ...props }: Props) {
  if (variant === 'sidebar') {
    return <SidebarInset {...props}>{children}</SidebarInset>;
  }

  return (
    <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
      {children}
    </main>
  );
}
