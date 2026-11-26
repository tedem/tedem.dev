import { AdminContent } from '@/components/admin/content';
import { AdminShell } from '@/components/admin/shell';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminSidebarHeader } from '@/components/admin/sidebar-header';
import type { AdminLayoutProps } from '@/types';

export default function AdminSidebarLayout({ children, breadcrumbs = [] }: AdminLayoutProps) {
  return (
    <AdminShell variant="sidebar">
      <AdminSidebar />
      <AdminContent variant="sidebar" className="min-w-0 overflow-x-clip">
        <AdminSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AdminContent>
    </AdminShell>
  );
}
