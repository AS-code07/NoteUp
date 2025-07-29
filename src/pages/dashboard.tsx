import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import FolderList from '../components/FolderList';
import FileUpload from '../components/FileUpload';
import NoteViewer from '../components/NoteViewer';
import FlashcardView from '../components/FlashcardView';
import MindMapView from '../components/MindMapView';
import SubscriptionModal from '../components/SubscriptionModal';
import AdminPanel from '../components/AdminPanel';

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [mindMap, setMindMap] = useState(null);
  const [showSubModal, setShowSubModal] = useState(false);
  const [canUpload, setCanUpload] = useState(true);

  useEffect(() => {
    if (!session) return;
    // Fetch files and notes for selected folder
    if (selectedFolder) {
      fetch(`/api/files?folderId=${selectedFolder}`)
        .then(res => res.json())
        .then(data => setFiles(data.files || []));
      fetch(`/api/notes?folderId=${selectedFolder}`)
        .then(res => res.json())
        .then(data => setNotes(data.notes || []));
    }
    // Check trial/subscription
    fetch('/api/user/can-upload')
      .then(res => res.json())
      .then(data => setCanUpload(data.canUpload));
  }, [session, selectedFolder]);

  const handleUpload = file => {
    // After upload, refresh file list
    fetch(`/api/files?folderId=${selectedFolder}`)
      .then(res => res.json())
      .then(data => setFiles(data.files || []));
  };

  const handleGenerateSummary = async file => {
    // Extract text from PDF (client or server)
    const text = await extractTextFromPDF(file.url); // implement this helper
    const res = await fetch('/api/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId: file.id, text, folderId: selectedFolder }),
    });
    const data = await res.json();
    setNotes([...notes, { id: data.id, summary: data.summary }]);
  };

  const handleGenerateFlashcards = async () => {
    if (!selectedNote) return;
    const res = await fetch('/api/generate-flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteId: selectedNote.id, text: selectedNote.summary }),
    });
    const data = await res.json();
    setFlashcards(data);
  };

  const handleGenerateMindMap = async () => {
    if (!selectedNote) return;
    const res = await fetch('/api/generate-mindmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteId: selectedNote.id, text: selectedNote.summary }),
    });
    const data = await res.json();
    setMindMap(data);
  };

  if (!session) return <div className="p-8">Please sign in to access your dashboard.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Your Study Workspace</h1>
      <FolderList
        userId={session.user.id}
        onSelect={setSelectedFolder}
        selectedFolder={selectedFolder}
      />
      {selectedFolder && (
        <>
          <FileUpload folderId={selectedFolder} onUpload={handleUpload} />
          {!canUpload && (
            <SubscriptionModal
              open={!canUpload}
              onClose={() => setShowSubModal(false)}
              onSubscribe={() => {
                // Start Stripe checkout
                fetch('/api/stripe/create-checkout-session', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId: session.user.id }),
                })
                  .then(res => res.json())
                  .then(data => {
                    if (data.url) window.location.href = data.url;
                  });
              }}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Files</h2>
              <ul>
                {files.map(file => (
                  <li key={file.id} className="mb-2 flex items-center justify-between">
                    <span>{file.name}</span>
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleGenerateSummary(file)}
                    >
                      Generate Summary
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Notes</h2>
              <ul>
                {notes.map(note => (
                  <li
                    key={note.id}
                    className={`mb-2 cursor-pointer px-2 py-1 rounded ${selectedNote?.id === note.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={() => setSelectedNote(note)}
                  >
                    {note.summary.slice(0, 60)}...
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedNote && (
            <NoteViewer
              note={selectedNote}
              onGenerateFlashcards={handleGenerateFlashcards}
              onGenerateMindMap={handleGenerateMindMap}
              flashcards={flashcards}
              mindMap={mindMap}
            />
          )}
        </>
      )}
      {session.user.isAdmin && <AdminPanel user={session.user} />}
    </div>
  );
}

// Helper: extract text from PDF (client-side, fallback to server if needed)
async function extractTextFromPDF(url) {
  // You can use pdfjs-dist or call a backend API for extraction
  // For MVP, just return a placeholder
  return 'PDF text extraction not implemented in MVP.';
} 