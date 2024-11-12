'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface Visit {
  id: string;
  patientName: string;
  date: string;
}

export default function ConfirmVisit() {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    async function fetchVisits() {
      const res = await fetch('/api/nurse/visits');
      const data = await res.json();
      setVisits(data);
    }
    fetchVisits();
  }, []);

  const handleConfirm = async (visitId: string) => {
    await fetch(`/api/visits/${visitId}`, {
      method: 'PUT',
      body: JSON.stringify({ confirmedByNurse: true }),
    });
    setVisits((prev) => prev.filter((visit) => visit.id !== visitId));
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Patient</th>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {visits.map((visit) => (
          <tr key={visit.id}>
            <td className="py-2 px-4 border-b">{visit.patientName}</td>
            <td className="py-2 px-4 border-b">{new Date(visit.date).toLocaleString()}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleConfirm(visit.id)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Confirm
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
