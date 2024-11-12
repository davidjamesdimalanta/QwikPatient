'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Nurse {
  name: string;
  address: string;
  phone: string;
  // Add other properties if needed
}

export default function NurseForm({ nurse }: { nurse?: Nurse }) {
  const [name, setName] = useState(nurse?.name || '');
  const [address, setAddress] = useState(nurse?.address || '');
  const [phone, setPhone] = useState(nurse?.phone || '');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/nurses', {
      method: nurse ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, address, phone }),
    });

    router.push('/admin/nurses');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Phone</label>
        <input
          type="tel"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
}
