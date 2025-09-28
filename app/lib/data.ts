import postgres from 'postgres';
import {
  Revenue,
  User,
  Project,
  Issue,
  Label,
  IssueWithLabels,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// Fetch all projects
export async function fetchProjects() {
  try {
    const projects = await sql<Project[]>`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `;
    return projects;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects.');
  }
}

// Fetch all users
export async function fetchUsers() {
  try {
    const users = await sql<User[]>`
      SELECT * FROM users 
      ORDER BY name ASC
    `;
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

// Fetch all labels
export async function fetchLabels() {
  try {
    const labels = await sql<Label[]>`
      SELECT * FROM labels 
      ORDER BY name ASC
    `;
    return labels;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch labels.');
  }
}

// Fetch issues for a specific project with labels and assignee info
export async function fetchProjectIssues(projectId: string) {
  try {
    const issues = await sql<Issue[]>`
      SELECT i.*, u.name as assignee_name, u.email as assignee_email
      FROM issues i
      LEFT JOIN users u ON i.assignee_id = u.id
      WHERE i.project_id = ${projectId}
      ORDER BY i.created_at DESC
    `;

    // Fetch labels for each issue
    const issuesWithLabels: IssueWithLabels[] = [];
    for (const issue of issues) {
      const labels = await sql<Label[]>`
        SELECT l.* FROM labels l
        JOIN issue_labels il ON l.id = il.label_id
        WHERE il.issue_id = ${issue.id}
      `;
      
      issuesWithLabels.push({
        ...issue,
        labels,
        assignee: (issue as any).assignee_name ? {
          id: issue.assignee_id!,
          name: (issue as any).assignee_name,
          email: (issue as any).assignee_email,
        } : undefined,
      });
    }

    return issuesWithLabels;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project issues.');
  }
}

export async function fetchLatestTasks() {
  try {
    const tasks = await sql<Issue[]>`
      SELECT i.*, u.name as assignee_name
      FROM issues i
      LEFT JOIN users u ON i.assignee_id = u.id
      ORDER BY i.created_at DESC
      LIMIT 5
    `;
    
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      assignee_id: task.assignee_id,
      type: task.type,
      assignee_name: (task as any).assignee_name,
    }));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch the latest tasks.');
  }
}

export async function fetchCardData() {
  try {
    const [projectCount, taskCount, completedCount, pendingCount] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM projects`,
      sql`SELECT COUNT(*) as count FROM issues`,
      sql`SELECT COUNT(*) as count FROM issues WHERE status = 'DONE'`,
      sql`SELECT COUNT(*) as count FROM issues WHERE status IN ('TODO', 'IN_PROGRESS', 'IN_REVIEW')`,
    ]);

    return {
      numberOfProjects: Number(projectCount[0].count),
      numberOfTasks: Number(taskCount[0].count),
      completedTasks: Number(completedCount[0].count),
      pendingTasks: Number(pendingCount[0].count),
    };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredTasks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tasks = await sql<Issue[]>`
      SELECT i.*, u.name as assignee_name
      FROM issues i
      LEFT JOIN users u ON i.assignee_id = u.id
      WHERE 
        i.title ILIKE ${`%${query}%`} OR 
        i.description ILIKE ${`%${query}%`} OR 
        i.status ILIKE ${`%${query}%`} OR 
        i.type ILIKE ${`%${query}%`}
      ORDER BY i.created_at DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return tasks;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  try {
    const countResult = await sql`
      SELECT COUNT(*) as count FROM issues
      WHERE 
        title ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`} OR 
        status ILIKE ${`%${query}%`} OR 
        type ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(countResult[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const tasks = await sql<Issue[]>`
      SELECT i.*, u.name as assignee_name, u.email as assignee_email
      FROM issues i
      LEFT JOIN users u ON i.assignee_id = u.id
      WHERE i.id = ${id}
    `;
    
    if (tasks.length === 0) {
      throw new Error(`Task with id ${id} not found`);
    }

    const task = tasks[0];
    
    // Fetch labels for this task
    const labels = await sql<Label[]>`
      SELECT l.* FROM labels l
      JOIN issue_labels il ON l.id = il.label_id
      WHERE il.issue_id = ${id}
    `;

    return {
      ...task,
      labels,
      assignee: (task as any).assignee_name ? {
        id: task.assignee_id!,
        name: (task as any).assignee_name,
        email: (task as any).assignee_email,
      } : undefined,
    } as IssueWithLabels;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch task.');
  }
}

// Mock function for compatibility - returns empty array since we don't need customers for tasks
export async function fetchCustomers() {
  try {
    return [];
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
