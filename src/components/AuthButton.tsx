import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <button className="btn btn-primary" disabled>Loading...</button>;

  if (!session) {
    return (
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => signIn('google')}
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
} 