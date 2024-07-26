import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const fetchRobloxAvatar = async (username) => {
  try {
    const response = await fetch(`https://oreo-clan.vercel.app/api/robloxHeadshot?username=${username}`);
    const data = await response.json();
    return data.headshotUrl; // Ensure your API response has a 'headshotUrl'
  } catch (error) {
    console.error('Error fetching Roblox avatar:', error);
    return null;
  }
};

const sendDiscordWebhook = async (data) => {
  try {
    const webhookUrl = 'https://discord.com/api/webhooks/1266505400417652757/Mtcr_jxTgL3gDlPAZXWjFkwHGTCLDTGxJu-nEhl61EnUpFQFiZcbWG4TOYrBTwYflqLb'; // Replace with your webhook URL
    const payload = {
      content: '@everyone', // This will mention everyone
      embeds: [
        {
          title: 'New Clan Application',
          description: `**Roblox Username:** ${data.username}\n**Discord Name:** ${data.discordName}`,
          fields: [
            {
              name: 'Void World Unlocked',
              value: data.hasVoidWorld ? 'Yes' : 'No',
              inline: true
            }
          ],
          thumbnail: {
            url: data.avatarUrl
          },
          color: 16711680 // Optional: Color of the embed (red)
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to send webhook. Status: ${response.status}`);
    }

    // Try to parse the response if it is not empty
    const responseText = await response.text(); // Get response text
    if (responseText) {
      return JSON.parse(responseText); // Try parsing it to JSON
    } else {
      return {}; // Return an empty object if response is empty
    }
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
    return null;
  }
};

const BecomeAMember = () => {
  const [username, setUsername] = useState('');
  const [discordName, setDiscordName] = useState('');
  const [hasVoidWorld, setHasVoidWorld] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch Roblox avatar
    const avatar = await fetchRobloxAvatar(username);

    if (avatar) {
      setAvatarUrl(avatar);
      setShowPopup(true);
    } else {
      setError('Unable to fetch Roblox avatar. Please try again.');
    }
  };

  const handleConfirm = async () => {
    setShowPopup(false);

    if (!hasVoidWorld) {
      setError('Please confirm if you have the Void World unlocked.');
      return;
    }

    setError('');

    const submissionData = {
      username,
      discordName,
      hasVoidWorld,
      avatarUrl
    };

    try {
      // Send data to Discord webhook
      const response = await sendDiscordWebhook(submissionData);

      if (response) {
        setSuccess('Application submitted successfully!');
        console.log('Webhook response:', response); // Log the response for debugging
      } else {
        setError('Failed to submit application. Please try again.');
        console.log('No response from webhook'); // Log when there's no response
      }
    } catch (error) {
      setError('Failed to submit application. Please try again.');
      console.error('Error sending Discord webhook:', error); // Log the error for debugging
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  // Popup animation
  const popupAnimation = useSpring({
    opacity: showPopup ? 1 : 0,
    transform: showPopup ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 300, friction: 20 }
  });

  return (
    <div className="bg-gradient-to-b from-orange-600 to-black min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Apply to Join Our Clan</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Roblox Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Do you have the Void World unlocked?</label>
            <input
              type="checkbox"
              checked={hasVoidWorld}
              onChange={(e) => setHasVoidWorld(e.target.checked)}
              className="mr-2"
              required
            />
            <span className="text-gray-700">Yes</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Discord Name</label>
            <input
              type="text"
              value={discordName}
              onChange={(e) => setDiscordName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">
            Submit
          </button>
        </form>
      </div>

      {/* Popup Confirmation */}
      {showPopup && (
        <animated.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={popupAnimation}>
          <animated.div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center" style={popupAnimation}>
            <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Roblox Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            )}
            <p className="text-lg font-semibold">{username}</p>
            <p className="text-gray-600 mb-4">Are you sure this is your Roblox account?</p>
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
            >
              Cancel
            </button>
          </animated.div>
        </animated.div>
      )}
    </div>
  );
};

export default BecomeAMember;