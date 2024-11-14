import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function POST(request: Request) {
  const userCount = await prisma.user.count();
  
  if (userCount > 0) {
    return NextResponse.json(
      { error: 'Setup has already been completed' },
      { status: 400 }
    );
  }

  const { email, name } = await request.json();

  await prisma.user.create({
    data: {
      email,
      name,
      role: 'owner',
    },
  });

  return NextResponse.json({ success: true });
}
