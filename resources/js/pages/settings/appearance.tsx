import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/admin/appearance-tabs';
import Heading from '@/components/admin/heading';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
  return (
    <>
      <Head title="Appearance settings" />

      <h1 className="sr-only">Appearance settings</h1>

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Appearance settings"
          description="Update the appearance settings for your account"
        />
        <AppearanceTabs />
      </div>
    </>
  );
}

Appearance.layout = {
  breadcrumbs: [
    {
      title: 'Appearance settings',
      href: editAppearance(),
    },
  ],
};
