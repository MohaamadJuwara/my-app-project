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
