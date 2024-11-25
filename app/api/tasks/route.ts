import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      nurse: true,
      patient: true,
    },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  try {
    const { title, status, dueDate, nurseId, patientId } = await request.json();

    // Validate Nurse
    const nurse = await prisma.nurse.findUnique({ where: { id: nurseId } });
    if (!nurse) {
      return NextResponse.json({ error: 'Invalid nurseId' }, { status: 400 });
    }

    // Validate Patient
    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ error: 'Invalid patientId' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
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

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
