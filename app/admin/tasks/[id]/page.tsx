import TaskForm from '@/app/components/admin/TaskForm';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { Task } from '@/types/next-auth';

interface EditTaskPageProps {
  params: { id: string };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });

  if (!task) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Edit Task</h1>
      <TaskForm task={task as Task} />
    </div>
  );
}
