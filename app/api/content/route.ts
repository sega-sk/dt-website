import { NextResponse } from 'next/server';
import { ContentManager } from '@/lib/content-manager';

export async function GET() {
  try {
    const content = await ContentManager.loadContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error loading content from Vercel storage:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}
