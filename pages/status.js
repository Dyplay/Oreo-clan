import { useEffect, useState } from 'react';

const fetchStatus = async () => {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    return data.status; // Ensure your API returns the status
  } catch (error) {
    console.error('Error fetching status:', error);
    return 'Error';
  }
};

const StatusPage = () => {
  const [status, setStatus] = useState('Loading...');
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
      setApplicationData(JSON.parse(savedData));
    }
    
    // Fetch status from API
    const getStatus = async () => {
      const status = await fetchStatus();
      setStatus(status);
    };
    
    getStatus();
  }, []);

  return (
    <div className="bg-gradient-to-b from-orange-600 to-black min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Application Status</h1>
        {applicationData && (
          <>
            <p className="text-lg font-semibold mb-4">Username: {applicationData.username}</p>
            <p className="text-lg font-semibold mb-4">Discord Name: {applicationData.discordName}</p>
            <p className="text-lg font-semibold mb-4">Void World Unlocked: {applicationData.hasVoidWorld ? 'Yes' : 'No'}</p>
          </>
        )}
        <p className="text-xl font-bold mb-4">{status}</p>
        {status === 'Accepted' && (
          <p className="text-green-500 text-lg">Congratulations! You have been accepted. Here is the link to our Discord: <a href="https://discord.gg/yourlink" className="text-blue-500 underline">Join Discord</a></p>
        )}
      </div>
    </div>
  );
};

export default StatusPage;