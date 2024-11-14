import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getNurseIdFromToken } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  const nurseId = await getNurseIdFromToken(request);
  const { patientId, date } = await request.json();

  if (!nurseId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const schedule = await prisma.schedule.create({
    data: {
      nurseId,
      patientId,
      date: new Date(date),
      status: 'pending',
    },
  });

  return NextResponse.json(schedule);
}
