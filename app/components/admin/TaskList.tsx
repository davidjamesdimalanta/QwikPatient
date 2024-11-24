import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from '@/types/next-auth';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <Link href="/admin/tasks/add">
        <button className="mb-4 bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="py-2 px-4 border-b">{task.title}</td>
              <td className="py-2 px-4 border-b">{task.status}</td>
              <td className="py-2 px-4 border-b">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                <Link href={`/admin/tasks/${task.id}/edit`}>
                  <button className="mr-2 text-blue-500">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
