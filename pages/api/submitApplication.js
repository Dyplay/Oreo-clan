// pages/api/submitApplication.js

const applications = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, discordName, voidWorldUnlocked } = req.body;

    if (!username || !discordName || voidWorldUnlocked === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    applications[username] = {
      discordName,
      voidWorldUnlocked,
      status: 'Received'
    };

    return res.status(200).json({ message: 'Application submitted' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
