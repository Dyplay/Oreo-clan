import fs from 'fs-extra';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'data', 'leaderboard.json');

const getLeaderboard = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { place: 0 };
  }
};

const updateLeaderboard = async (place) => {
  const leaderboard = { place };
  await fs.outputFile(filePath, JSON.stringify(leaderboard, null, 2));
  return leaderboard;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { place } = req.body;
    if (typeof place === 'number') {
      const updatedLeaderboard = await updateLeaderboard(place);
      res.status(200).json(updatedLeaderboard);
    } else {
      res.status(400).json({ error: 'Invalid place value' });
    }
  } else if (req.method === 'GET') {
    const leaderboard = await getLeaderboard();
    const { place } = req.query;
    if (place !== undefined) {
      const parsedPlace = parseInt(place, 10);
      if (!isNaN(parsedPlace)) {
        const updatedLeaderboard = await updateLeaderboard(parsedPlace);
        res.status(200).json(updatedLeaderboard);
      } else {
        res.status(200).json(leaderboard);
      }
    } else {
      res.status(200).json(leaderboard);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}