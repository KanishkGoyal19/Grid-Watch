// src/components/Navbar.jsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Geist } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Home Link (Left) */}
        <Link href="/" className={`text-xl font-bold text-black ${geistSans.className}`}>
          GridWatch
        </Link>

        {/* Desktop Menu (Center) */}
        <div className="hidden md:flex space-x-8 flex-grow justify-center">
          <Link href="/" className={`hover:text-gray-500 text-black ${geistSans.className}`}>
            Home
          </Link>
          <div className="relative group">
            <Link href="/stats" className={`hover:text-gray-500 text-black ${geistSans.className}`}>
              Stats
            </Link>
            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg rounded-md py-2 mt-2 w-32 z-10">
              <Link
                href="/stats/drivers"
                className={`block px-4 py-2 text-sm hover:bg-gray-200 text-gray-800 ${geistSans.className}`}
              >
                Drivers
              </Link>
              <Link
                href="/stats/constructors"
                className={`block px-4 py-2 text-sm hover:bg-gray-200 text-gray-800 ${geistSans.className}`}
              >
                Constructors
              </Link>
              <Link
                href="/stats/circuits"
                className={`block px-4 py-2 text-sm hover:bg-gray-200 text-gray-800 ${geistSans.className}`}
              >
                Circuits
              </Link>
            </div>
          </div>
          <Link href="/predictions" className={`hover:text-gray-500 text-black ${geistSans.className}`}>
            Prediction Game
          </Link>
          {/* Add more links here in the center */}
        </div>

        {/* Mobile Menu Button (Right on small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 fill-current text-black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Empty div to balance the logo on the left (on desktop) */}
        <div className="hidden md:block w-6 h-6"></div>
      </div>

      {/* Mobile Menu (Collapsed) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 py-2 px-6">
          <Link href="/" className={`block py-2 hover:text-gray-500 text-gray-800 ${geistSans.className}`}>
            Home
          </Link>
          <div className="py-2">
            <Link
              href="/stats"
              className={`block py-2 hover:text-gray-500 text-gray-800 ${geistSans.className}`}
              onClick={toggleMenu} // Close menu after navigating
            >
              Stats
            </Link>
            <div className="ml-4">
              <Link
                href="/stats/drivers"
                className={`block py-2 text-sm hover:text-gray-500 text-gray-700 ${geistSans.className}`}
                onClick={toggleMenu}
              >
                Drivers
              </Link>
              <Link
                href="/stats/constructors"
                className={`block py-2 text-sm hover:text-gray-500 text-gray-700 ${geistSans.className}`}
                onClick={toggleMenu}
              >
                Constructors
              </Link>
              <Link
                href="/stats/circuits"
                className={`block py-2 text-sm hover:text-gray-500 text-gray-700 ${geistSans.className}`}
                onClick={toggleMenu}
              >
                Circuits
              </Link>
            </div>
          </div>
          <Link
            href="/predictions"
            className={`block py-2 hover:text-gray-500 text-gray-800 ${geistSans.className}`}
            onClick={toggleMenu}
          >
            Prediction Game
          </Link>
          {/* Add more mobile links here */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;