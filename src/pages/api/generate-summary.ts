import { getSession } from 'next-auth/react';
import { db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateSummary } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  const { fileId, text, folderId } = req.body;
  if (!fileId || !text || !folderId) return res.status(400).json({ error: 'Missing params' });

  const summary = await generateSummary(text);
  const noteId = `${Date.now()}-${fileId}`;
  await setDoc(doc(db, 'notes', noteId), {
    id: noteId,
    fileId,
    userId: session.user.id,
    folderId,
    summary,
    createdAt: serverTimestamp(),
  });
  res.status(200).json({ id: noteId, summary });
} 