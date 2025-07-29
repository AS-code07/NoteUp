import React from 'react';

export default function NoteViewer({ note, onGenerateFlashcards, onGenerateMindMap, flashcards, mindMap }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">Summary</h3>
      <div className="whitespace-pre-line mb-4 text-gray-800 dark:text-gray-100">{note.summary}</div>
      <div className="flex gap-2 mb-2">
        <button
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onGenerateFlashcards}
        >
          Generate Flashcards
        </button>
        <button
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={onGenerateMindMap}
        >
          Generate Mind Map
        </button>
      </div>
      {flashcards && (
        <div className="mt-4">
          <h4 className="font-semibold mb-1">Flashcards</h4>
          <ul className="list-disc ml-6">
            {flashcards.cards.map((card, i) => (
              <li key={i}><b>Q:</b> {card.question}<br /><b>A:</b> {card.answer}</li>
            ))}
          </ul>
        </div>
      )}
      {mindMap && (
        <div className="mt-4">
          <h4 className="font-semibold mb-1">Mind Map</h4>
          <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto text-xs">{JSON.stringify(mindMap.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 