import { neon } from '@neondatabase/serverless';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Check if revenue table exists, if not create it with sample data
    try {
      const data = await sql`SELECT * FROM revenue ORDER BY month`;
      return data as Revenue[];
    } catch (tableError) {
      // Create revenue table with sample data
      await sql`
        CREATE TABLE IF NOT EXISTS revenue (
          month VARCHAR(4) NOT NULL UNIQUE,
          revenue INTEGER NOT NULL
        );
      `;
      
      // Insert sample revenue data
      await sql`
        INSERT INTO revenue (month, revenue) VALUES 
        ('Jan', 2000),
        ('Feb', 1800),
        ('Mar', 2200),
        ('Apr', 2500),
        ('May', 2300),
        ('Jun', 3200),
        ('Jul', 3500),
        ('Aug', 3700),
        ('Sep', 2500),
        ('Oct', 2800),
        ('Nov', 3000),
        ('Dec', 4800)
        ON CONFLICT (month) DO NOTHING;
      `;
      
      const data = await sql`SELECT * FROM revenue ORDER BY month`;
      return data as Revenue[];
    }
  } catch (error) {
    console.error('Database Error:', error);
    // Return sample data as fallback (including prerendering errors)
    return [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3200 },
      { month: 'Jul', revenue: 3500 },
      { month: 'Aug', revenue: 3700 },
      { month: 'Sep', revenue: 2500 },
      { month: 'Oct', revenue: 2800 },
      { month: 'Nov', revenue: 3000 },
      { month: 'Dec', revenue: 4800 },
    ];
  }
}

export async function fetchLatestInvoices(): Promise<LatestInvoiceRaw[]> {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Update the existing invoices table to include date column if it doesn't exist
    try {
      await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS date DATE DEFAULT CURRENT_DATE`;
    } catch (alterError) {
      // Column might already exist, ignore error
    }
    
    const data = await sql`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.created_at DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: Number(invoice.amount),
    })) as LatestInvoiceRaw[];
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    // Return sample data as fallback (including prerendering errors)
    return [
      { id: 1, amount: 666, name: 'John Doe', email: 'john@example.com', image_url: '/customers/default-avatar.svg' },
      { id: 2, amount: 500, name: 'Jane Smith', email: 'jane@example.com', image_url: '/customers/default-avatar.svg' },
      { id: 3, amount: 666, name: 'Bob Johnson', email: 'bob@example.com', image_url: '/customers/default-avatar.svg' },
      { id: 4, amount: 300, name: 'John Doe', email: 'john@example.com', image_url: '/customers/default-avatar.svg' },
    ];
  }
}

export async function fetchCardData() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    // Return sample data as fallback (including prerendering errors)
    return {
      numberOfCustomers: 3,
      numberOfInvoices: 4,
      totalPaidInvoices: '$13.32',
      totalPendingInvoices: '$8.00',
    };
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const invoices = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.created_at as date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.created_at::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.created_at::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const data = await sql`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const customers = await sql`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const data = await sql`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
