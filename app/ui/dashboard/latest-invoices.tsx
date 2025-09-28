import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana, audiowide } from '@/app/ui/fonts';
import { LatestTask } from '@/app/lib/definitions';
import { fetchLatestTasks } from '@/app/lib/data';

export default async function LatestTasks() {
    const latestTasks = await fetchLatestTasks();
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-8">
      <h2 className={`${audiowide.className} mb-4 text-xl md:text-2xl`}>
        Latest Tasks
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        

        <div className="bg-white px-6">
          {latestTasks.map((task, i) => {
            return (
              <div
                key={task.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={task.image_url}
                    alt={`${task.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {task.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {task.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                    {task.title}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
