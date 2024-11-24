import ScheduleForm from '@/app/components/admin/ScheduleForm';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { Schedule, Nurse, Patient } from '@/types/next-auth';

interface EditSchedulePageProps {
  params: { id: string };
}

export default async function EditSchedulePage({ params }: EditSchedulePageProps) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
    include: {
      nurse: true,
      patient: true,
    },
  });

  if (!schedule) {
    notFound();
  }

  const nurses: Nurse[] = await prisma.nurse.findMany();
  const patients: Patient[] = await prisma.patient.findMany();

  return (
    <div>
      <h1 className="text-2xl mb-4">Edit Schedule</h1>
      <ScheduleForm schedule={schedule as Schedule} nurses={nurses} patients={patients} />
    </div>
  );
}
