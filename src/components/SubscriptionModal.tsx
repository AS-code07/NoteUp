import React from 'react';

export default function SubscriptionModal({ open, onClose, onSubscribe }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You’ve reached your free trial limit. Subscribe for unlimited note generation, flashcards, mind maps, and more!
        </p>
        <button
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
          onClick={onSubscribe}
        >
          Subscribe Now
        </button>
        <button
          className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 