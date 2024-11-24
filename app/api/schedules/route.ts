import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getNurseIdFromToken } from '@/app/lib/auth';
import { Schedule } from '@/types/next-auth';

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
  const { nurseId, patientId, date, status } = await request.json();

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

  return NextResponse.json(newSchedule);
}
