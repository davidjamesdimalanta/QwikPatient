import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  const patients = await prisma.patient.findMany();
  return NextResponse.json(patients);
}

export async function POST(request: Request) {
  const { name, address, phone } = await request.json();
  const patient = await prisma.patient.create({
    data: { name, address, phone },
  });
  return NextResponse.json(patient);
}
