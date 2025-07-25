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

    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasEdgeConfigId: !!edgeConfigId,
      hasApiToken: !!apiToken,
      edgeConfigIdPrefix: edgeConfigId ? edgeConfigId.substring(0, 8) + '...' : 'missing'
    });

    if (!edgeConfigId || !apiToken) {
      console.error('Missing environment variables:', {
        EDGE_CONFIG_ID: !!edgeConfigId,
        VERCEL_API_TOKEN: !!apiToken,
      });
      
      return NextResponse.json({ 
        error: 'Edge Config not properly configured',
        details: 'Missing required environment variables',
        requiredVars: ['EDGE_CONFIG_ID', 'VERCEL_API_TOKEN']
      }, { status: 500 });
    }

    const body = await request.json();
    
    console.log('Updating Edge Config:', edgeConfigId);
    console.log('Request body keys:', Object.keys(body));
    
    // Validate the request body
    if (!body.items || !Array.isArray(body.items)) {
      return NextResponse.json({ 
        error: 'Invalid request body',
        details: 'Expected items array'
      }, { status: 400 });
    }
    
    // Make request to Vercel Edge Config API
    const apiUrl = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`;
    console.log('Making request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('Vercel API response status:', response.status);
    console.log('Vercel API response:', responseText);

    if (!response.ok) {
      console.error('Edge Config API error:', response.status, responseText);
      return NextResponse.json({ 
        error: `Edge Config API error: ${response.status}`,
        details: responseText,
        edgeConfigId: edgeConfigId,
        apiUrl: apiUrl
      }, { status: response.status });
    }

    let result;
    try {
      result = responseText ? JSON.parse(responseText) : { success: true };
    } catch (parseError) {
      console.warn('Could not parse response JSON, treating as success:', parseError);
      result = { success: true, raw: responseText };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating Edge Config:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update Edge Config',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
