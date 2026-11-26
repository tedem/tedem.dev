import { useFlashToast } from '@/hooks/use-flash-toast';
import AdminLayoutTemplate from '@/layouts/admin/sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AdminLayout({
  breadcrumbs = [],
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}) {
  // Shows the toasts controllers send with Inertia::flash('toast', ...), e.g. "Profile updated."
  // The layout persists across admin pages, so the listener is registered once.
  useFlashToast();

  return <AdminLayoutTemplate breadcrumbs={breadcrumbs}>{children}</AdminLayoutTemplate>;
}
