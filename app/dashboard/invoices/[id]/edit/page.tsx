import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchMembers, fetchTaskById } from '@/app/lib/data';

 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [task, members] = await Promise.all([
    fetchTaskById(id),
    fetchMembers(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tasks', href: '/dashboard/invoices' },
          {
            label: 'Edit Task',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form task={task} members={members} />
    </main>
  );
}