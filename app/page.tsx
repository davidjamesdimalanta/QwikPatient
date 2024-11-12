'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Button from './components/ui/button';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();

        if (data.isLoggedIn) {
          if (data.role === 'admin') {
            router.replace('/admin');
          } else if (data.role === 'nurse') {
            router.replace('/nurse');
          } else if (data.role === 'owner') {
            router.replace('/owner/account');
          } else {
            router.replace('/login');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        router.replace('/error');
      }
    }

    checkAuth();
  }, [router]);

  const handleSignIn = async (role: string) => {
    try {
      const result = await signIn('google', {
        redirect: true,
        callbackUrl: `/${role}`,
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
      }
    } catch (error) {
      console.error('Sign in exception:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-6xl font-museomoderno text-black">QwikPatient</h1>
          <Image
            src="/qwik.svg"
            alt="Qwik Logo"
            width={48}
            height={48}
            priority
          />
        </div>
        <h4 className="text-xl font-satoshi text-gray-600 mb-8">
          Welcome to Streamlined Patient Management
        </h4>
        <div className="flex flex-col items-center space-y-8 p-12 ">
          <Button onClick={() => handleSignIn('admin')}> 
            Login as Admin
          </Button>
          <Button onClick={() => handleSignIn('nurse')}> 
            Login as Nurse
          </Button>
          <Button onClick={() => handleSignIn('owner')}> 
            Login as Owner
          </Button>
        </div>
      </div>
    </div>
  );
}
