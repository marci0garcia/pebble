import { getProjectByKey, getIssuesByProject, mockUsers } from '@/app/lib/mock-data';
import { ProjectTabs } from '@/app/ui/projects/project-tabs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    key: string;
  }>;
}

export default async function SummaryPage({ params }: PageProps) {
  const { key } = await params;
  
  const project = getProjectByKey(key);
  
  if (!project) {
    notFound();
  }

  const projectIssues = getIssuesByProject(project.id);
  const todoCount = projectIssues.filter(issue => issue.status === 'TODO').length;
  const inProgressCount = projectIssues.filter(issue => issue.status === 'IN_PROGRESS').length;
  const inReviewCount = projectIssues.filter(issue => issue.status === 'IN_REVIEW').length;
  const doneCount = projectIssues.filter(issue => issue.status === 'DONE').length;
  
  const totalIssues = projectIssues.length;
  const completionRate = totalIssues > 0 ? Math.round((doneCount / totalIssues) * 100) : 0;

  return (
    <div>
      <ProjectTabs projectKey={key} />
      <div className="p-6">
        <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Summary</h2>
        <p className="text-gray-600">Overview of project progress and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{totalIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{doneCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{inProgressCount + inReviewCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">To Do</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{todoCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">In Progress</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{inProgressCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">In Review</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{inReviewCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Done</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{doneCount}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
          <div className="space-y-3">
            {projectIssues.slice(0, 5).map((issue) => {
              const assignee = mockUsers.find(user => user.id === issue.assigneeId);
              return (
                <div key={issue.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      issue.status === 'TODO' ? 'bg-blue-500' :
                      issue.status === 'IN_PROGRESS' ? 'bg-yellow-500' :
                      issue.status === 'IN_REVIEW' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{issue.key}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{issue.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{assignee?.name || 'Unassigned'}</p>
                    <p className="text-xs text-gray-400 capitalize">{issue.priority.toLowerCase()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}


