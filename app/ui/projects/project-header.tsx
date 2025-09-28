'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  ChartBarIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  EllipsisHorizontalIcon,
  ShareIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    key: string;
    description?: string;
  };
}

const navigationTabs = [
  { name: 'Summary', href: 'summary', icon: ChartBarIcon },
  { name: 'Timeline', href: 'timeline', icon: CalendarIcon },
  { name: 'Backlog', href: 'backlog', icon: ClipboardDocumentListIcon },
  { name: 'Board', href: 'board', icon: Squares2X2Icon },
];

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop() || 'board';

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Project Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Project Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {project.key.charAt(0)}
              </div>
              
              {/* Project Name and Key */}
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {project.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {project.key} • Project
                </p>
              </div>
            </div>

            {/* Project Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <ShareIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              <ArrowsPointingOutIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6">
        <nav className="flex space-x-8">
          {navigationTabs.map((tab) => {
            const isActive = currentTab === tab.href;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.name}
                href={`/dashboard/projects/${project.key}/${tab.href}`}
                className={clsx(
                  'flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

    </div>
  );
}
