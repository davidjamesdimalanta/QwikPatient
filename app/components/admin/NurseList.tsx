'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nurse } from '@/types/next-auth';

export default function NurseList() {
  const [nurses, setNurses] = useState<Nurse[]>([]);

  useEffect(() => {
    async function fetchNurses() {
      const res = await fetch('/api/nurses');
      const data = await res.json();
      setNurses(data);
    }
    fetchNurses();
  }, []);

  return (
    <div>
      <Link href="/admin/nurses/add">
        <button className="mb-4 bg-blue-500 text-white p-2 rounded">
          Add Nurse
        </button>
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) => (
            <tr key={nurse.id}>
              <td className="py-2 px-4 border-b">{nurse.name}</td>
              <td className="py-2 px-4 border-b">{nurse.address}</td>
              <td className="py-2 px-4 border-b">{nurse.phone}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/admin/nurses/${nurse.id}/edit`}>
                  <button className="mr-2 text-blue-500">Edit</button>
                </Link>
                <Link href={`/admin/nurses/${nurse.id}/delete`}>
                  <button className="text-red-500">Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
