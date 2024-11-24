import ScheduleForm from '@/app/components/admin/ScheduleForm';
import prisma from '@/app/lib/db';
import { Nurse, Patient } from '@/types/next-auth';

export default async function AddSchedulePage() {
  const nurses: Nurse[] = await prisma.nurse.findMany();
  const patients: Patient[] = await prisma.patient.findMany();

  return (
    <div>
      <h1 className="text-2xl mb-4">Add New Schedule</h1>
      <ScheduleForm nurses={nurses} patients={patients} />
    </div>
  );
}
