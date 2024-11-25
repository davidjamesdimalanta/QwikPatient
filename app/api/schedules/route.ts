import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
  const schedules = await prisma.schedule.findMany({
    include: {
      nurse: true,
      patient: true,
    },
  });
  return NextResponse.json(schedules);
}

export async function POST(request: NextRequest) {
  try {
    const { nurseId, patientId, date, status } = await request.json();

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

    const newSchedule = await prisma.schedule.create({
      data: {
        nurseId,
        patientId,
        date: new Date(date),
        status: status || 'pending',
      },
      include: {
        nurse: true,
        patient: true,
      },
    });

    return NextResponse.json(newSchedule, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
