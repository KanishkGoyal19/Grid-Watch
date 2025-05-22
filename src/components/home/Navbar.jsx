'use client';

import { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0a0a0a] backdrop-blur-md shadow-md">

      <div className="w-full grid grid-cols-3 items-center px-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse justify-self-start">

          <img
            src="/logo.jpg"
            className="h-8"
            alt="Grid Watch Logo"
          />
          <span className="self-center text-3xl font-bold tracking-wide text-gray-900 dark:text-white">

            Grid Watch
          </span>
        </a>

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={dropdownOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 17 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${dropdownOpen ? 'block' : 'hidden'} w-full md:block md:w-auto justify-self-center`}>

          <ul className="flex flex-col md:flex-row items-center gap-6 font-semibold px-4 py-2 md:py-0 transition-all duration-200">
            <li>
              <a
                href="/"
                className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
              >
                Home
              </a>
            </li>

            <li className="hover-underline">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 flex items-center gap-2 hover-underline"
              >

                Stats
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 10 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="z-10 absolute mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <a
                        href="stats/drivers"
                        className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
                      >
                        Driver Stats
                      </a>
                    </li>
                    <li>
                      <a
                      href="stats/constructors"
                        className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
                      >
                        Constructor Stats
                      </a>
                    </li>
                    <li>
                      <a
                        href="stats/circuits"
                        className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
                      >
                        Circuit Stats
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <a
                href="game"
                className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
              >
                Prediction Game
              </a>
            </li>
            <li>
              <a
                href="about"
                className="text-md md:text-lg px-4 py-2 font-medium text-gray-200 hover:text-[#e10600] transition duration-200 hover-underline"
              >
                About
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
