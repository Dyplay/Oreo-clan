import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try { 
    // Fetch the user ID from the Roblox API
    const userResponse = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernames: [username],
      }),
    });

    const userData = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userData.data[0].id;

    // Fetch the headshot URL from the Roblox API
    const headshotResponse = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
    );

    const headshotData = await headshotResponse.json();

    if (!headshotData.data || headshotData.data.length === 0) {
      return res.status(404).json({ error: 'Headshot not found' });
    }

    const headshotUrl = headshotData.data[0].imageUrl;

    res.status(200).json({ headshotUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}