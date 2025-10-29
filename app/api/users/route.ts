// API routes for users
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllUsers, 
  insertUser, 
  createUsersTable 
} from '../../../lib/database';
import { z } from 'zod';

// Validation schema for user creation
const userSchema = z.object({
  customer: z.string().min(1, 'Customer name is required'),
  email: z.string().email('Invalid email format'),
  amount: z.number().positive('Amount must be a positive number'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in ISO format (YYYY-MM-DD)'),
  status: z.string().min(1, 'Status is required'),
});

// GET /api/users - Get all users
export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Error in GET /api/users:', error);
    
    // Check if table doesn't exist - auto-initialize in development
    if (error?.message?.includes('does not exist') || error?.code === '42P01') {
      if (process.env.NODE_ENV === 'development') {
        try {
          await createUsersTable();
          const users = await getAllUsers();
          return NextResponse.json({ users });
        } catch (initError) {
          console.error('Error auto-initializing table:', initError);
        }
      }
      return NextResponse.json(
        { 
          error: 'Users table does not exist',
          message: 'Please initialize the users table by calling PUT /api/users first'
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = userSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    const { customer, email, amount, date, status } = validationResult.data;
    
    // Parse ISO date string to Date object
    const dateObj = new Date(date);
    
    // Validate date is valid
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }
    
    const newUser = await insertUser(
      customer,
      email,
      amount,
      dateObj,
      status
    );
    
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/users:', error);
    
    // Handle database constraint errors
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// Initialize users table (optional endpoint)
export async function PUT(request: NextRequest) {
  try {
    await createUsersTable();
    return NextResponse.json({ message: 'Users table initialized successfully' });
  } catch (error) {
    console.error('Error initializing users table:', error);
    return NextResponse.json(
      { error: 'Failed to initialize users table' },
      { status: 500 }
    );
  }
}

