import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Throttle to one calculation per frame to prevent excessive re-renders
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const currentScrollY = window.scrollY;
        const navbarThreshold = window.innerHeight * 0.8;

        // 1. Logo Visibility (Hide at the very top of home page)
        if (isHomePage) {
          // Show logo after scrolling down a bit (e.g. 150px)
          setShowLogo(currentScrollY > 150);
        } else {
          setShowLogo(true);
        }

        // 1. Navbar Visibility (Always visible in first section, then hide-on-scroll)
        if (currentScrollY < navbarThreshold) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [location.pathname, isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none flex justify-center py-4 md:py-6 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
    >
      <div className={`
        pointer-events-auto
        flex items-center justify-between
        w-[92%] max-w-6xl 
        px-6 md:px-10 py-3 md:py-4
        rounded-full border backdrop-blur-xl shadow-2xl
        transition-all duration-500
        ${isDarkMode 
          ? 'bg-navy-blue/70 border-white/10 shadow-black/40' 
          : 'bg-white/70 border-navy-blue/10 shadow-navy-blue/10'}
      `}>

        {/* Left Navigation */}
        <div className={`hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-mono font-bold transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-navy-blue/80'}`}>
          <a href="/#work" className="hover:text-sky-blue transition-all hover:tracking-[0.25em]">Our Work</a>
          <a href="/#why-us" className="hover:text-sky-blue transition-all hover:tracking-[0.25em]">Why Us</a>
        </div>

        {/* Logo/Brand */}
        <div className={`flex items-center cursor-pointer transition-all duration-700 ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-lg md:text-xl font-bold font-mono tracking-[0.15em] transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-navy-blue'}`}
          >
            PRECUT<span className="text-sky-blue">STUDIO</span>
          </Link>
        </div>

        {/* Right Navigation */}
        <div className={`flex items-center space-x-4 md:space-x-8 text-[11px] uppercase tracking-[0.2em] font-mono font-bold transition-colors duration-500 ${isDarkMode ? 'text-white/80' : 'text-navy-blue/80'}`}>
          <a href="/#pricing" className="hidden md:inline-block hover:text-sky-blue transition-all hover:tracking-[0.25em]">Pricing</a>

          <div
            className="relative group hidden md:block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className="flex items-center hover:text-sky-blue transition-all hover:tracking-[0.25em] focus:outline-none py-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              More
              <svg className={`w-3 h-3 ml-1.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full right-0 mt-4 text-nowrap ${isDarkMode ? 'bg-navy-blue/90 border-white/10 text-white' : 'bg-white/90 border-navy-blue/10 text-navy-blue'} rounded-2xl shadow-2xl py-3 flex flex-col items-start overflow-hidden transition-all duration-300 backdrop-blur-xl border font-mono tracking-widest text-[10px] uppercase z-50 ${isDropdownOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
              }`}>
              <Link to="/about" className={`w-full text-left px-6 py-3 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>About Us</Link>
              <Link to="/privacy" className={`w-full text-left px-6 py-3 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Privacy Policy</Link>
              <Link to="/terms" className={`w-full text-left px-6 py-3 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Terms & Conditions</Link>
              <Link to="/affiliate" className={`w-full text-left px-6 py-3 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Affiliate Program</Link>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://cal.com/precutstudio/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-mono font-black uppercase tracking-wider bg-sky-blue px-5 md:px-7 py-2 md:py-2.5 rounded-full text-navy-blue shadow-lg hover:shadow-sky-blue/40 transition-all duration-300 transform hover:scale-105 active:scale-95 text-[10px] md:text-[11px]"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
