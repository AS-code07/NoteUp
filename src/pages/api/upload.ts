import { getSession } from 'next-auth/react';
import { db, storage } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import formidable from 'formidable';
import { canUseTrial, incrementTrial } from '../../utils/trial';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  const form = new formidable.IncomingForm({ maxFileSize: 50 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'File too large or invalid' });
    const file = files.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Check trial/subscription logic here (pseudo):
    const canTrial = await canUseTrial(session.user.id);
    // TODO: Check subscription status from Firestore
    if (!canTrial) return res.status(402).json({ error: 'Trial limit reached' });

    // Upload to Firebase Storage
    const storageRef = ref(storage, `uploads/${session.user.id}/${file.originalFilename}`);
    const data = await fs.promises.readFile(file.filepath);
    await uploadBytes(storageRef, data);
    const url = await getDownloadURL(storageRef);

    // Create File doc
    const fileId = `${Date.now()}-${file.originalFilename}`;
    await setDoc(doc(db, 'files', fileId), {
      id: fileId,
      name: file.originalFilename,
      url,
      userId: session.user.id,
      createdAt: serverTimestamp(),
    });
    await incrementTrial(session.user.id);
    res.status(200).json({ id: fileId, name: file.originalFilename, url });
  });
} 