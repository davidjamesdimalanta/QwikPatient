'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteNursePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    async function deleteNurse() {
      await fetch(`/api/nurses/${params.id}`, {
        method: 'DELETE',
      });
      router.push('/admin/nurses');
    }
    deleteNurse();
  }, [params.id, router]);

  return <div>Deleting nurse...</div>;
}
