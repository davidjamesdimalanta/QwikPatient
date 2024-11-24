'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function fetchPatients() {
      const res = await fetch('/api/patients');
      const data = await res.json();
      setPatients(data);
    }
    fetchPatients();
  }, []);

  return (
    <div>
      <Link href="/admin/patients/add">
        <button className="mb-4 bg-blue-500 text-white p-2 rounded">
          Add Patient
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
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="py-2 px-4 border-b">{`${patient.first_name} ${patient.last_name}`}</td>
              <td className="py-2 px-4 border-b">{patient.address}</td>
              <td className="py-2 px-4 border-b">{patient.phone}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/admin/patients/${patient.id}/edit`}>
                  <button className="mr-2 text-blue-500">Edit</button>
                </Link>
                <Link href={`/admin/patients/${patient.id}/delete`}>
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