"use server";

import { cookies } from 'next/headers';

export async function login(password: string) {
  const validToken = process.env.ADMIN_SECRET_TOKEN;
  
  if (!validToken) {
    console.error("ADMIN_SECRET_TOKEN is not set in environment variables");
    return { success: false };
  }
  
  if (password === validToken) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  
  return { success: false };
}
