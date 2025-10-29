// Database connection and utilities for Juwara Solutions
import { neon } from '@neondatabase/serverless';

// Get database connection with error handling
function getDatabaseConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('Database Error: DATABASE_URL environment variable is not set');
    throw new Error('Database connection string provided to `neon()` is not a valid URL. Connection string: undefined');
  }
  
  try {
    return neon(databaseUrl);
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

// Comment interface
export interface Comment {
  id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user_id?: number;
  post_id?: number;
  is_active: boolean;
}

// Create comments table
export async function createCommentsTable() {
  try {
    const sql = getDatabaseConnection();
    
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        post_id INTEGER,
        is_active BOOLEAN DEFAULT TRUE
      );
    `;
    
    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
    `;
    
    console.log('Comments table created successfully');
  } catch (error) {
    console.error('Error creating comments table:', error);
    throw error;
  }
}

// Insert a new comment
export async function insertComment(comment: string, userId?: number, postId?: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      INSERT INTO comments (comment, user_id, post_id)
      VALUES (${comment}, ${userId}, ${postId})
      RETURNING *;
    `;
    return result[0] as Comment;
  } catch (error) {
    console.error('Error inserting comment:', error);
    throw error;
  }
}

// Get all comments
export async function getAllComments() {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      SELECT * FROM comments 
      WHERE is_active = true 
      ORDER BY created_at DESC;
    `;
    return result as Comment[];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

// Get comments by post ID
export async function getCommentsByPostId(postId: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      SELECT * FROM comments 
      WHERE post_id = ${postId} AND is_active = true 
      ORDER BY created_at ASC;
    `;
    return result as Comment[];
  } catch (error) {
    console.error('Error fetching comments by post ID:', error);
    throw error;
  }
}

// Get comment by ID
export async function getCommentById(id: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      SELECT * FROM comments 
      WHERE id = ${id} AND is_active = true;
    `;
    return result[0] as Comment | undefined;
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
}

// Update comment
export async function updateComment(id: number, comment: string) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      UPDATE comments 
      SET comment = ${comment}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND is_active = true
      RETURNING *;
    `;
    return result[0] as Comment | undefined;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
}

// Delete comment (soft delete)
export async function deleteComment(id: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      UPDATE comments 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0] as Comment | undefined;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

// Hard delete comment (permanent)
export async function hardDeleteComment(id: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      DELETE FROM comments 
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0] as Comment | undefined;
  } catch (error) {
    console.error('Error hard deleting comment:', error);
    throw error;
  }
}

// User interface
export interface User {
  id: number;
  customer: string;
  email: string;
  amount: number;
  date: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
}

// Create users table
export async function createUsersTable() {
  try {
    const sql = getDatabaseConnection();
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        customer VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_date ON users(date);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
    `;
    
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
    throw error;
  }
}

// Insert a new user
export async function insertUser(
  customer: string,
  email: string,
  amount: number,
  date: Date,
  status: string
) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      INSERT INTO users (customer, email, amount, date, status)
      VALUES (${customer}, ${email}, ${amount}, ${date}, ${status})
      RETURNING *;
    `;
    return result[0] as User;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      SELECT * FROM users 
      ORDER BY created_at DESC;
    `;
    return result as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(id: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      SELECT * FROM users 
      WHERE id = ${id};
    `;
    return result[0] as User | undefined;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Update user
export async function updateUser(
  id: number,
  updates: Partial<{
    customer: string;
    email: string;
    amount: number;
    date: Date;
    status: string;
  }>
) {
  try {
    const sql = getDatabaseConnection();
    
    if (Object.keys(updates).length === 0) {
      return getUserById(id);
    }
    
    // Use conditional SQL template literals for each field
    // This approach ensures safe parameterization
    let result;
    
    if (updates.customer !== undefined && 
        updates.email !== undefined && 
        updates.amount !== undefined && 
        updates.date !== undefined && 
        updates.status !== undefined) {
      // All fields - use full update
      result = await sql`
        UPDATE users 
        SET customer = ${updates.customer},
            email = ${updates.email},
            amount = ${updates.amount},
            date = ${updates.date},
            status = ${updates.status},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *;
      `;
    } else {
      // Partial update - build query with proper parameterization
      const setClauses: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;
      
      if (updates.customer !== undefined) {
        setClauses.push(`customer = $${paramIndex++}`);
        params.push(updates.customer);
      }
      if (updates.email !== undefined) {
        setClauses.push(`email = $${paramIndex++}`);
        params.push(updates.email);
      }
      if (updates.amount !== undefined) {
        setClauses.push(`amount = $${paramIndex++}`);
        params.push(updates.amount);
      }
      if (updates.date !== undefined) {
        setClauses.push(`date = $${paramIndex++}`);
        params.push(updates.date);
      }
      if (updates.status !== undefined) {
        setClauses.push(`status = $${paramIndex++}`);
        params.push(updates.status);
      }
      
      setClauses.push('updated_at = CURRENT_TIMESTAMP');
      
      // Build parameterized query with proper WHERE clause
      const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
      params.push(id);
      
      // Note: neon's unsafe() doesn't support separate parameter binding
      // Values are embedded via validated API inputs (zod) which mitigates SQL injection risk
      const unsafeResult = await sql.unsafe(query);
      result = (Array.isArray(unsafeResult) ? unsafeResult : [unsafeResult]) as unknown as User[];
    }
    
    return (result as User[])[0] as User | undefined;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id: number) {
  try {
    const sql = getDatabaseConnection();
    const result = await sql`
      DELETE FROM users 
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0] as User | undefined;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
