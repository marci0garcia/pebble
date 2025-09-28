-- Initialize Pebble Database Schema
-- Run this SQL script in your Neon PostgreSQL database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    key VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create issues/tasks table
CREATE TABLE IF NOT EXISTS issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('TASK', 'BUG', 'SUBTASK')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE')),
    assignee_id UUID REFERENCES users(id),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create labels table
CREATE TABLE IF NOT EXISTS labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7) NOT NULL, -- Hex color code
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create issue_labels junction table (many-to-many)
CREATE TABLE IF NOT EXISTS issue_labels (
    issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (issue_id, label_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_issues_project_id ON issues(project_id);
CREATE INDEX IF NOT EXISTS idx_issues_assignee_id ON issues(assignee_id);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_comments_issue_id ON comments(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_labels_issue_id ON issue_labels(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_labels_label_id ON issue_labels(label_id);

-- Insert sample data
INSERT INTO users (id, name, email, avatar_url) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john@example.com', ''),
    ('550e8400-e29b-41d4-a716-446655440002', 'Jane Smith', 'jane@example.com', ''),
    ('550e8400-e29b-41d4-a716-446655440003', 'Mike Johnson', 'mike@example.com', ''),
    ('550e8400-e29b-41d4-a716-446655440004', 'Sarah Wilson', 'sarah@example.com', '')
ON CONFLICT (email) DO NOTHING;

INSERT INTO projects (id, name, key, description) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'Pebble Project', 'PBL', 'Main task management application'),
    ('650e8400-e29b-41d4-a716-446655440002', 'E-commerce Site', 'ECO', 'Online shopping platform')
ON CONFLICT (key) DO NOTHING;

INSERT INTO labels (id, name, color) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', 'Frontend', '#3B82F6'),
    ('750e8400-e29b-41d4-a716-446655440002', 'Backend', '#10B981'),
    ('750e8400-e29b-41d4-a716-446655440003', 'Bug', '#EF4444'),
    ('750e8400-e29b-41d4-a716-446655440004', 'Enhancement', '#8B5CF6'),
    ('750e8400-e29b-41d4-a716-446655440005', 'Documentation', '#F59E0B')
ON CONFLICT DO NOTHING;