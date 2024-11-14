import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { getNurseIdFromToken } from '@/app/lib/auth';


export async function GET(request: NextRequest) {
  const nurseId = await getNurseIdFromToken(request);

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
    patientName: `${visit.patient.first_name} ${visit.patient.last_name}`,
    date: visit.date,
  }));

  return NextResponse.json(response);
}
