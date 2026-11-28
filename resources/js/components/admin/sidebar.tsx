import { Link, usePage } from '@inertiajs/react';
import { FileText, Globe, LayoutGrid, MessageSquare } from 'lucide-react';
import AppLogo from '@/components/admin/logo';
import { NavFooter } from '@/components/admin/nav-footer';
import { NavMain } from '@/components/admin/nav-main';
import { NavUser } from '@/components/admin/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { dashboard } from '@/routes/admin';
import { index as commentsIndex } from '@/routes/admin/comments';
import { index as postsIndex } from '@/routes/admin/posts';
import type { NavItem } from '@/types';

const dashboardItem: NavItem = { title: 'Dashboard', href: dashboard(), icon: LayoutGrid };

// Only admins see it; the routes are behind the same `manage-posts` gate.
const postsItem: NavItem = { title: 'Posts', href: postsIndex(), icon: FileText, matchPrefix: true };

const commentsItem: NavItem = { title: 'Comments', href: commentsIndex(), icon: MessageSquare, matchPrefix: true };

// Opens in a new tab (see NavFooter), so the admin area stays open.
const footerNavItems: NavItem[] = [
  {
    title: 'View site',
    href: home(),
    icon: Globe,
  },
];

export function AdminSidebar() {
  const { auth } = usePage().props;
  const mainNavItems = auth.user.is_admin ? [dashboardItem, postsItem, commentsItem] : [dashboardItem];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
