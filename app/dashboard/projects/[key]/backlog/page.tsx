'use client';

import React, { useState } from 'react';
import { getProjectByKey, getIssuesByProject, mockUsers, mockLabels, updateIssueInMockData } from '@/app/lib/mock-data';
import { notFound } from 'next/navigation';
import { CreateIssueForm } from '@/app/ui/projects/create-issue-form';
import { IssueDetailModal } from '@/app/ui/projects/issue-detail-modal';
import { IssueCard } from '@/app/ui/projects/issue-card';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface PageProps {
  params: Promise<{
    key: string;
  }>;
}

export default function BacklogPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ key: string } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Resolve params on client side
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return <div className="p-6">Loading...</div>;
  }

  const { key } = resolvedParams;
  const project = getProjectByKey(key);
  
  if (!project) {
    notFound();
  }

  const allProjectIssues = getIssuesByProject(project.id);
  
  // Filter issues based on selected filters
  const filteredIssues = allProjectIssues.filter(issue => {
    const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || issue.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Sort issues by priority and status
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    const priorityOrder = { 'HIGHEST': 5, 'HIGH': 4, 'MEDIUM': 3, 'LOW': 2, 'LOWEST': 1 };
    const statusOrder = { 'TODO': 1, 'IN_PROGRESS': 2, 'IN_REVIEW': 3, 'DONE': 4 };
    
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
    const aStatus = statusOrder[a.status as keyof typeof statusOrder];
    const bStatus = statusOrder[b.status as keyof typeof statusOrder];
    
    if (aPriority !== bPriority) return bPriority - aPriority;
    return aStatus - bStatus;
  });

  const handleUpdateIssue = (issueId: string, updates: any) => {
    updateIssueInMockData(issueId, updates);
    // Force re-render by updating state
    setSelectedIssue(null);
    setTimeout(() => {
      // This will trigger a re-render with updated data
    }, 100);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Backlog</h2>
          <p className="text-gray-600">Manage and prioritize project issues</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Create Issue
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priority</option>
            <option value="HIGHEST">Highest</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="LOWEST">Lowest</option>
          </select>

          <div className="text-sm text-gray-500">
            {sortedIssues.length} of {allProjectIssues.length} issues
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {sortedIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600 mb-6">
              {filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'Try adjusting your filters to see more issues.'
                : 'Get started by creating your first issue.'
              }
            </p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Create Issue
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedIssues.map((issue) => (
              <div key={issue.id} className="p-4 hover:bg-gray-50">
                <IssueCard 
                  issue={issue} 
                  onClick={() => setSelectedIssue(issue)}
                  showFullDetails={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Issue Modal */}
      {showCreateForm && (
        <CreateIssueForm 
          projectId={project.id}
          projectKey={project.key}
          defaultStatus="TODO"
          onClose={() => setShowCreateForm(false)}
          onCreateIssue={() => {
            setShowCreateForm(false);
            // Force re-render to show new issue
            window.location.reload();
          }}
        />
      )}

      {/* Issue Detail Modal */}
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
