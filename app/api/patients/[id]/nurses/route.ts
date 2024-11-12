import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const nurses = await prisma.nurse.findMany({
    where: {
      assignments: {
        some: {
          patientId: params.id
        }
      }
    }
  });

  return NextResponse.json(nurses);
}
