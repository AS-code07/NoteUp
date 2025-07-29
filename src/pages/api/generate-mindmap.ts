import { getSession } from 'next-auth/react';
import { db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateMindMap } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  const { noteId, text } = req.body;
  if (!noteId || !text) return res.status(400).json({ error: 'Missing params' });

  const mindMapJson = await generateMindMap(text);
  let data;
  try {
    data = JSON.parse(mindMapJson);
  } catch {
    data = mindMapJson;
  }
  await setDoc(doc(db, 'mindmaps', noteId), {
    id: noteId,
    noteId,
    userId: session.user.id,
    data,
    createdAt: serverTimestamp(),
  });
  res.status(200).json({ id: noteId, data });
} 