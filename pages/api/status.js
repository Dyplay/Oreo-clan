// pages/api/status.js

// A simple in-memory store for demonstration. In a real application, use a database.
let applicationStatus = 'Received'; // Initial status.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { status } = req.body;
    const validStatuses = ['Received', 'Reviewing', 'Decided', 'Accepted'];

    if (status && validStatuses.includes(status)) {
      applicationStatus = status;
      return res.status(200).json({ status: applicationStatus });
    } else {
      return res.status(400).json({ error: 'Invalid status' });
    }
  } else if (req.method === 'GET') {
    const { status } = req.query;
    const validStatuses = ['Received', 'Reviewing', 'Decided', 'Accepted'];

    if (status && validStatuses.includes(status)) {
      applicationStatus = status;
      return res.status(200).json({ status: applicationStatus });
    } else {
      return res.status(200).json({ status: applicationStatus });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}