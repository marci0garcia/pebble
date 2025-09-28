-- Migration to add due_date column to existing tasks table
-- Run this if you already have an existing database with tasks

-- Add due_date column to tasks table
ALTER TABLE tasks 
ADD COLUMN due_date DATE;

-- Create index for better performance when filtering by due date
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Optionally, update some existing tasks with sample due dates
-- (Remove these if you don't want sample data)
UPDATE tasks SET due_date = '2025-10-05' WHERE title = 'Implement user authentication';
UPDATE tasks SET due_date = '2025-09-25' WHERE title = 'Design database schema';
UPDATE tasks SET due_date = '2025-10-10' WHERE title = 'Setup CI/CD pipeline';
UPDATE tasks SET due_date = '2025-10-15' WHERE title = 'Write API documentation';
UPDATE tasks SET due_date = '2025-11-01' WHERE title = 'Implement responsive design';
UPDATE tasks SET due_date = '2025-09-30' WHERE title = 'Security audit';
UPDATE tasks SET due_date = '2025-10-20' WHERE title = 'Performance optimization';
UPDATE tasks SET due_date = '2025-10-01' WHERE title = 'User interface testing';
UPDATE tasks SET due_date = '2025-09-29' WHERE title = 'Bug fixes for login';
UPDATE tasks SET due_date = '2025-11-15' WHERE title = 'Feature enhancement planning';