import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AdminLayout from '@/layouts/admin-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import MainLayout from '@/layouts/main-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  layout: (name) => {
    switch (true) {
      case name === 'welcome':
        return null;
      case name.startsWith('auth/'):
        return AuthLayout;
      case name.startsWith('settings/'):
        return [AdminLayout, SettingsLayout];
      case name === 'dashboard':
        return AdminLayout;
      default:
        return MainLayout;
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
