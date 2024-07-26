// pages/api/updateStatus.js

const applications = {}; // Ensure this is the same object as in submitApplication.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, status } = req.body;

    if (!username || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!applications[username]) {
      return res.status(404).json({ error: 'Application not found' });
    }

    applications[username].status = status;

    return res.status(200).json({ message: 'Status updated' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}