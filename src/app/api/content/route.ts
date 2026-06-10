import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';

function verifyToken(request: NextRequest): boolean {
  const token = request.cookies.get('ujima_admin_token')?.value;
  if (!token) return false;
  try { jwt.verify(token, process.env.JWT_SECRET!); return true; }
  catch { return false; }
}

const contentDir = path.join(process.cwd(), 'content');

export async function GET(request: NextRequest) {
  if (!verifyToken(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const [newsRaw, eventsRaw, pagesRaw, settingsRaw] = await Promise.all([
    fs.readFile(path.join(contentDir, 'news.json'), 'utf-8'),
    fs.readFile(path.join(contentDir, 'events.json'), 'utf-8'),
    fs.readFile(path.join(contentDir, 'pages.json'), 'utf-8'),
    fs.readFile(path.join(contentDir, 'settings.json'), 'utf-8'),
  ]);

  return NextResponse.json({
    news: JSON.parse(newsRaw),
    events: JSON.parse(eventsRaw),
    pages: JSON.parse(pagesRaw),
    settings: JSON.parse(settingsRaw),
  });
}

export async function POST(request: NextRequest) {
  if (!verifyToken(request)) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { type, data } = await request.json();
  const allowed = ['news', 'events', 'pages', 'settings'];
  if (!allowed.includes(type)) return NextResponse.json({ message: 'Invalid type' }, { status: 400 });

  await fs.writeFile(path.join(contentDir, `${type}.json`), JSON.stringify(data, null, 2), 'utf-8');
  return NextResponse.json({ success: true });
}
