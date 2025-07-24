import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin-authenticated');
  return authCookie?.value === 'true';
}

export async function POST(request: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Make request to Vercel Edge Config API
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Edge Config API error:', error);
      throw new Error(`Edge Config API error: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating Edge Config:', error);
    return NextResponse.json(
      { error: 'Failed to update Edge Config' },
      { status: 500 }
    );
  }
}
