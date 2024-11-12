'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Nurse {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export default function PatientNursesPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const params = useParams();
  const patientId = params.id;

  useEffect(() => {
    async function fetchNurses() {
      const res = await fetch(`/api/patients/${patientId}/nurses`);
      const data = await res.json();
      setNurses(data);
    }
    fetchNurses();
  }, [patientId]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Assigned Nurses</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) => (
            <tr key={nurse.id}>
              <td className="py-2 px-4 border-b">{nurse.name}</td>
              <td className="py-2 px-4 border-b">{nurse.address}</td>
              <td className="py-2 px-4 border-b">{nurse.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
