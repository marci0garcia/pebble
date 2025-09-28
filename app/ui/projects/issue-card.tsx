'use client';

import { Issue, getUserById } from '@/app/lib/mock-data';
import { 
  BugAntIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showFullDetails?: boolean;
}

export function IssueCard({ issue, onClick, showFullDetails = false }: IssueCardProps) {
  const assignee = getUserById(issue.assigneeId || '');

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case 'BUG':
        return <BugAntIcon className="h-4 w-4 text-red-500" />;
      case 'TASK':
        return <DocumentTextIcon className="h-4 w-4 text-blue-500" />;
      case 'SUBTASK':
        return <CheckCircleIcon className="h-4 w-4 text-gray-500" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGHEST':
        return <ExclamationTriangleIcon className="h-3 w-3 text-red-500" />;
      case 'HIGH':
        return <ExclamationTriangleIcon className="h-3 w-3 text-orange-500" />;
      case 'MEDIUM':
        return <ClockIcon className="h-3 w-3 text-yellow-500" />;
      case 'LOW':
        return <ClockIcon className="h-3 w-3 text-blue-500" />;
      case 'LOWEST':
        return <ClockIcon className="h-3 w-3 text-gray-400" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGHEST':
        return 'border-l-red-500';
      case 'HIGH':
        return 'border-l-orange-500';
      case 'MEDIUM':
        return 'border-l-yellow-500';
      case 'LOW':
        return 'border-l-blue-500';
      case 'LOWEST':
        return 'border-l-gray-400';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={clsx(
        'bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4',
        getPriorityColor(issue.priority)
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {getIssueTypeIcon(issue.type)}
          <span className="text-sm font-medium text-gray-900 truncate">
            {issue.key}
          </span>
          {getPriorityIcon(issue.priority)}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
        {issue.title}
      </h4>

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {issue.labels.slice(0, 3).map((label) => (
            <span
              key={label.id}
              className="text-xs px-2 py-1 rounded text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className="text-xs text-gray-500">
              +{issue.labels.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Assignee Avatar */}
          {assignee ? (
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {assignee.name?.charAt(0) || '?'}
              </div>
            </div>
          ) : (
            <div className="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-xs">?</span>
            </div>
          )}
        </div>

        {/* Comments count - mock data for now */}
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
