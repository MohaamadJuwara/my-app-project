import { NextRequest, NextResponse } from 'next/server';
import { fetchFilteredInvoices, createInvoice } from '../../lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const currentPage = parseInt(searchParams.get('page') || '1');
    
    const invoices = await fetchFilteredInvoices(query, currentPage);
    
    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_id, amount, status } = body;
    
    // Validate required fields
    if (!customer_id || !amount || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: customer_id, amount, status' },
        { status: 400 }
      );
    }
    
    const invoice = await createInvoice({
      customer_id: parseInt(customer_id),
      amount: parseFloat(amount),
      status,
      date: new Date().toISOString().split('T')[0]
    });
    
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
