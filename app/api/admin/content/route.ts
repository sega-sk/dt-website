import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ContentManager } from '@/lib/content-manager';

async function checkAuth() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin-authenticated');
  return authCookie?.value === 'true';
}

export async function GET() {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const content = await ContentManager.loadContent();
    
    const response = NextResponse.json(content);
    
    // Add cache-busting headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('ETag', `"${Date.now()}"`);
    
    return response;
  } catch (error) {
    console.error('Error loading content from Vercel storage:', error);
    return NextResponse.json(
      { error: 'Failed to load content from Vercel storage' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await request.json();
    console.log('Received content update request:', Object.keys(updates));
    
    const updatedContent = await ContentManager.updateContent(updates);
    
    const response = NextResponse.json({
      ...updatedContent,
      _message: 'Content updated successfully and saved to Vercel Edge Config',
      _timestamp: Date.now()
    });
    
    // Add cache-busting headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('ETag', `"${Date.now()}"`);
    
    return response;
  } catch (error) {
    console.error('Error updating content in Vercel storage:', error);
    return NextResponse.json(
      { error: 'Failed to update content in Vercel storage' },
      { status: 500 }
    );
  }
}

// Disable static generation and force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
