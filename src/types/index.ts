export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  isAdmin?: boolean;
  trialCount: number;
  subscription?: Subscription;
};

export type Folder = {
  id: string;
  name: string;
  userId: string;
  createdAt: number;
};

export type File = {
  id: string;
  name: string;
  url: string;
  folderId: string;
  userId: string;
  createdAt: number;
  summaryId?: string;
};

export type Note = {
  id: string;
  fileId: string;
  userId: string;
  folderId: string;
  summary: string;
  createdAt: number;
  flashcardsId?: string;
  mindMapId?: string;
};

export type Flashcard = {
  id: string;
  noteId: string;
  userId: string;
  cards: { question: string; answer: string }[];
  createdAt: number;
};

export type MindMap = {
  id: string;
  noteId: string;
  userId: string;
  data: any; // mind map structure (can be JSON)
  createdAt: number;
};

export type Subscription = {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'trialing' | 'past_due';
  priceId: string;
  currentPeriodEnd: number;
};

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: number;
  provider: 'stripe' | 'paypal' | 'kaspi' | 'other';
}; 