export default function handler(req, res) {
    if (req.method === 'POST') {
      const { place } = req.body;
  
      // Validate the input
      if (typeof place !== 'number') {
        return res.status(400).json({ error: 'Place must be a number' });
      }
  
      // Simulate updating the place (in a real app, you'd update a database or similar)
      console.log(`Place updated to: ${place}`);
  
      return res.status(200).json({ message: 'Place updated successfully', place });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
}