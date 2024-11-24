import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Nurse, Patient, Schedule } from '@/types/next-auth';

interface ScheduleFormProps {
  schedule?: Schedule;
  nurses: Nurse[];
  patients: Patient[];
}

export default function ScheduleForm({ schedule, nurses, patients }: ScheduleFormProps) {
  const [nurseId, setNurseId] = useState(schedule?.nurseId || '');
  const [patientId, setPatientId] = useState(schedule?.patientId || '');
  const [date, setDate] = useState(
    schedule?.date ? new Date(schedule.date).toISOString().substring(0, 16) : ''
  );
  const [status, setStatus] = useState(schedule?.status || 'pending');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nurseId,
      patientId,
      date: new Date(date),
      status,
    };

    await fetch(schedule ? `/api/schedules/${schedule.id}` : '/api/schedules', {
      method: schedule ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    router.push('/admin/schedules');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block">Nurse</label>
        <select
          className="w-full p-2 border rounded"
          value={nurseId}
          onChange={e => setNurseId(e.target.value)}
          required
        >
          <option value="">Select a nurse</option>
          {nurses.map(nurse => (
            <option key={nurse.id} value={nurse.id}>
              {nurse.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Patient</label>
        <select
          className="w-full p-2 border rounded"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          required
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {`${patient.first_name} ${patient.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Date</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
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
          <option value="confirmed">Confirmed</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {schedule ? 'Update Schedule' : 'Create Schedule'}
      </button>
    </form>
  );
}
