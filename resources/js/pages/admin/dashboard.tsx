import Heading from '@/components/admin/heading';
import { dashboard } from '@/routes/admin';
import { edit as editAppearance } from '@/routes/admin/appearance';
import { edit as editProfile } from '@/routes/admin/profile';
import { edit as editSecurity } from '@/routes/admin/security';
import { Head, Link, usePage } from '@inertiajs/react';
import { KeyRound, Palette, UserRound } from 'lucide-react';

/** The admin home: a greeting and shortcuts to the settings pages. */
const SHORTCUTS = [
  { title: 'Profile', description: 'Name and email address', href: editProfile(), icon: UserRound },
  { title: 'Security', description: 'Password, two-factor and passkeys', href: editSecurity(), icon: KeyRound },
  { title: 'Appearance', description: 'Light, dark or system theme', href: editAppearance(), icon: Palette },
] as const;

export default function Dashboard() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex flex-1 flex-col p-4">
        <h1 className="sr-only">Dashboard</h1>

        <Heading title={`Welcome back, ${auth.user.name}`} description="Manage your account settings." />

        <ul className="grid gap-4 md:grid-cols-3">
          {SHORTCUTS.map(({ title, description, href, icon: Icon }) => (
            <li key={title}>
              <Link
                href={href}
                className="border-sidebar-border/70 dark:border-sidebar-border hover:bg-muted/50 focus-visible:ring-ring flex h-full flex-col gap-3 rounded-xl border p-5 transition-colors outline-none focus-visible:ring-2"
              >
                <Icon className="text-muted-foreground size-5" aria-hidden="true" />
                <span className="font-medium">{title}</span>
                <span className="text-muted-foreground text-sm">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

Dashboard.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: dashboard(),
    },
  ],
};
