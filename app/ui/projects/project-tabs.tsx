'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { 
  ViewColumnsIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  CalendarDaysIcon 
} from '@heroicons/react/24/outline';

interface ProjectTabsProps {
  projectKey: string;
}

const tabs = [
  { 
    name: 'Board', 
    href: 'board', 
    icon: ViewColumnsIcon,
    description: 'Kanban board view'
  },
  { 
    name: 'Backlog', 
    href: 'backlog', 
    icon: ClipboardDocumentListIcon,
    description: 'Issue backlog'
  },
  { 
    name: 'Timeline', 
    href: 'timeline', 
    icon: CalendarDaysIcon,
    description: 'Project timeline'
  },
  { 
    name: 'Summary', 
    href: 'summary', 
    icon: ChartBarIcon,
    description: 'Project overview'
  },
];

export function ProjectTabs({ projectKey }: ProjectTabsProps) {
  const pathname = usePathname();
  
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const href = `/dashboard/projects/${projectKey}/${tab.href}`;
            const isActive = pathname === href;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.name}
                href={href}
                className={clsx(
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
              >
                <Icon
                  className={clsx(
                    'mr-2 h-5 w-5 transition-colors',
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}