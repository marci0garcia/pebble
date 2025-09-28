import { getProjectByKey, getIssuesByProject } from '@/app/lib/mock-data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    key: string;
  }>;
}

export default async function TimelinePage({ params }: PageProps) {
  const { key } = await params;
  
  const project = getProjectByKey(key);
  
  if (!project) {
    notFound();
  }

  const projectIssues = getIssuesByProject(project.id);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Timeline</h2>
        <p className="text-gray-600">Track project milestones and issue progression over time</p>
      </div>

      {/* Timeline View */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Progress</h3>
          <p className="text-sm text-gray-600">Visual representation of project timeline and milestones</p>
        </div>

        {/* Timeline Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Timeline View Coming Soon</h4>
          <p className="text-gray-600 mb-4">
            We're working on an interactive timeline view to help you track project milestones and deadlines.
          </p>
          <div className="text-sm text-gray-500">
            <p>Features in development:</p>
            <ul className="mt-2 space-y-1">
              <li>• Sprint planning and tracking</li>
              <li>• Milestone visualization</li>
              <li>• Deadline management</li>
              <li>• Progress analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current Sprint Overview */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Sprint Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {projectIssues.filter(issue => issue.status === 'TODO').length}
            </div>
            <p className="text-sm text-gray-600">Planned</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {projectIssues.filter(issue => issue.status === 'IN_PROGRESS' || issue.status === 'IN_REVIEW').length}
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {projectIssues.filter(issue => issue.status === 'DONE').length}
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
        
        <div className="space-y-3">
          {projectIssues.filter(issue => issue.status !== 'DONE').slice(0, 5).map((issue) => (
            <div key={issue.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  issue.priority === 'HIGHEST' ? 'bg-red-500' :
                  issue.priority === 'HIGH' ? 'bg-orange-500' :
                  issue.priority === 'MEDIUM' ? 'bg-yellow-500' :
                  issue.priority === 'LOW' ? 'bg-blue-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{issue.key}</p>
                  <p className="text-xs text-gray-500">{issue.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 capitalize">{issue.status.replace('_', ' ').toLowerCase()}</p>
                <p className="text-xs text-gray-400">No deadline set</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
