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
    // Check environment variables
    const edgeConfigId = process.env.EDGE_CONFIG_ID;
    const apiToken = process.env.VERCEL_API_TOKEN;

    if (!edgeConfigId || !apiToken) {
      console.error('Missing environment variables:', {
        EDGE_CONFIG_ID: !!edgeConfigId,
        VERCEL_API_TOKEN: !!apiToken,
      });
      return NextResponse.json({ 
        error: 'Edge Config not properly configured',
        details: 'Missing required environment variables'
      }, { status: 500 });
    }

    const body = await request.json();
    
    console.log('Updating Edge Config:', edgeConfigId);
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    // Make request to Vercel Edge Config API
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const responseText = await response.text();
    console.log('Vercel API response status:', response.status);
    console.log('Vercel API response:', responseText);

    if (!response.ok) {
      console.error('Edge Config API error:', response.status, responseText);
      return NextResponse.json({ 
        error: `Edge Config API error: ${response.status}`,
        details: responseText,
        edgeConfigId: edgeConfigId
      }, { status: response.status });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      result = { success: true, raw: responseText };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating Edge Config:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update Edge Config',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
