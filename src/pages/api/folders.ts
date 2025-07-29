import { getSession } from 'next-auth/react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  if (req.method === 'GET') {
    const q = query(collection(db, 'folders'), where('userId', '==', session.user.id));
    const snap = await getDocs(q);
    const folders = snap.docs.map(doc => doc.data());
    return res.status(200).json({ folders });
  }
  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    const docRef = await addDoc(collection(db, 'folders'), {
      name,
      userId: session.user.id,
      createdAt: serverTimestamp(),
    });
    return res.status(200).json({ id: docRef.id, name });
  }
  res.status(405).end();
} 