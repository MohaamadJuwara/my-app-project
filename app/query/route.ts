// Query route handler for testing database connections
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
  try {
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Execute the SQL query to test database connection
    const result = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
    
    return NextResponse.json({
      success: true,
      message: 'Database query executed successfully',
      data: result,
      count: result.length
    });
    
  } catch (error) {
    console.error('Error executing query:', error);
    
    // If the tables don't exist, let's create some sample data for testing
    if (error instanceof Error && error.message.includes('relation "invoices" does not exist')) {
      try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        
        // Create sample tables and data
        await sql`
          CREATE TABLE IF NOT EXISTS customers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        
        await sql`
          CREATE TABLE IF NOT EXISTS invoices (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER REFERENCES customers(id),
            amount DECIMAL(10,2) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        
        // Insert sample data
        await sql`
          INSERT INTO customers (name, email) VALUES 
          ('John Doe', 'john@example.com'),
          ('Jane Smith', 'jane@example.com'),
          ('Bob Johnson', 'bob@example.com')
          ON CONFLICT DO NOTHING;
        `;
        
        await sql`
          INSERT INTO invoices (customer_id, amount, status) VALUES 
          (1, 666.00, 'paid'),
          (2, 500.00, 'pending'),
          (3, 666.00, 'paid'),
          (1, 300.00, 'pending')
          ON CONFLICT DO NOTHING;
        `;
        
        // Now execute the original query
        const result = await sql`
          SELECT invoices.amount, customers.name
          FROM invoices
          JOIN customers ON invoices.customer_id = customers.id
          WHERE invoices.amount = 666;
        `;
        
        return NextResponse.json({
          success: true,
          message: 'Sample tables created and query executed successfully',
          data: result,
          count: result.length
        });
        
      } catch (createError) {
        console.error('Error creating sample data:', createError);
        return NextResponse.json({
          success: false,
          error: 'Failed to create sample data',
          details: createError instanceof Error ? createError.message : 'Unknown error'
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({
      success: false,
      error: 'Database query failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Alternative query function for testing different scenarios
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { queryType } = body;
    
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    let result;
    let message;
    
    switch (queryType) {
      case 'customers':
        result = await sql`SELECT * FROM customers ORDER BY name`;
        message = 'All customers retrieved successfully';
        break;
        
      case 'invoices':
        result = await sql`SELECT * FROM invoices ORDER BY amount DESC`;
        message = 'All invoices retrieved successfully';
        break;
        
      case 'join':
        result = await sql`
          SELECT 
            customers.name, 
            customers.email, 
            invoices.amount, 
            invoices.status,
            invoices.created_at
          FROM customers 
          JOIN invoices ON customers.id = invoices.customer_id 
          ORDER BY invoices.amount DESC
        `;
        message = 'Customer-invoice join query executed successfully';
        break;
        
      case 'stats':
        result = await sql`
          SELECT 
            COUNT(*) as total_invoices,
            SUM(amount) as total_amount,
            AVG(amount) as average_amount,
            MAX(amount) as max_amount,
            MIN(amount) as min_amount
          FROM invoices
        `;
        message = 'Invoice statistics calculated successfully';
        break;
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid query type. Use: customers, invoices, join, or stats'
        }, { status: 400 });
    }
    
    return NextResponse.json({
      success: true,
      message,
      data: result,
      count: result.length
    });
    
  } catch (error) {
    console.error('Error executing custom query:', error);
    return NextResponse.json({
      success: false,
      error: 'Custom query failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
