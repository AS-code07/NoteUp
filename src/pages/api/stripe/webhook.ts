import { buffer } from 'micro';
import { stripe } from '../../../lib/stripe';
import { adminDb } from '../../../lib/firebase';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle subscription events
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
    const subscription = event.data.object;
    const userId = subscription.metadata.userId;
    await adminDb.collection('users').doc(userId).update({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        currentPeriodEnd: subscription.current_period_end * 1000,
      },
    });
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    await adminDb.collection('payments').add({
      id: session.id,
      userId,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      createdAt: Date.now(),
      provider: 'stripe',
    });
  }
  res.status(200).json({ received: true });
} 