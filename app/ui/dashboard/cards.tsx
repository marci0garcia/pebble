import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  completed: CheckCircleIcon,
  members: UserGroupIcon,
  inProgress: PlayIcon,
  tasks: InboxIcon,
  todo: ClockIcon,
};

export default async function CardWrapper() {

  const {
    numberOfTasks,
    numberOfMembers,
    todoTasks,
    inProgressTasks,
    completedTasks,
    cancelledTasks,
  } = await fetchCardData();
  
  return (
    <>
      {/* Task tracking dashboard cards */}

      <Card title="Completed Tasks" value={completedTasks} type="completed" />
      <Card title="In Progress" value={inProgressTasks} type="inProgress" />
      <Card title="Total Tasks" value={numberOfTasks} type="tasks" />
      <Card
        title="Team Members"
        value={numberOfMembers}
        type="members"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'tasks' | 'members' | 'inProgress' | 'completed' | 'todo';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
