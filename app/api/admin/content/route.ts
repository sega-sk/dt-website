import { NextRequest, NextResponse } from 'next/server';
import { ContentManager } from '@/lib/content-manager';
import { cookies } from 'next/headers';

function isAuthenticated() {
  return cookies().get('admin-authenticated')?.value === 'true';
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const content = await ContentManager.loadContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const updates = await request.json();
    const updatedContent = await ContentManager.updateContent(updates);
    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
