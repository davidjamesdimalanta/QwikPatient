import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, address, phone } = await request.json();
  const nurse = await prisma.nurse.update({
    where: { id: params.id },
    data: { name, address, phone },
  });
  return NextResponse.json(nurse);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.nurse.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
