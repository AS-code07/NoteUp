import React, { useRef, useState } from 'react';

export default function FileUpload({ folderId, onUpload }) {
  const fileInput = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large (max 50MB)');
      return;
    }
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', folderId);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      onUpload(data);
      fileInput.current.value = '';
    } else {
      setError(data.error || 'Upload failed');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="application/pdf"
        ref={fileInput}
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        disabled={uploading}
      />
      {uploading && <div className="text-blue-600 mt-2">Uploading...</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
} 