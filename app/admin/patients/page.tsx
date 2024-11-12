import PatientList from '@/components/PatientList';

export default function PatientsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Patients</h1>
      <PatientList />
    </div>
  );
}