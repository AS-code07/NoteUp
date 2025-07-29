import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.isAdmin = (process.env.ADMIN_EMAILS || '').split(',').includes(user.email || '');
      return session;
    },
  },
}); 