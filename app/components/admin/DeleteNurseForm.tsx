'use client';

import { useEffect, useState } from 'react';
import { Nurse } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
  nurseId: string;
}

export default function DeleteNurseForm({ nurseId }: Props) {
  const [nurse, setNurse] = useState<Nurse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNurse = async () => {
      const response = await fetch(`/api/nurses/${nurseId}`);
      if (!response.ok) return;
      const data = await response.json();
      setNurse(data);
    };
    fetchNurse();
  }, [nurseId]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/nurses/${nurseId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        router.push('/admin/nurses');
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting nurse:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!nurse) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Delete Nurse</h2>
      <p className="mb-4">
        Are you sure you want to delete {nurse.name}?
      </p>
      <form onSubmit={handleDelete}>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Nurse'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
