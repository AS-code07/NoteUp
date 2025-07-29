import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

export async function canUseTrial(userId: string) {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return true;
  const data = userSnap.data();
  return (data.trialCount ?? 0) < 2;
}

export async function incrementTrial(userId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { trialCount: increment(1) });
} 