import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { mockIssues, mockUsers } from '@/app/lib/mock-data';

export default function LatestIssues() {
  // Get the latest 5 issues
  const latestIssues = mockIssues.slice(0, 5);
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Issues
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestIssues.map((issue, i) => {
            const assignee = mockUsers.find(user => user.id === issue.assigneeId);
            return (
              <div
                key={issue.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="mr-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {assignee?.name?.charAt(0) || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {issue.key}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {issue.title}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {issue.status}
                </p>
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
