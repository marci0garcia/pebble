// Simple mock data for the project management system
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  avatarUrl?: string;
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description?: string;
  type: 'TASK' | 'BUG' | 'SUBTASK';
  priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  assigneeId?: string;
  projectId: string;
  labels: Label[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  issueId: string;
  createdAt: Date;
}

// Mock users
export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatarUrl: '' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatarUrl: '' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatarUrl: '' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', avatarUrl: '' },
];

// Mock labels
export const mockLabels: Label[] = [
  { id: '1', name: 'Frontend', color: '#3B82F6' },
  { id: '2', name: 'Backend', color: '#10B981' },
  { id: '3', name: 'Bug', color: '#EF4444' },
  { id: '4', name: 'Enhancement', color: '#8B5CF6' },
  { id: '5', name: 'Documentation', color: '#F59E0B' },
];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Pebble Project Management',
    key: 'PBL',
    description: 'A modern project management system for teams',
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    key: 'ECO',
    description: 'Online shopping platform with payment integration',
  },
  {
    id: '3',
    name: 'Mobile App',
    key: 'MOB',
    description: 'Cross-platform mobile application',
  },
];

// Mock issues
export const mockIssues: Issue[] = [
  {
    id: '1',
    key: 'PBL-1',
    title: 'Set up project structure',
    description: 'Initialize the basic project structure with components and routing',
    type: 'TASK',
    priority: 'HIGH',
    status: 'TODO',
    assigneeId: '1',
    projectId: '1',
    labels: [mockLabels[0], mockLabels[4]],
  },
  {
    id: '2',
    key: 'PBL-2',
    title: 'Create user authentication',
    description: 'Implement login and registration functionality',
    type: 'TASK',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assigneeId: '2',
    projectId: '1',
    labels: [mockLabels[1]],
  },
  {
    id: '3',
    key: 'PBL-3',
    title: 'Fix login bug',
    description: 'Users cannot login with special characters in password',
    type: 'BUG',
    priority: 'HIGH',
    status: 'IN_REVIEW',
    assigneeId: '3',
    projectId: '1',
    labels: [mockLabels[2]],
  },
  {
    id: '4',
    key: 'PBL-4',
    title: 'Add dark mode support',
    description: 'Implement dark theme toggle for better user experience',
    type: 'TASK',
    priority: 'MEDIUM',
    status: 'DONE',
    assigneeId: '4',
    projectId: '1',
    labels: [mockLabels[0], mockLabels[3]],
  },
  {
    id: '5',
    key: 'PBL-5',
    title: 'Create project dashboard',
    description: 'Build the main dashboard with project overview and metrics',
    type: 'TASK',
    priority: 'HIGH',
    status: 'TODO',
    assigneeId: '1',
    projectId: '1',
    labels: [mockLabels[0], mockLabels[1]],
  },
  {
    id: '6',
    key: 'ECO-1',
    title: 'Design product catalog',
    description: 'Create the product listing and detail pages',
    type: 'TASK',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assigneeId: '2',
    projectId: '2',
    labels: [mockLabels[0], mockLabels[3]],
  },
  {
    id: '7',
    key: 'MOB-1',
    title: 'Setup React Native project',
    description: 'Initialize React Native project with navigation',
    type: 'TASK',
    priority: 'MEDIUM',
    status: 'TODO',
    assigneeId: '3',
    projectId: '3',
    labels: [mockLabels[0]],
  },
];

// Helper functions
export function getIssuesByProject(projectId: string): Issue[] {
  return mockIssues.filter(issue => issue.projectId === projectId);
}

export function getIssuesByStatus(status: Issue['status']): Issue[] {
  return mockIssues.filter(issue => issue.status === status);
}

export function getProjectByKey(key: string): Project | undefined {
  return mockProjects.find(project => project.key === key);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getLabelById(id: string): Label | undefined {
  return mockLabels.find(label => label.id === id);
}

// Update functions to modify mock data
export function updateIssueInMockData(issueId: string, updates: Partial<Issue>) {
  const issueIndex = mockIssues.findIndex(issue => issue.id === issueId);
  if (issueIndex !== -1) {
    mockIssues[issueIndex] = { ...mockIssues[issueIndex], ...updates };
  }
}

export function addIssueToMockData(newIssue: Issue) {
  mockIssues.push(newIssue);
}
