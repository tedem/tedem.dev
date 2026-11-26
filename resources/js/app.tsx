import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AdminLayout from '@/layouts/admin/layout';
import SettingsLayout from '@/layouts/admin/settings-layout';
import AuthLayout from '@/layouts/auth/layout';
import SiteLayout from '@/layouts/site/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  // Pages are grouped by area (pages/site, pages/admin, pages/auth); the folder picks the layout.
  layout: (name) => {
    switch (true) {
      case name.startsWith('auth/'):
        return AuthLayout;
      case name.startsWith('admin/settings/'):
        return [AdminLayout, SettingsLayout];
      case name.startsWith('admin/'):
        return AdminLayout;
      default:
        return SiteLayout;
    }
  },
  strictMode: true,
  withApp(app) {
    return (
      <TooltipProvider delayDuration={0}>
        {app}
        <Toaster />
      </TooltipProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});

// This will set light / dark mode on load...
initializeTheme();
