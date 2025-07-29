# NoteUp: Aesthetic Study Notes Generator

## 🚀 Features
- AI-powered summary, flashcard, and mind map generation (OpenAI)
- PDF upload (up to 50MB)
- User authentication (NextAuth.js + Firebase)
- Folder system for organizing notes
- Storage of uploads and summaries in Firebase
- Trial logic (2 free uploads for new users)
- Subscription/payment integration (Stripe, extensible to Kaspi/PayPal)
- Clean, responsive UI (Tailwind CSS, dark mode support)
- Admin panel for tracking users, files, and payments
- Custom domain support

## 🛠️ Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/NoteUp.git
   cd NoteUp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your secrets.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Set up Firebase:**
   - Create a Firebase project, enable Auth, Firestore, and Storage.
   - Add your config to `.env.local`.
6. **Set up Stripe:**
   - Create a Stripe account, get API keys, and add to `.env.local`.
7. **Set up OpenAI:**
   - Get your OpenAI API key and add to `.env.local`.
8. **(Optional) Configure custom domain:**
   - Follow your hosting provider's instructions (e.g., Vercel, Netlify).

## 📦 Environment Variables
See `.env.local.example` for all required variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT` (for admin panel)
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAILS` (comma-separated list)

## 🧑‍💻 Scripts
- `dev` – Start dev server
- `build` – Build for production
- `start` – Start production server
- `lint` – Lint code

## 🗂️ Project Structure
See the codebase for details. Main folders:
- `src/pages` – Next.js pages (API, dashboard, admin, etc.)
- `src/components` – React UI components
- `src/lib` – API clients, helpers
- `src/utils` – Utility functions
- `src/styles` – Tailwind/global CSS
- `src/types` – TypeScript types

---

For questions or support, open an issue or contact the maintainer. 