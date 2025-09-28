import { getProjectByKey } from '@/app/lib/mock-data';
import { KanbanBoard } from '@/app/ui/projects/kanban-board';
import { ProjectTabs } from '@/app/ui/projects/project-tabs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    key: string;
  }>;
}

export default async function BoardPage({ params }: PageProps) {
  const { key } = await params;
  
  const project = getProjectByKey(key);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <ProjectTabs projectKey={key} />
      <div className="flex-1 overflow-hidden">
        <KanbanBoard projectId={project.id} projectKey={project.key} />
      </div>
    </div>
  );
}
