'use server';
 
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const TaskFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  memberId: z.string().min(1, 'Member is required'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['todo', 'in-progress', 'completed', 'cancelled']),
  due_date: z.string().optional(),
  created_at: z.string(),
});
 
const CreateTask = TaskFormSchema.omit({ id: true, created_at: true });
const UpdateTask = TaskFormSchema.omit({ id: true, created_at: true });

export async function createTask(formData: FormData) {
  const { title, description, memberId, priority, status, due_date } = CreateTask.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    memberId: formData.get('memberId'),
    priority: formData.get('priority'),
    status: formData.get('status'),
    due_date: formData.get('due_date') || undefined,
  });

  const created_at = new Date().toISOString();

  await sql`
    INSERT INTO tasks (title, description, member_id, priority, status, created_at, updated_at, due_date)
    VALUES (${title}, ${description}, ${memberId}, ${priority}, ${status}, ${created_at}, ${created_at}, ${due_date || null})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateTask(id: string, formData: FormData) {
  const { title, description, memberId, priority, status, due_date } = UpdateTask.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    memberId: formData.get('memberId'),
    priority: formData.get('priority'),
    status: formData.get('status'),
    due_date: formData.get('due_date') || undefined,
  });
 
  const updated_at = new Date().toISOString();
 
  await sql`
    UPDATE tasks
    SET title = ${title}, description = ${description}, member_id = ${memberId}, 
        priority = ${priority}, status = ${status}, updated_at = ${updated_at}, due_date = ${due_date || null}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteTask(id: string) {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}