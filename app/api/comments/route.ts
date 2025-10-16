// API routes for comments
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllComments, 
  insertComment, 
  getCommentsByPostId,
  createCommentsTable 
} from '../../../lib/database';

// GET /api/comments - Get all comments or comments by post ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (postId) {
      const comments = await getCommentsByPostId(parseInt(postId));
      return NextResponse.json(comments);
    } else {
      const comments = await getAllComments();
      return NextResponse.json(comments);
    }
  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { comment, userId, postId } = body;
    
    if (!comment || comment.trim() === '') {
      return NextResponse.json(
        { error: 'Comment text is required' },
        { status: 400 }
      );
    }
    
    const newComment = await insertComment(comment, userId, postId);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

// Initialize database table (optional endpoint)
export async function PUT(request: NextRequest) {
  try {
    await createCommentsTable();
    return NextResponse.json({ message: 'Comments table initialized successfully' });
  } catch (error) {
    console.error('Error initializing comments table:', error);
    return NextResponse.json(
      { error: 'Failed to initialize comments table' },
      { status: 500 }
    );
  }
}
