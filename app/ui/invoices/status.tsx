import { CheckIcon, ClockIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'todo',
          'bg-blue-500 text-white': status === 'in-progress',
          'bg-green-500 text-white': status === 'completed',
          'bg-red-500 text-white': status === 'cancelled',
        },
      )}
    >
      {status === 'todo' ? (
        <>
          To Do
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'in-progress' ? (
        <>
          In Progress
          <PlayIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'cancelled' ? (
        <>
          Cancelled
          <XMarkIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
