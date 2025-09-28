-- Drop existing tables and reset for task tracking system
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS customers CASCADE; 
DROP TABLE IF EXISTS revenue CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Members table (replaces customers)
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Tasks table (replaces invoices)
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  status VARCHAR(20) CHECK (status IN ('todo', 'in-progress', 'completed', 'cancelled')) DEFAULT 'todo',
  member_id UUID REFERENCES members(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  due_date DATE
);

-- Create Users table for authentication
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Insert sample members
INSERT INTO members (id, name, email, image_url) VALUES
('410544b2-4001-4271-9855-fec4b6a6442a', 'Alice Johnson', 'alice@company.com', '/customers/alice-johnson.png'),
('3958dc9e-712f-4377-85e9-fec4b6a6442a', 'Bob Smith', 'bob@company.com', '/customers/bob-smith.png'),
('3958dc9e-742f-4377-85e9-fec4b6a6442a', 'Carol Davis', 'carol@company.com', '/customers/carol-davis.png'),
('76d65c26-f784-44a2-ac19-586678f7c2f2', 'David Wilson', 'david@company.com', '/customers/david-wilson.png'),
('CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', 'Emma Brown', 'emma@company.com', '/customers/emma-brown.png'),
('13D07535-C59E-4157-A011-F8D2EF4E0228', 'Frank Miller', 'frank@company.com', '/customers/frank-miller.png');

-- Insert sample tasks
INSERT INTO tasks (id, title, description, priority, status, member_id, created_at, due_date) VALUES
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d1', 'Implement user authentication', 'Set up user login and registration system with proper security measures', 'high', 'in-progress', '410544b2-4001-4271-9855-fec4b6a6442a', '2025-09-20', '2025-10-05'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d2', 'Design database schema', 'Create comprehensive database design for the new application', 'medium', 'completed', '3958dc9e-712f-4377-85e9-fec4b6a6442a', '2025-09-18', '2025-09-25'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d3', 'Setup CI/CD pipeline', 'Configure automated testing and deployment pipeline', 'high', 'todo', '3958dc9e-742f-4377-85e9-fec4b6a6442a', '2025-09-22', '2025-10-10'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d4', 'Write API documentation', 'Document all API endpoints with examples and usage instructions', 'medium', 'todo', '76d65c26-f784-44a2-ac19-586678f7c2f2', '2025-09-23', '2025-10-15'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d5', 'Implement responsive design', 'Make the application mobile-friendly and responsive', 'low', 'in-progress', 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', '2025-09-24', '2025-11-01'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d6', 'Security audit', 'Conduct comprehensive security review of the application', 'critical', 'todo', '13D07535-C59E-4157-A011-F8D2EF4E0228', '2025-09-25', '2025-09-30'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d7', 'Performance optimization', 'Optimize application performance and loading times', 'medium', 'todo', '410544b2-4001-4271-9855-fec4b6a6442a', '2025-09-26', '2025-10-20'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d8', 'User interface testing', 'Test all user interface components for functionality', 'low', 'completed', '3958dc9e-712f-4377-85e9-fec4b6a6442a', '2025-09-27', '2025-10-01'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662d9', 'Bug fixes for login', 'Fix critical bugs in the user authentication system', 'critical', 'in-progress', '3958dc9e-742f-4377-85e9-fec4b6a6442a', '2025-09-28', '2025-09-29'),
('6e15e9c6-c5aa-4b52-8cc2-f5ad64b662da', 'Feature enhancement planning', 'Plan and document future feature enhancements', 'low', 'todo', '76d65c26-f784-44a2-ac19-586678f7c2f2', '2025-09-28', '2025-11-15');

-- Insert sample user for authentication
INSERT INTO users (id, name, email, password) VALUES
('410544b2-4001-4271-9855-fec4b6a6442b', 'Admin User', 'admin@company.com', '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDlcjhVXgPy1Sndmxr/vg2Ss0aGu');

-- Create indexes for better performance
CREATE INDEX idx_tasks_member_id ON tasks(member_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);
CREATE INDEX idx_members_email ON members(email);