import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.isAdmin) router.replace('/dashboard');
  }, [session, status, router]);

  if (!session?.user?.isAdmin) return <div>Redirecting...</div>;
  return <AdminPanel user={session.user} />;
} 