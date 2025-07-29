import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AuthButton from '../components/AuthButton';
import ThemeSelector from '../components/ThemeSelector';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-minimal-bg dark:bg-gray-900 transition-colors">
      <ThemeSelector />
      <img src="/logo.svg" alt="NoteUp Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-4xl font-bold mb-2 text-minimal-text dark:text-white">Aesthetic Study Notes Generator</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
        Upload your textbooks or notes, and let AI create beautiful, personalized study materials in minutes.
      </p>
      <div className="mb-4">
        <AuthButton />
      </div>
      {session && (
        <Link href="/dashboard" className="text-blue-600 underline dark:text-blue-400">Go to Dashboard</Link>
      )}
    </div>
  );
} 