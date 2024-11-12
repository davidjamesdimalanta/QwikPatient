import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email, role } = await request.json();
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      role,
    },
  });
  return NextResponse.json(newUser);
}
