import React from 'react';
import AvatarList from '../components/AvatarList';
import Link from 'next/link';

const MainContent = () => {
  return (
    <div className="h-auto w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      <main className="mt-32 container mx-auto py-8 px-4">
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-bold mb-4 text-white">Welcome to Oreo Clan</h2>
          <p className="text-lg md:text-2xl text-white">The best active pet sim 99 clan on the entire plattform!</p>
          <div className="space-x-6">
          <button className="text-white bg-orange-800 mt-10 rounded p-2 md:p-4 transition-transform transform hover:scale-105 hover:animate-glow w-[220px] text-center"><span className="text-center ml-4">
          <span className="flex float-start fixed"><svg className="float-start mr-1 mt-0.5 ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg></span> Become a Member!</span></button>

          </div>
          <div className="text-white text-center justify-center relative top-[30px]">
            <h1>We have over 20+ members!</h1>
          </div>
          <AvatarList/>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
          <div className="bg-orange-950 text-white p-6 rounded-lg shadow-2xl border border-[var(--brown)] w-full md:w-72 mx-auto transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Our Mission</h3>
            <p>To be a good clan and earn & grow as big as we can not just as owner's as a community.</p >
          </div>
          <div className="bg-orange-950 text-white p-6 rounded-lg shadow-2xl border border-[var(--brown)] w-full md:w-72 mx-auto transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Giveaways</h3>
            <p>We do a bunch of giveaways on our discord. Huge giveaways expensive exclusive giveaways and so much more!</p>
          </div>
          <div className="bg-orange-950 text-white p-6 rounded-lg border border-[var(--brown)] shadow-2xl w-full md:w-72 mx-auto transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Join Us</h3>
            <p>If you love dont hardcore and strict clans. Then you are at the right place! We are not strict. We welcome new members! So join us today apply here: <Link className="text-blue-600 underline" href={'/become-a-member'}>Apply</Link></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainContent;