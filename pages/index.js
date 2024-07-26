import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import AnimatedCounter from '../components/AnimatedCounter';
import OurMembers from '../components/OurMembers';
import { fetchPlace } from '../utils/fetchPlace';

export default function Home() {

  const [place, setPlace] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setPlace(data.place);
    };

    // Polling to get updates every 5 seconds
    const intervalId = setInterval(getData, 5000);

    // Initial fetch
    getData();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
      
  return (
    <div contextMenu='${return: flase;}' className="oreo-theme bg-black text-[var(--black)]">
      <Head>
        <link rel='icon' href='/logo.png'></link>
        <title>Oreo Clan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <MainContent />
      <AnimatedCounter value={place} />
      <OurMembers />
      <Footer />
    </div>
  );
}