import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const validUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET!;

  if (username !== validUsername || !passwordHash) {
    return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, passwordHash);
  if (!valid) {
    return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: '24h' });

  const response = NextResponse.json({ success: true });
  response.cookies.set('ujima_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}
