import React, { useState } from 'react';

export default function FlashcardView({ cards }) {
  const [idx, setIdx] = useState(0);
  if (!cards || !cards.length) return <div>No flashcards.</div>;
  const card = cards[idx];
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
      <div className="mb-2"><b>Q:</b> {card.question}</div>
      <div className="mb-4"><b>A:</b> {card.answer}</div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
        >Prev</button>
        <button
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          onClick={() => setIdx(i => Math.min(cards.length - 1, i + 1))}
          disabled={idx === cards.length - 1}
        >Next</button>
      </div>
      <div className="text-xs text-gray-500 mt-2">{idx + 1} / {cards.length}</div>
    </div>
  );
} 