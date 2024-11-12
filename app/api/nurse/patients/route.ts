import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getNurseIdFromToken } from '@/lib/auth';

export async function GET(request: Request) {
  const nurseId = getNurseIdFromToken(request);

  if (!nurseId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const patients = await prisma.patient.findMany({
    where: {
      Assignment: {
        some: { nurseId },
      },
    },
  });

  return NextResponse.json(patients);
}
