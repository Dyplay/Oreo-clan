// pages/status.js

import { useState } from 'react';

const StatusPage = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const fetchStatus = async () => {
    try {
      const response = await fetch(`/api/getStatus?username=${username}`);
      const data = await response.json();
      if (response.ok) {
        setStatus(data.status || 'Received');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setMessage('Error fetching status');
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch('/api/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus);
        setMessage('Status updated');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating status');
    }
  };

  return (
    <div className="container">
      <h1>Application Status</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <button onClick={fetchStatus}>Get Status</button>
      <div>
        <h2>Current Status: {status}</h2>
        <button onClick={() => updateStatus('Reviewing')}>Set to Reviewing</button>
        <button onClick={() => updateStatus('Decided')}>Set to Decided</button>
        <button onClick={() => updateStatus('Accepted')}>Set to Accepted</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StatusPage;
