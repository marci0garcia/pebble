// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  member_id: string;
  created_at: string;
  updated_at: string;
  due_date?: string;
};

export type LatestTask = {
  id: string;
  title: string;
  name: string;
  image_url: string;
  email: string;
  priority: string;
  status: string;
};

export type LatestTaskRaw = {
  id: string;
  title: string;
  name: string;
  image_url: string;
  email: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
};

export type TasksTable = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  member_id: string;
  name: string;
  email: string;
  image_url: string;
  created_at: string;
  due_date?: string;
};

export type MembersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tasks: number;
  total_todo: number;
  total_in_progress: number;
  total_completed: number;
  total_cancelled: number;
};

export type FormattedMembersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_tasks: number;
  total_todo: string;
  total_in_progress: string;
  total_completed: string;
  total_cancelled: string;
};

export type MemberField = {
  id: string;
  name: string;
};

export type TaskForm = {
  id: string;
  title: string;
  description: string;
  member_id: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  due_date?: string;
};
