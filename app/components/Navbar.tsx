'use client'

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-satoshi font-bold">QWIKPATIENT Patient Management System</span>
        </Link>
        <div>
          {status === 'loading' ? (
            <span className="text-white">Loading...</span>
          ) : session ? (
            <>
              <span className="text-white mr-4">Hello, {session.user.name}</span>
              {session.user.role === 'nurse' && (
                <Link href="/nurse">
                  <span className="text-white mr-4">Dashboard</span>
                </Link>
              )}
              {session.user.role === 'admin' && (
                <Link href="/admin">
                  <span className="text-white mr-4">Admin Panel</span>
                </Link>
              )}
              {session.user.role === 'owner' && (
                <Link href="/owner/account">
                  <span className="text-white mr-4">Owner Account</span>
                </Link>
              )}
              <button onClick={() => signOut()} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="text-white">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 