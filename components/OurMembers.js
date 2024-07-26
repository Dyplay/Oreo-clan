import React, { useState, useEffect } from 'react';

const members = [
  {
    username: '000kvic',
    role: '💎 Leader'
  },
  {
    username: 'DyplayXD',
    role: '💸 Leader & Officer'
  },
  {
    username: 'FighterFP',
    role: 'Member'
  },
  {
    username: 'Yaaatoooo',
    role: 'Member'
  },
  {
    username: 'Hirstie321',
    role: 'Member'
  },
  {
    username: 'SirOreoII',
    role: 'Member'
  },
  {
    username: 'icyTrickzy',
    role: 'Member'
  },
  {
    username: 'SiahTTD',
    role: 'Member'
  },
  {
    username: 'Tannifine',
    role: 'Member'
  },
  {
    username: 'Smok302',
    role: 'Member'
  },
  {
    username: 'Johnlegend332',
    role: 'Member'
  },
  {
    username: 'bastianspiller1',
    role: 'Member'
  },
  {
    username: 'Demortking',
    role: 'Member'
  },
  {
    username: 'FIusly',
    role: 'Member'
  },
  {
    username: 'Maxryantheawesomeont',
    role: 'Member'
  },
  {
    username: 'freakled',
    role: 'Member'
  },
  {
    username: 'Playzfortnite2009',
    role: 'Member'
  },
  {
    username: 'Rickalkjuyh',
    role: 'Member'
  },
  {
    username: 'TechMighty_010',
    role: 'Member'
  },
  {
    username: 'RASHER691',
    role: 'Member'
  },
  {
    username: 'Bonnymon17',
    role: 'Member'
  },
];

const OurClanMembers = () => {
  const [headshotUrls, setHeadshotUrls] = useState([]);

  useEffect(() => {
    const fetchHeadshots = async () => {
      try {
        const urls = await Promise.all(members.map(async (member) => {
          const response = await fetch(`https://oreo-clan.vercel.app/api/robloxHeadshot?username=${member.username}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          return data.headshotUrl;
        }));
        setHeadshotUrls(urls);
      } catch (error) {
        console.error('Error fetching headshots:', error);
      }
    };

    fetchHeadshots();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-orange-800 min-h-screen py-12 mt-[200px]" id='members'>
        <h1 className="text-white text-center justify-center text-7xl mb-16"><b>Our Members</b></h1>
        <img className="relative w-[140px] left-[35px]" src="/cat.png"></img>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-lg text-center">
            {headshotUrls[index] ? (
              <>
                <img 
                  className="w-32 h-32 rounded-full mx-auto mb-4" 
                  src={headshotUrls[index]} 
                  alt={`${member.username}'s avatar`} 
                />
                <h3 className="text-xl font-bold mb-2">{member.username}</h3>
                <p className="text-gray-600">{member.role}</p>
              </>
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClanMembers;