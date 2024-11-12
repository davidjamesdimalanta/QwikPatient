import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { confirmedByNurse } = await request.json();
  const visit = await prisma.visit.update({
    where: { id: params.id },
    data: { confirmedByNurse },
  });
  return NextResponse.json(visit);
}
