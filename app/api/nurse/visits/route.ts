import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getNurseIdFromToken } from '@/lib/auth';

export async function GET(request: Request) {
  const nurseId = getNurseIdFromToken(request);

  if (!nurseId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const visits = await prisma.visit.findMany({
    where: {
      nurseId,
      confirmedByNurse: false,
    },
    include: {
      patient: true,
    },
  });

  const response = visits.map((visit) => ({
    id: visit.id,
    patientName: visit.patient.name,
    date: visit.date,
  }));

  return NextResponse.json(response);
}
