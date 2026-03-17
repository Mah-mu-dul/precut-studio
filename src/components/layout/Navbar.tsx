import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const Navbar: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const logoThreshold = window.innerHeight * 0.2;
      const navbarThreshold = window.innerHeight * 0.8; // Duration of the "PRECUT STUDIO" intro

      // 1. Navbar Visibility (Always visible in first section, then hide-on-scroll)
      if (currentScrollY < navbarThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // 2. Logo Visibility (Hide in the first section)
      if (currentScrollY > logoThreshold) {
        setIsLogoVisible(true);
      } else {
        setIsLogoVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Top Left Navigation */}
        <div className={`flex items-center space-x-8 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-navy-blue/80'}`}>
          <a href="/#work" className="hover:text-sky-blue transition-colors">Our Work</a>
          <a href="/#why-us" className="hover:text-sky-blue transition-colors">Why Us</a>
        </div>

        {/* Center Logo */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-500 ease-out ${isLogoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-xl md:text-2xl font-bold font-mono tracking-[0.1em] transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-navy-blue'}`}
          >
            PRECUT<span className="text-sky-blue">STUDIO</span>
          </Link>
        </div>

        {/* Top Right Navigation */}
        <div className={`flex items-center space-x-6 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-navy-blue/80'}`}>
          <a href="/#pricing" className="hover:text-sky-blue transition-colors">Pricing</a>

          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className="flex items-center hover:text-sky-blue transition-colors focus:outline-none py-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              More
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-5  text-nowrap ${isDarkMode ? 'bg-navy-blue border-white/10 text-white' : 'bg-white border-navy-blue/10 text-navy-blue'} rounded-xl shadow-2xl py-3 flex flex-col items-start overflow-hidden transition-all duration-300 pointer-events-auto border font-mono tracking-widest text-[11px] uppercase z-50 ${isDropdownOpen
              ? 'opacity-100 visible delay-0'
              : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible delay-200 group-hover:delay-0 pointer-events-none group-hover:pointer-events-auto'
              }`}>
              <Link to="/about" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>About Us</Link>
              <Link to="/privacy" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Privacy Policy</Link>
              <Link to="/terms" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Terms & Conditions</Link>
              <Link to="/affiliate" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Affiliate Program</Link>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://cal.com/precutstudio/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hidden md:inline-block font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-6 py-2.5 rounded-full text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)] transition-all duration-300 transform hover:scale-105"
          >
            Book A Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
