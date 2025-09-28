import postgres from 'postgres';
import {
  MemberField,
  MembersTableType,
  TaskForm,
  TasksTable,
  LatestTaskRaw,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchLatestTasks() {
  try {
    const data = await sql<LatestTaskRaw[]>`
      SELECT 
        tasks.id,
        tasks.title, 
        tasks.priority,
        tasks.status,
        members.name, 
        members.image_url, 
        members.email
      FROM tasks
      JOIN members ON tasks.member_id = members.id
      ORDER BY tasks.created_at DESC
      LIMIT 5`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest tasks.');
  }
}

export async function fetchCardData() {
  try {
    // Fetch counts and status data for tasks and members
    const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;
    const memberCountPromise = sql`SELECT COUNT(*) FROM members`;
    const taskStatusPromise = sql`SELECT
         COUNT(CASE WHEN status = 'todo' THEN 1 END) AS "todo",
         COUNT(CASE WHEN status = 'in-progress' THEN 1 END) AS "in_progress",
         COUNT(CASE WHEN status = 'completed' THEN 1 END) AS "completed",
         COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS "cancelled"
         FROM tasks`;

    const data = await Promise.all([
      taskCountPromise,
      memberCountPromise,
      taskStatusPromise,
    ]);

    const numberOfTasks = Number(data[0][0].count ?? '0');
    const numberOfMembers = Number(data[1][0].count ?? '0');
    const todoTasks = Number(data[2][0].todo ?? '0');
    const inProgressTasks = Number(data[2][0].in_progress ?? '0');
    const completedTasks = Number(data[2][0].completed ?? '0');
    const cancelledTasks = Number(data[2][0].cancelled ?? '0');

    return {
      numberOfMembers,
      numberOfTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      cancelledTasks,
    };
  } catch (error) {
    console.error('Database Error:', error);
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
    const tasks = await sql<TasksTable[]>`
      SELECT
        tasks.id,
        tasks.title,
        tasks.description,
        tasks.priority,
        tasks.status,
        tasks.created_at,
        tasks.due_date,
        members.name,
        members.email,
        members.image_url,
        tasks.member_id
      FROM tasks
      JOIN members ON tasks.member_id = members.id
      WHERE
        members.name ILIKE ${`%${query}%`} OR
        members.email ILIKE ${`%${query}%`} OR
        tasks.title ILIKE ${`%${query}%`} OR
        tasks.description ILIKE ${`%${query}%`} OR
        tasks.priority ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
      ORDER BY tasks.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTasksPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM tasks
    JOIN members ON tasks.member_id = members.id
    WHERE
      members.name ILIKE ${`%${query}%`} OR
      members.email ILIKE ${`%${query}%`} OR
      tasks.title ILIKE ${`%${query}%`} OR
      tasks.description ILIKE ${`%${query}%`} OR
      tasks.priority ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql<TaskForm[]>`
      SELECT
        tasks.id,
        tasks.title,
        tasks.description,
        tasks.member_id,
        tasks.priority,
        tasks.status,
        tasks.due_date
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task.');
  }
}

export async function fetchMembers() {
  try {
    const members = await sql<MemberField[]>`
      SELECT
        id,
        name
      FROM members
      ORDER BY name ASC
    `;

    return members;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all members.');
  }
}

export async function fetchFilteredMembers(query: string) {
  try {
    const data = await sql<MembersTableType[]>`
		SELECT
		  members.id,
		  members.name,
		  members.email,
		  members.image_url,
		  COUNT(tasks.id) AS total_tasks,
		  COUNT(CASE WHEN tasks.status = 'todo' THEN 1 END) AS total_todo,
		  COUNT(CASE WHEN tasks.status = 'in-progress' THEN 1 END) AS total_in_progress,
		  COUNT(CASE WHEN tasks.status = 'completed' THEN 1 END) AS total_completed,
		  COUNT(CASE WHEN tasks.status = 'cancelled' THEN 1 END) AS total_cancelled
		FROM members
		LEFT JOIN tasks ON members.id = tasks.member_id
		WHERE
		  members.name ILIKE ${`%${query}%`} OR
        members.email ILIKE ${`%${query}%`}
		GROUP BY members.id, members.name, members.email, members.image_url
		ORDER BY members.name ASC
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch member table.');
  }
}
