// Database migration route to fix schema issues
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Add missing columns to customers table
    await sql`
      ALTER TABLE customers 
      ADD COLUMN IF NOT EXISTS image_url VARCHAR(255) DEFAULT '/customers/default-avatar.svg';
    `;
    
    // Add missing columns to invoices table
    await sql`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS date DATE DEFAULT CURRENT_DATE;
    `;
    
    // Update existing customers with default image URLs
    await sql`
      UPDATE customers 
      SET image_url = '/customers/default-avatar.svg' 
      WHERE image_url IS NULL OR image_url = '/customers/default-avatar.png';
    `;
    
    // Update existing invoices with dates
    await sql`
      UPDATE invoices 
      SET date = created_at::date 
      WHERE date IS NULL;
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully',
      changes: [
        'Added image_url column to customers table',
        'Added date column to invoices table',
        'Updated existing records with default values'
      ]
    });
    
  } catch (error) {
    console.error('Migration Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Check current schema
    const customersSchema = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'customers' 
      ORDER BY ordinal_position;
    `;
    
    const invoicesSchema = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'invoices' 
      ORDER BY ordinal_position;
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Current database schema',
      customers: customersSchema,
      invoices: invoicesSchema
    });
    
  } catch (error) {
    console.error('Schema Check Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check schema',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
