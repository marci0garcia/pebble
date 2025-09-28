// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// These types match the database schema structure.

// User type for the database
export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

// Project type for the database
export type Project = {
  id: string;
  name: string;
  key: string;
  description?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

// Issue/Task type for the database
export type Issue = {
  id: string;
  key: string;
  title: string;
  description?: string;
  type: 'TASK' | 'BUG' | 'SUBTASK';
  priority: 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  assignee_id?: string;
  project_id: string;
  created_at?: string;
  updated_at?: string;
};

// Label type for the database
export type Label = {
  id: string;
  name: string;
  color: string;
  created_at?: string;
};

// Comment type for the database
export type Comment = {
  id: string;
  content: string;
  author_id: string;
  issue_id: string;
  created_at?: string;
  updated_at?: string;
};

// Issue with populated relations for UI
export type IssueWithLabels = Issue & {
  labels: Label[];
  assignee?: User;
  project?: Project;
};

// Legacy types (keeping for backward compatibility)
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
