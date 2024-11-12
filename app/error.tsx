'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl mb-4">An error occurred</h1>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
