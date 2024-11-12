'use client';

import dynamic from 'next/dynamic';
const AssignPatients = dynamic(() => import('@/app/components/admin/AssignPatients'), {
  ssr: false
});

export default function AssignPatientsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Assign Patients to Nurses</h1>
      <AssignPatients />
    </div>
  );
}
