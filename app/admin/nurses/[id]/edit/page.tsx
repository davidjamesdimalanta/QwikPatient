import NurseForm from '@/app/components/admin/NurseForm';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { Nurse } from '@/types/next-auth';

export default async function EditNursePage({ params }: { params: { id: string } }) {
  const nurse = await prisma.nurse.findUnique({ 
    where: { id: params.id }
  });

  if (!nurse) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Edit Nurse</h1>
      <NurseForm nurse={nurse as Nurse} />
    </div>
  );
}
