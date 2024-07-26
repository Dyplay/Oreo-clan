import React, { useEffect, useState } from 'react';

const pfps = [
  { username: 'TechMighty_010', className: 'left-16' },
  { username: 'freakled', className: 'left-8' },
  { username: 'FIusly', className: '' },
  { username: 'FighterFP', className: 'right-8' },
  { username: 'Smok302', className: 'right-16' }
];

const AvatarList = () => {
  const [headshotUrls, setHeadshotUrls] = useState([]);

  useEffect(() => {
    const fetchHeadshots = async () => {
      const urls = await Promise.all(pfps.map(async (pfp) => {
        const response = await fetch(`https://oreo-clan.vercel.app/api/robloxHeadshot?username=${pfp.username}`);
        const data = await response.json();
        return data.headshotUrl;
      }));
      setHeadshotUrls(urls);
    };

    fetchHeadshots();
  }, []);

  return (
    <div className="flex justify-center mt-12">
      {headshotUrls.map((url, index) => (
        <img
          key={index}
          className={`bg-slate-600 w-[65px] h-[65px] rounded-full relative border-white border-solid border-2 ${pfps[index].className}`}
          src={url}
          alt={`Avatar ${pfps[index].username}`}
        />
      ))}
    </div>
  );
};

export default AvatarList;