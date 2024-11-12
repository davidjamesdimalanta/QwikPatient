'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestAuth() {
  const { data: session, status } = useSession();
  const [serverCheck, setServerCheck] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/test');
      const data = await res.json();
      setServerCheck(data);
    };
    checkAuth();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Auth Test Page</h1>
      
      <div className="mb-4">
        <h2 className="font-bold">Client Status:</h2>
        <pre>{JSON.stringify({ status, session }, null, 2)}</pre>
      </div>
      
      <div>
        <h2 className="font-bold">Server Check:</h2>
        <pre>{JSON.stringify(serverCheck, null, 2)}</pre>
      </div>
    </div>
  );
}
