import React, { useEffect, useState } from 'react';

export default function FolderList({ userId, onSelect, selectedFolder }) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    fetch('/api/folders')
      .then(res => res.json())
      .then(data => {
        setFolders(data.folders || []);
        setLoading(false);
      });
  }, []);

  const createFolder = async () => {
    if (!newFolder.trim()) return;
    const res = await fetch('/api/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newFolder }),
    });
    const data = await res.json();
    setFolders([...folders, { id: data.id, name: newFolder }]);
    setNewFolder('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Your Folders</h2>
      <div className="flex mb-2">
        <input
          className="flex-1 px-2 py-1 border rounded-l bg-white dark:bg-gray-800"
          placeholder="New folder name"
          value={newFolder}
          onChange={e => setNewFolder(e.target.value)}
        />
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded-r hover:bg-blue-700"
          onClick={createFolder}
        >
          +
        </button>
      </div>
      {loading ? (
        <div>Loading folders...</div>
      ) : (
        <ul>
          {folders.map(folder => (
            <li
              key={folder.id}
              className={`cursor-pointer px-2 py-1 rounded mb-1 ${selectedFolder === folder.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => onSelect(folder.id)}
            >
              {folder.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 