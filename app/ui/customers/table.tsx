import Image from 'next/image';
import { audiowide, lusitana } from '@/app/ui/fonts';
import { fetchFilteredMembers } from '@/app/lib/data';
import {
  MembersTableType,
  FormattedMembersTable,
} from '@/app/lib/definitions';


export default async function MembersTable({
  query,
}: {
  query: string;
}) {
  const members = await fetchFilteredMembers(query);

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {members?.map((member) => (
                <div
                  key={member.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <Image
                            src={member.image_url}
                            className="rounded-full"
                            alt={`${member.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{member.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-b py-5">
                    <div className="flex flex-col">
                      <p className="text-xs">To Do</p>
                      <p className="font-medium">{member.total_todo}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">In Progress</p>
                      <p className="font-medium">{member.total_in_progress}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Completed</p>
                      <p className="font-medium">{member.total_completed}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Cancelled</p>
                      <p className="font-medium">{member.total_cancelled}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{member.total_tasks} tasks assigned</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Tasks
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    In Progress
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Completed
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {members.map((member) => (
                  <tr key={member.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={member.image_url}
                          className="rounded-full"
                          alt={`${member.name}'s profile picture`}
                          width={28}
                          height={28}
                        />
                        <p>{member.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {member.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {member.total_tasks}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {member.total_in_progress}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {member.total_completed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}