import React from 'react';

function renderTree(data) {
  if (typeof data === 'string') return <span>{data}</span>;
  if (Array.isArray(data)) {
    return (
      <ul className="ml-4 list-disc">
        {data.map((item, i) => <li key={i}>{renderTree(item)}</li>)}
      </ul>
    );
  }
  if (typeof data === 'object' && data !== null) {
    return (
      <ul className="ml-4 list-none">
        {Object.entries(data).map(([k, v]) => (
          <li key={k}><b>{k}:</b> {renderTree(v)}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function MindMapView({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
      <h4 className="font-semibold mb-2">Mind Map</h4>
      <div>{renderTree(data)}</div>
    </div>
  );
} 