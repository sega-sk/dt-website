import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Use Vercel environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      cookies().set('admin-authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
