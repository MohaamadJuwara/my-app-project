import { NextRequest, NextResponse } from 'next/server';
import { fetchCardData } from '../../../lib/data';

export async function GET(request: NextRequest) {
  try {
    const stats = await fetchCardData();
    
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching invoice stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice statistics' },
      { status: 500 }
    );
  }
}
