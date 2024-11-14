import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getNurseIdFromToken } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  const nurseId = await getNurseIdFromToken(request);

  if (!nurseId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const patients = await prisma.patient.findMany({
    where: {
      assignments: {
        some: { nurseId },
      },
    },
  });

  return NextResponse.json(patients);
}
