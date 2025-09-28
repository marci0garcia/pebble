import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTasks } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={task.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.name}'s profile picture`}
                      />
                      <p>{task.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{task.email}</p>
                  </div>
                  <InvoiceStatus status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm capitalize text-blue-600">Priority: {task.priority}</p>
                    <p className="text-sm text-gray-500">Created: {formatDateToLocal(task.created_at)}</p>
                    {task.due_date && (
                      <p className={`text-sm ${
                        new Date(task.due_date) < new Date() ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        Due: {formatDateToLocal(task.due_date)}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={task.id} />
                    <DeleteInvoice id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Assigned Member
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks?.map((task) => (
                <tr
                  key={task.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={task.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${task.name}'s profile picture`}
                      />
                      <p>{task.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.description?.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`capitalize px-2 py-1 text-xs rounded-full ${
                      task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {task.due_date ? (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        new Date(task.due_date) < new Date() ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {formatDateToLocal(task.due_date)}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No due date</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={task.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={task.id} />
                      <DeleteInvoice id={task.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
