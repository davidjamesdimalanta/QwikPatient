import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, email, role } = await request.json();
  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, role },
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
