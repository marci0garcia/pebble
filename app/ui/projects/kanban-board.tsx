'use client';

import { useState } from 'react';
import { Issue, User, Label, updateIssueInMockData, addIssueToMockData } from '@/app/lib/mock-data';
import { IssueCard } from './issue-card';
import { CreateIssueForm } from './create-issue-form';
import { IssueDetailModal } from './issue-detail-modal';
import { PlusIcon } from '@heroicons/react/24/outline';

interface KanbanBoardProps {
  projectId: string;
  projectKey: string;
}

export function KanbanBoard({ projectId, projectKey }: KanbanBoardProps) {
  // Import mock data
  const { mockIssues, mockUsers, mockLabels } = require('@/app/lib/mock-data');
  
  const [issues, setIssues] = useState<Issue[]>(
    mockIssues.filter((issue: Issue) => issue.projectId === projectId)
  );
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormStatus, setCreateFormStatus] = useState<string>('TODO');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleDragStart = (issue: Issue) => {
    setDraggedIssue(issue);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    if (!draggedIssue) return;

    // Update issue status in mock data (persistent)
    updateIssueInMockData(draggedIssue.id, { status: targetStatus as Issue['status'] });
    
    // Update local state
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === draggedIssue.id 
          ? { ...issue, status: targetStatus as Issue['status'] }
          : issue
      )
    );
    
    setDraggedIssue(null);
  };

  const handleCreateIssue = (newIssue: Omit<Issue, 'id' | 'key'>) => {
    const issueCount = issues.length + 1;
    const createdIssue: Issue = {
      ...newIssue,
      id: `${projectId}-${issueCount}`,
      key: `${projectKey}-${issueCount}`,
    };
    
    // Add to mock data (persistent)
    addIssueToMockData(createdIssue);
    
    // Update local state
    setIssues(prevIssues => [...prevIssues, createdIssue]);
    setShowCreateForm(false);
  };

  const handleUpdateIssue = (issueId: string, updates: Partial<Issue>) => {
    // Update in mock data (persistent)
    updateIssueInMockData(issueId, updates);
    
    // Update local state
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, ...updates }
          : issue
      )
    );
  };

  const columns = [
    {
      id: 'todo',
      title: 'TO DO',
      status: 'TODO' as const,
      issues: issues.filter((issue) => issue.status === 'TODO'),
    },
    {
      id: 'in-progress',
      title: 'IN PROGRESS',
      status: 'IN_PROGRESS' as const,
      issues: issues.filter((issue) => issue.status === 'IN_PROGRESS'),
    },
    {
      id: 'in-review',
      title: 'IN REVIEW',
      status: 'IN_REVIEW' as const,
      issues: issues.filter((issue) => issue.status === 'IN_REVIEW'),
    },
    {
      id: 'done',
      title: 'DONE',
      status: 'DONE' as const,
      issues: issues.filter((issue) => issue.status === 'DONE'),
    },
  ];

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex gap-6 min-w-max p-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                  {column.issues.length}
                </span>
              </div>
              <button 
                onClick={() => {
                  setCreateFormStatus(column.status);
                  setShowCreateForm(true);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Column Content */}
            <div className="bg-gray-50 rounded-lg p-3 min-h-[400px] space-y-3">
              {column.issues.map((issue) => (
                <div
                  key={issue.id}
                  draggable
                  onDragStart={() => handleDragStart(issue)}
                  className="cursor-move"
                >
                  <IssueCard 
                    issue={issue} 
                    onClick={() => setSelectedIssue(issue)}
                  />
                </div>
              ))}
              
              {/* Empty state */}
              {column.issues.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <div className="text-center">
                    {column.status === 'TODO' && (
                      <>
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">Get started in the backlog</p>
                        <p className="text-xs mt-1">Plan and start a sprint to see work here.</p>
                        <button 
                          onClick={() => {
                            setCreateFormStatus('TODO');
                            setShowCreateForm(true);
                          }}
                          className="mt-3 text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Go to Backlog
                        </button>
                      </>
                    )}
                    {column.status !== 'TODO' && (
                      <p className="text-sm">No issues in this column</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <CreateIssueForm 
          projectId={projectId}
          projectKey={projectKey}
          defaultStatus={createFormStatus}
          onClose={() => setShowCreateForm(false)}
          onCreateIssue={handleCreateIssue}
        />
      )}

      {selectedIssue && (
        <IssueDetailModal 
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onUpdateIssue={handleUpdateIssue}
        />
      )}
    </div>
  );
}
