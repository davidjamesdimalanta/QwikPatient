'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Schedule } from '@/types/next-auth';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      const res = await fetch('/api/schedules');
      if (!res.ok) {
        console.error('Failed to fetch schedules');
        return;
      }
      const data = await res.json();
      setSchedules(data);
    }
    fetchSchedules();
  }, []);

  const handleDelete = async (scheduleId: string) => {
    const confirmed = confirm('Are you sure you want to delete this schedule?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/schedules/${scheduleId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        console.error('Failed to delete schedule');
        return;
      }
      setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div>
      <Link href="/admin/schedules/add">
        <button className="mb-4 bg-blue-500 text-white p-2 rounded">
          Add Schedule
        </button>
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nurse</th>
            <th className="py-2 px-4 border-b">Patient</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td className="py-2 px-4 border-b">{schedule.nurse?.name || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{`${schedule.patient?.first_name} ${schedule.patient?.last_name}` || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {new Date(schedule.date).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{schedule.status}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/admin/schedules/${schedule.id}/edit`}>
                  <button className="mr-2 text-blue-500">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(schedule.id)}
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
