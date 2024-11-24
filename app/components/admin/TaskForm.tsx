import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/next-auth';

interface TaskFormProps {
  task?: Task;
}

export default function TaskForm({ task }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState(task?.status || 'pending');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().substring(0, 16) : ''
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
    };

    await fetch(task ? `/api/tasks/${task.id}` : '/api/tasks', {
      method: task ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    router.push('/admin/tasks');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Status</label>
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Due Date</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {task ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
