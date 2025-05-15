import React, { useState } from 'react';
 import { Link } from 'react-router-dom';
 import ThemeToggle from 'src/components/ui/ThemeToggle';
 import 'src/styles/layout/header.css';
 

 const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleMenu = () => {
  setIsOpen(!isOpen);
  };
 

  return (
  <header className="fixed top-0 w-full z-50 bg-black text-white">
  <nav className="container mx-auto py-4 px-6 flex items-center justify-between">
  <div className="text-xl font-bold">
  <Link to="/" className="font-exo-2">Valorant Bot</Link>
  </div>
 

  <div className="hidden md:flex space-x-6 items-center">
  <Link to="/model-showcase" className="hover:text-red-500">Model Showcase</Link>
  <Link to="/experience" className="hover:text-red-500">Experience</Link>
  <Link to="/contact" className="hover:text-red-500">Contact</Link>
  <Link to="/about" className="hover:text-red-500">About</Link>
  <ThemeToggle />
  </div>
 

  <div className="md:hidden">
  <button onClick={toggleMenu} className="block md:hidden">
  <svg
  className="fill-current h-6 w-6"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
  aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
  >
  {isOpen ? (
  <path
  fillRule="evenodd"
  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  clipRule="evenodd"
  />
  ) : (
  <path
  fillRule="evenodd"
  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
  clipRule="evenodd"
  />
  )}
  </svg>
  </button>
  </div>
  </nav>
 

  <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
  <div className="bg-black py-2 px-6 space-y-2">
  <Link to="/model-showcase" className="block hover:text-red-500">Model Showcase</Link>
  <Link to="/experience" className="block hover:text-red-500">Experience</Link>
  <Link to="/contact" className="block hover:text-red-500">Contact</Link>
  <Link to="/about" className="block hover:text-red-500">About</Link>
  <div className="py-2"><ThemeToggle /></div>
  </div>
  </div>
  </header>
  );
 };
 

 export default Header;