import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();

    const adminUser = (process.env.ADMIN_USER || 'admin').trim();
    const adminPassword = (process.env.ADMIN_PASSWORD || 'admin').trim();

    if (
      cleanUsername.toLowerCase() === adminUser.toLowerCase() &&
      cleanPassword === adminPassword
    ) {
      // Create response with redirect or success
      const response = NextResponse.json({ success: true, message: 'Login successful' });
      
      // Set HttpOnly cookie for 24 hours
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      // Set a non-expiring flag to know they were logged in previously
      response.cookies.set({
        name: 'was_logged_in',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
