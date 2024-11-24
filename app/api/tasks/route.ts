import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/db';
import { Task } from '@/types/next-auth';

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      nurse: true,
      patient: true,
    },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const { title, status, dueDate, nurseId, patientId } = await request.json();

  const newTask = await prisma.task.create({
    data: {
      title,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      nurseId,
      patientId,
    },
    include: {
      nurse: true,
      patient: true,
    },
  });

  return NextResponse.json(newTask);
}
