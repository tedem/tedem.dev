import { AdminContent } from '@/components/admin/content';
import { AdminHeader } from '@/components/admin/header';
import { AdminShell } from '@/components/admin/shell';
import type { AdminLayoutProps } from '@/types';

export default function AdminHeaderLayout({ children, breadcrumbs }: AdminLayoutProps) {
  return (
    <AdminShell variant="header">
      <AdminHeader breadcrumbs={breadcrumbs} />
      <AdminContent variant="header">{children}</AdminContent>
    </AdminShell>
  );
}
