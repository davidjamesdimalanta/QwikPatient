'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      const role = session.user.role;
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'nurse') {
        router.push('/nurse');
      } else if (role === 'owner') {
        router.push('/owner/account');
      }
    }
  }, [session, status, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/'
      });
      
      if (result?.error) {
        setError(result.error);
        console.error('Sign in error:', result.error);
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setError('An error occurred during sign in');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
