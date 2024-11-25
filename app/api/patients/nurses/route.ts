import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
  const nurses = await prisma.nurse.findMany();
  return NextResponse.json(nurses);
}

export async function POST(request: Request) {
  const { name, address, phone } = await request.json();
  const nurse = await prisma.nurse.create({
    data: { name, address, phone },
  });
  return NextResponse.json(nurse);
}
