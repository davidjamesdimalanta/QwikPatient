'use client';

import { useEffect, useState } from 'react';

interface Nurse {
  id: string;
  name: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
}

export default function AssignPatients() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedNurse, setSelectedNurse] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [nursesRes, patientsRes] = await Promise.all([
        fetch('/api/nurses'),
        fetch('/api/patients'),
      ]);
      const [nursesData, patientsData] = await Promise.all([
        nursesRes.json(),
        patientsRes.json(),
      ]);
      setNurses(nursesData);
      setPatients(patientsData);
    }
    fetchData();
  }, []);

  const handleAssignment = async () => {
    await fetch('/api/assignments', {
      method: 'POST',
      body: JSON.stringify({ nurseId: selectedNurse, patientIds: selectedPatients }),
    });
    // Optionally, provide feedback to the user
  };

  return (
    <div>
      <div className="mb-4">
        <label>Nurse:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedNurse}
          onChange={(e) => setSelectedNurse(e.target.value)}
        >
          <option value="">Select a nurse</option>
          {nurses.map((nurse) => (
            <option key={nurse.id} value={nurse.id}>
              {nurse.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label>Patients:</label>
        <div className="border rounded p-2 max-h-64 overflow-y-scroll">
          {patients.map((patient) => (
            <div key={patient.id}>
              <p>{`${patient.first_name} ${patient.last_name}`}</p>
              <input
                type="checkbox"
                id={`patient-${patient.id}`}
                value={patient.id}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setSelectedPatients((prev) =>
                    checked ? [...prev, value] : prev.filter((id) => id !== value)
                  );
                }}
              />
              <label htmlFor={`patient-${patient.id}`}>{`${patient.first_name} ${patient.last_name}`}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleAssignment} className="bg-blue-500 text-white p-2 rounded">
        Assign
      </button>
    </div>
  );
}
