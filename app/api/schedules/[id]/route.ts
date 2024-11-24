import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { Schedule } from '@/types/next-auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { nurseId, patientId, date, status } = await request.json();

  try {
    const updatedSchedule = await prisma.schedule.update({
      where: { id: params.id },
      data: {
        nurseId,
        patientId,
        date: new Date(date),
        status,
      },
      include: {
        nurse: true,
        patient: true,
      },
    });
    return NextResponse.json(updatedSchedule);
  } catch {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.schedule.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
  }
}
