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
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load content' },
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
    const updatedContent = await ContentManager.updateContent(updates);
    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
