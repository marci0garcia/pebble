import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchMembers } from '@/app/lib/data';
 
export default async function Page() {
  const members = await fetchMembers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/invoices' },
          {
            label: 'Create Task',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form members={members} />
    </main>
  );
}