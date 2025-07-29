import { getSession } from 'next-auth/react';
import { db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateFlashcards } from '../../lib/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  const { noteId, text } = req.body;
  if (!noteId || !text) return res.status(400).json({ error: 'Missing params' });

  const cardsText = await generateFlashcards(text);
  // Parse cardsText into array of { question, answer }
  const cards = cardsText.split(/\n\n|\nQ:/).filter(Boolean).map(card => {
    const [q, ...a] = card.split(/A:|Answer:/);
    return { question: q.replace(/^Q:/, '').trim(), answer: a.join('').trim() };
  });
  await setDoc(doc(db, 'flashcards', noteId), {
    id: noteId,
    noteId,
    userId: session.user.id,
    cards,
    createdAt: serverTimestamp(),
  });
  res.status(200).json({ id: noteId, cards });
} 