'use client';

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { mockProjects, mockIssues, mockUsers } from '@/app/lib/mock-data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper() {
  // Calculate mock data stats
  const totalProjects = mockProjects.length;
  const totalIssues = mockIssues.length;
  const completedIssues = mockIssues.filter(issue => issue.status === 'DONE').length;
  const pendingIssues = mockIssues.filter(issue => issue.status === 'TODO' || issue.status === 'IN_PROGRESS' || issue.status === 'IN_REVIEW').length;
  
  return (
    <>
      <Card title="Completed Issues" value={completedIssues} type="collected" />
      <Card title="Pending Issues" value={pendingIssues} type="pending" />
      <Card title="Total Issues" value={totalIssues} type="invoices" />
      <Card
        title="Total Projects"
        value={totalProjects}
        type="customers"
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
  type: 'invoices' | 'customers' | 'pending' | 'collected';
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
