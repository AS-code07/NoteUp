import React, { useEffect, useState } from 'react';

export default function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) return;
    Promise.all([
      fetch('/api/admin/users').then(r => r.json()),
      fetch('/api/admin/files').then(r => r.json()),
      fetch('/api/admin/payments').then(r => r.json()),
    ]).then(([u, f, p]) => {
      setUsers(u.users || []);
      setFiles(f.files || []);
      setPayments(p.payments || []);
      setLoading(false);
    });
  }, [user]);

  if (!user?.isAdmin) return null;
  if (loading) return <div>Loading admin data...</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Users</h3>
        <ul className="max-h-40 overflow-y-auto">
          {users.map(u => (
            <li key={u.id}>{u.email} ({u.trialCount} trials, {u.subscription?.status || 'no sub'})</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Files</h3>
        <ul className="max-h-40 overflow-y-auto">
          {files.map(f => (
            <li key={f.id}>{f.name} ({f.userId})</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Payments</h3>
        <ul className="max-h-40 overflow-y-auto">
          {payments.map(p => (
            <li key={p.id}>{p.userId} - {p.amount / 100} {p.currency} ({p.status})</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 