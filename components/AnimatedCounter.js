import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedCounter = ({ value }) => {
  // Spring configuration
  const props = useSpring({
    number: value,
    from: { number: 0 },
    config: { duration: 1000 }, // Duration of the animation in milliseconds
  });

  return (
    <div className="bg-black" id='leaderboard-counter'>
     <div className="mt-28 text-center">
     <h1 className="text-4xl md:text-7xl font-bold text-white">Current Place</h1>
      <h3 className="text-white text-2xl mt-3 mb-7">Our current place on the pet simulator 99 clan leaderboard</h3>
      <animated.p className="text-8xl md:text-9xl font-extrabold text-orange-800">
         {props.number.to(n => n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
      </animated.p>
      <br></br>
     </div>
    </div>
  );
};

export default AnimatedCounter;