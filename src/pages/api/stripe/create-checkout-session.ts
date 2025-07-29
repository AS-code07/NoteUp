import { stripe, createCheckoutSessionParams } from '../../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  const session = await stripe.checkout.sessions.create(createCheckoutSessionParams(userId));
  res.status(200).json({ url: session.url });
} 