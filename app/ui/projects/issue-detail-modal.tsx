'use client';

import { useState } from 'react';
import { Issue, mockUsers, mockLabels } from '@/app/lib/mock-data';
import { Button } from '@/app/ui/button';
import { 
  BugAntIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface IssueDetailModalProps {
  issue: Issue;
  onClose: () => void;
  onUpdateIssue: (issueId: string, updates: Partial<Issue>) => void;
}

export function IssueDetailModal({ issue, onClose, onUpdateIssue }: IssueDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: issue.title,
    description: issue.description || '',
    type: issue.type,
    priority: issue.priority,
    status: issue.status,
    assigneeId: issue.assigneeId || '',
  });

  const assignee = mockUsers.find(user => user.id === issue.assigneeId);

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case 'BUG':
        return <BugAntIcon className="h-5 w-5 text-red-500" />;
      case 'TASK':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'SUBTASK':
        return <CheckCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGHEST':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      case 'HIGH':
        return <ExclamationTriangleIcon className="h-4 w-4 text-orange-500" />;
      case 'MEDIUM':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'LOW':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case 'LOWEST':
        return <ClockIcon className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleSave = () => {
    onUpdateIssue(issue.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: issue.title,
      description: issue.description || '',
      type: issue.type,
      priority: issue.priority,
      status: issue.status,
      assigneeId: issue.assigneeId || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {getIssueTypeIcon(issue.type)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{issue.key}</h2>
              <p className="text-sm text-gray-500">Issue Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <h3 className="text-lg font-medium text-gray-900">{issue.title}</h3>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            ) : (
              <p className="text-gray-600">{issue.description || 'No description provided'}</p>
            )}
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Issue['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TODO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="IN_REVIEW">IN REVIEW</option>
                  <option value="DONE">DONE</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    issue.status === 'TODO' ? 'bg-gray-100 text-gray-800' :
                    issue.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                    issue.status === 'IN_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.status.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Issue['priority'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="LOWEST">Lowest</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="HIGHEST">Highest</option>
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  {getPriorityIcon(issue.priority)}
                  <span className="capitalize">{issue.priority.toLowerCase()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Type and Assignee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              {isEditing ? (
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Issue['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TASK">Task</option>
                  <option value="BUG">Bug</option>
                  <option value="SUBTASK">Subtask</option>
                </select>
              ) : (
                <span className="capitalize">{issue.type.toLowerCase()}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignee
              </label>
              {isEditing ? (
                <select
                  value={formData.assigneeId}
                  onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Unassigned</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  {assignee ? (
                    <>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {assignee.name?.charAt(0) || '?'}
                      </div>
                      <span>{assignee.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-500">Unassigned</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Labels
            </label>
            <div className="flex flex-wrap gap-2">
              {issue.labels.map(label => (
                <span
                  key={label.id}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <Button
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <button
                onClick={handleSave}
                className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-600"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={onClose}
              >
                Close
              </Button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
              >
                Edit Issue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


