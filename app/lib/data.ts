import postgres from 'postgres';
import {
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { mockProjects, mockIssues } from './mock-data';

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

export async function fetchLatestTasks() {
  try {
    // Return mock data for latest tasks instead of database queries
    const latestTasks = mockIssues
      .slice(0, 5)
      .map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        assigneeId: task.assigneeId,
        type: task.type,
      }));
    
    return latestTasks;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch the latest tasks.');
  }
}

export async function fetchCardData() {
  try {
    // Use mock data for card statistics
    const totalProjects = mockProjects.length;
    const totalTasks = mockIssues.length;
    const completedTasks = mockIssues.filter(task => task.status === 'DONE').length;
    const pendingTasks = mockIssues.filter(task => task.status === 'TODO' || task.status === 'IN_PROGRESS' || task.status === 'IN_REVIEW').length;

    return {
      numberOfProjects: totalProjects,
      numberOfTasks: totalTasks,
      completedTasks: completedTasks,
      pendingTasks: pendingTasks,
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
    // Filter tasks based on query
    const filteredTasks = mockIssues.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description?.toLowerCase().includes(query.toLowerCase()) ||
      task.status.toLowerCase().includes(query.toLowerCase()) ||
      task.type.toLowerCase().includes(query.toLowerCase())
    );

    // Paginate the results
    const paginatedTasks = filteredTasks.slice(offset, offset + ITEMS_PER_PAGE);
    return paginatedTasks;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  try {
    // Filter tasks based on query
    const filteredTasks = mockIssues.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.description?.toLowerCase().includes(query.toLowerCase()) ||
      task.status.toLowerCase().includes(query.toLowerCase()) ||
      task.type.toLowerCase().includes(query.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const task = mockIssues.find(task => task.id === id);
    
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return task;
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
