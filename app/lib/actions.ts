'use server';
 
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { Issue } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Task-related schema validation
const TaskFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']),
  priority: z.enum(['LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST']),
  type: z.enum(['TASK', 'BUG', 'SUBTASK']),
  assignee_id: z.string().optional(),
  project_id: z.string(),
});

const CreateTask = TaskFormSchema.omit({ id: true });
const UpdateTask = TaskFormSchema.omit({ id: true });

// Create a new task
export async function createTask(formData: FormData) {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    
    // Validate the form data
    const validatedFields = CreateTask.safeParse({
      title: rawFormData.title,
      description: rawFormData.description || '',
      status: rawFormData.status || 'TODO',
      priority: rawFormData.priority || 'MEDIUM',
      type: rawFormData.type || 'TASK',
      assignee_id: rawFormData.assignee_id || null,
      project_id: rawFormData.project_id,
    });

    if (!validatedFields.success) {
      throw new Error('Invalid form data: ' + validatedFields.error.message);
    }

    const { title, description, status, priority, type, assignee_id, project_id } = validatedFields.data;

    // Generate a unique key for the task
    const projectResult = await sql`SELECT key FROM projects WHERE id = ${project_id}`;
    if (projectResult.length === 0) {
      throw new Error('Project not found');
    }
    
    const projectKey = projectResult[0].key;
    const countResult = await sql`SELECT COUNT(*) + 1 as next_num FROM issues WHERE project_id = ${project_id}`;
    const taskKey = `${projectKey}-${countResult[0].next_num}`;

    // Insert the new task
    const result = await sql`
      INSERT INTO issues (key, title, description, status, priority, type, assignee_id, project_id)
      VALUES (${taskKey}, ${title}, ${description || ''}, ${status}, ${priority}, ${type}, ${assignee_id || null}, ${project_id})
      RETURNING *
    `;

    revalidatePath('/dashboard/projects');
    revalidatePath(`/dashboard/projects/${projectKey}`);
    
    return { success: true, task: result[0] };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create task' };
  }
}

// Update an existing task
export async function updateTask(id: string, formData: FormData) {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    
    // Validate the form data
    const validatedFields = UpdateTask.safeParse({
      title: rawFormData.title,
      description: rawFormData.description || '',
      status: rawFormData.status,
      priority: rawFormData.priority,
      type: rawFormData.type,
      assignee_id: rawFormData.assignee_id || null,
      project_id: rawFormData.project_id,
    });

    if (!validatedFields.success) {
      throw new Error('Invalid form data: ' + validatedFields.error.message);
    }

    const { title, description, status, priority, type, assignee_id, project_id } = validatedFields.data;

    // Update the task
    const result = await sql`
      UPDATE issues 
      SET 
        title = ${title},
        description = ${description || ''},
        status = ${status},
        priority = ${priority},
        type = ${type},
        assignee_id = ${assignee_id || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      throw new Error('Task not found');
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    
    return { success: true, task: result[0] };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update task' };
  }
}

// Update only the status of a task (for kanban board drag & drop)
export async function updateTaskStatus(id: string, status: string) {
  try {
    const validStatus = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
    if (!validStatus.includes(status)) {
      throw new Error('Invalid status');
    }

    const result = await sql`
      UPDATE issues 
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      throw new Error('Task not found');
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    
    return { success: true, task: result[0] };
  } catch (error) {
    console.error('Error updating task status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update task status' };
  }
}

// Delete a task
export async function deleteTask(id: string) {
  try {
    // Delete associated labels first
    await sql`DELETE FROM issue_labels WHERE issue_id = ${id}`;
    
    // Delete associated comments
    await sql`DELETE FROM comments WHERE issue_id = ${id}`;
    
    // Delete the task
    const result = await sql`DELETE FROM issues WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      throw new Error('Task not found');
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete task' };
  }
}

// Create a new project
export async function createProject(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    
    if (!name || name.trim().length === 0) {
      throw new Error('Project name is required');
    }

    // Generate a unique key (first 3 letters of name + random number)
    const baseKey = name.slice(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000);
    const key = `${baseKey}${randomNum}`;

    const result = await sql`
      INSERT INTO projects (name, key, description)
      VALUES (${name.trim()}, ${key}, ${description || ''})
      RETURNING *
    `;

    revalidatePath('/dashboard/projects');
    
    return { success: true, project: result[0] };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create project' };
  }
}