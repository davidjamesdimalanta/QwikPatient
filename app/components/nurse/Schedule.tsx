'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface Patient {
  id: string;
  name: string;
}

export default function Schedule() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchPatients() {
      const res = await fetch('/api/nurse/patients');
      const data = await res.json();
      setPatients(data);
    }
    fetchPatients();
  }, []);

  const handleSchedule = async () => {
    await fetch('/api/schedules', {
      method: 'POST',
      body: JSON.stringify({ patientId: selectedPatient, date }),
    });
    // Optionally, provide feedback to the user
  };

  return (
    <div>
      <div className="mb-4">
        <label>Patient:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label>Date:</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleSchedule} className="bg-blue-500 text-white p-2 rounded">
        Schedule Visit
      </button>
    </div>
  );
}
