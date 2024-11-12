import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getNurseIdFromToken } from '@/lib/auth';

export async function POST(request: Request) {
  const nurseId = getNurseIdFromToken(request);
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
