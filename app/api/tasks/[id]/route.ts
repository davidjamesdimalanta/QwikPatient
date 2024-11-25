import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, status, dueDate, nurseId, patientId } = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: {
        title,
        status,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        nurseId,
        patientId,
      },
      include: {
        nurse: true,
        patient: true,
      },
    });
    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}
