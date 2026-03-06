import React, { useState } from 'react';

const Navbar: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define static text colors for contrast against the off-white background

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Top Left Navigation */}
        <div className={`flex items-center space-x-8 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'} opacity-80`}>
          <a href="#work" className="hover:text-sky-blue transition-colors">Our Work</a>
          <a href="#why-us" className="hover:text-sky-blue transition-colors">Why Us</a>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          <a href="#" className={`text-xl md:text-2xl font-bold font-mono tracking-[0.1em] transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'}`}>
            PRECUT<span className="text-sky-blue">STUDIO</span>
          </a>
        </div>

        {/* Top Right Navigation */}
        <div className={`flex items-center space-x-6 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'} opacity-80`}>
          <a href="#pricing" className="hover:text-sky-blue transition-colors">Pricing</a>

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
            <div className={`absolute top-full right-0 mt-5 w-56 ${isDarkMode ? 'bg-navy-blue border-white/10 text-white' : 'bg-white border-navy-blue/10 text-navy-blue'} rounded-xl shadow-2xl py-3 flex flex-col items-start overflow-hidden transition-all duration-300 pointer-events-auto border font-mono tracking-widest text-[11px] uppercase z-50 ${isDropdownOpen
              ? 'opacity-100 visible delay-0'
              : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible delay-200 group-hover:delay-0 pointer-events-none group-hover:pointer-events-auto'
              }`}>
              <a href="#about" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>About Us</a>
              <a href="#privacy" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors`}>Privacy Policy</a>
              <a href="#terms" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors gap-1 flex flex-col`}><span>Terms &</span><span>Conditions</span></a>
              <a href="#affiliate" className={`w-full text-left px-5 py-3.5 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-navy-blue/5'} transition-colors gap-1 flex flex-col`}><span>Affiliate</span><span>Program</span></a>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://cal.com/precutstudio/booking"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hidden md:inline-block font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-6 py-2.5 rounded-full text-white shadow-[0_0_10px_rgba(0,51,204,0.3)] hover:shadow-[0_0_25px_rgba(0,51,204,0.8)] transition-all duration-300 transform hover:scale-105"
          >
            Book A Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
