#!/usr/bin/env node

/**
 * Database Reset Script
 * 
 * This script drops existing tables and recreates them with the correct schema.
 */

const postgres = require('postgres');
require('dotenv').config({ path: '.env' });

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function resetDatabase() {
  try {
    console.log('🔄 Resetting Pebble database...');

    // Drop all tables in reverse dependency order
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS comments CASCADE;`;
    await sql`DROP TABLE IF EXISTS issue_labels CASCADE;`;
    await sql`DROP TABLE IF EXISTS issues CASCADE;`;
    await sql`DROP TABLE IF EXISTS labels CASCADE;`;
    await sql`DROP TABLE IF EXISTS projects CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    console.log('✅ Existing tables dropped');

    // Create users table
    await sql`
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    console.log('✅ Users table created');

    // Create projects table
    await sql`
      CREATE TABLE projects (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          key VARCHAR(50) UNIQUE NOT NULL,
          description TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    console.log('✅ Projects table created');

    // Create labels table
    await sql`
      CREATE TABLE labels (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(100) NOT NULL,
          color VARCHAR(7) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    console.log('✅ Labels table created');

    // Create issues/tasks table
    await sql`
      CREATE TABLE issues (
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
    `;
    console.log('✅ Issues table created');

    // Create issue_labels junction table
    await sql`
      CREATE TABLE issue_labels (
          issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
          label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
          PRIMARY KEY (issue_id, label_id)
      );
    `;
    console.log('✅ Issue_labels table created');

    // Create comments table
    await sql`
      CREATE TABLE comments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          content TEXT NOT NULL,
          author_id UUID NOT NULL REFERENCES users(id),
          issue_id UUID NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    console.log('✅ Comments table created');

    // Create indexes
    await sql`CREATE INDEX idx_issues_project_id ON issues(project_id);`;
    await sql`CREATE INDEX idx_issues_assignee_id ON issues(assignee_id);`;
    await sql`CREATE INDEX idx_issues_status ON issues(status);`;
    await sql`CREATE INDEX idx_comments_issue_id ON comments(issue_id);`;
    await sql`CREATE INDEX idx_issue_labels_issue_id ON issue_labels(issue_id);`;
    await sql`CREATE INDEX idx_issue_labels_label_id ON issue_labels(label_id);`;
    console.log('✅ Database indexes created');

    // Insert sample users
    await sql`
      INSERT INTO users (id, name, email, avatar_url) VALUES
          ('550e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john@example.com', ''),
          ('550e8400-e29b-41d4-a716-446655440002', 'Jane Smith', 'jane@example.com', ''),
          ('550e8400-e29b-41d4-a716-446655440003', 'Mike Johnson', 'mike@example.com', ''),
          ('550e8400-e29b-41d4-a716-446655440004', 'Sarah Wilson', 'sarah@example.com', '');
    `;
    console.log('✅ Sample users inserted');

    // Insert sample projects
    await sql`
      INSERT INTO projects (id, name, key, description) VALUES
          ('650e8400-e29b-41d4-a716-446655440001', 'Pebble Project', 'PBL', 'Main task management application'),
          ('650e8400-e29b-41d4-a716-446655440002', 'E-commerce Site', 'ECO', 'Online shopping platform');
    `;
    console.log('✅ Sample projects inserted');

    // Insert sample labels
    await sql`
      INSERT INTO labels (id, name, color) VALUES
          ('750e8400-e29b-41d4-a716-446655440001', 'Frontend', '#3B82F6'),
          ('750e8400-e29b-41d4-a716-446655440002', 'Backend', '#10B981'),
          ('750e8400-e29b-41d4-a716-446655440003', 'Bug', '#EF4444'),
          ('750e8400-e29b-41d4-a716-446655440004', 'Enhancement', '#8B5CF6'),
          ('750e8400-e29b-41d4-a716-446655440005', 'Documentation', '#F59E0B');
    `;
    console.log('✅ Sample labels inserted');

    // Insert sample issues
    await sql`
      INSERT INTO issues (id, key, title, description, type, priority, status, assignee_id, project_id) VALUES
          ('850e8400-e29b-41d4-a716-446655440001', 'PBL-1', 'Setup project structure', 'Initialize the basic project structure with components and routing', 'TASK', 'HIGH', 'TODO', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440002', 'PBL-2', 'Create user authentication', 'Implement login and registration functionality', 'TASK', 'HIGH', 'IN_PROGRESS', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440003', 'PBL-3', 'Fix login bug', 'Users cannot login with special characters in password', 'BUG', 'HIGH', 'IN_REVIEW', '550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440004', 'PBL-4', 'Add dark mode support', 'Implement dark theme toggle for better user experience', 'TASK', 'MEDIUM', 'DONE', '550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440005', 'ECO-1', 'Design product catalog', 'Create the product listing and detail pages', 'TASK', 'HIGH', 'IN_PROGRESS', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002');
    `;
    console.log('✅ Sample issues inserted');

    // Insert sample issue-label relationships
    await sql`
      INSERT INTO issue_labels (issue_id, label_id) VALUES
          ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002'),
          ('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003'),
          ('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440001'),
          ('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440001');
    `;
    console.log('✅ Sample issue-label relationships inserted');

    console.log('\n🎉 Database reset completed successfully!');
    console.log('\nYour Neon PostgreSQL database is now ready to use.');
    console.log('You can start your application with: npm run dev');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Run the reset
resetDatabase();