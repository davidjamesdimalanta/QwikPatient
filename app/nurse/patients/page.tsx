import PatientList from '@/app/components/nurse/PatientList';

export default function NursePatientsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-4">My Patients</h1>
      <PatientList />
    </div>
  );
}
