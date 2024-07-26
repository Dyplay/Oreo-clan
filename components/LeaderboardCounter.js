import React, { useState, useEffect } from 'react';

const LeaderboardCounter = ({ place }) => {
  const [currentPlace, setCurrentPlace] = useState(0);

  const fetchPlace = async () => {
    try {
      const response = await fetch(`/api/leaderboard?place=${place}`);
      const data = await response.json();
      setCurrentPlace(data.place);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, [place]);

  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl md:text-7xl font-bold text-white">Current Place</h1>
      <p className="text-8xl md:text-9xl font-extrabold text-orange-800">
        {currentPlace.toLocaleString()}
      </p>
    </div>
  );
};

export default LeaderboardCounter;