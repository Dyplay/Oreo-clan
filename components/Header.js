import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--brown)] text-white py-4 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img className="w-16 md:w-20" src='/logo.png' alt="Oreo Clan Logo" />
          <h1 className="text-2xl md:text-3xl font-bold">Oreo Clan</h1>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>
        <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:static absolute top-full left-0 w-full md:w-auto bg-[var(--brown)] md:bg-transparent`}>
          <ul className="flex flex-col md:flex-row md:space-x-1 space-y-2 md:space-y-0 items-center md:items-end">
            <li><Link href={'/'} className="hover:underline px-4 py-2">Home</Link></li>
            <li><Link href={'#members'} className="hover:underline px-4 py-2">Members</Link></li>
            <li><Link href={'/become-a-member'} className="hover:underline px-4 py-2">Apply</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;