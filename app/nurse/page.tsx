import Link from 'next/link';

export default function NurseDashboard() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Nurse Dashboard</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/nurse/patients" className="text-blue-500 hover:underline">
            My Patients
          </Link>
        </li>
        <li>
          <Link href="/nurse/schedule" className="text-blue-500 hover:underline">
            Schedule Visits
          </Link>
        </li>
        <li>
          <Link href="/nurse/visit/confirm" className="text-blue-500 hover:underline">
            Confirm Visits
          </Link>
        </li>
      </ul>
    </div>
  );
}
