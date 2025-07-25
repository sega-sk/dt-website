import { NextResponse } from 'next/server';
import { ContentManager } from '@/lib/content-manager';

export async function GET() {
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
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

// Disable static generation and force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
