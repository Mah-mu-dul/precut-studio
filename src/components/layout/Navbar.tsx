import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define static text colors for contrast against the off-white background

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Top Left Navigation */}
        <div className="flex items-center space-x-8 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-500 text-navy-blue opacity-80">
          <a href="#work" className="hover:text-sky-blue transition-colors">Our Work</a>
          <a href="#why-us" className="hover:text-sky-blue transition-colors">Why Us</a>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
           <a href="#" className="text-xl md:text-2xl font-bold font-mono tracking-[0.1em] transition-colors duration-500 text-navy-blue">
             PRECUT<span className="text-sky-blue">STUDIO</span>
           </a>
        </div>

        {/* Top Right Navigation */}
        <div className="flex items-center space-x-6 text-sm uppercase tracking-widest font-mono font-medium transition-colors duration-500 text-navy-blue opacity-80">
          <a href="#pricing" className="hover:text-sky-blue transition-colors">Pricing</a>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center hover:text-sky-blue transition-colors focus:outline-none">
              More
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 glass-panel rounded-xl shadow-2xl py-2 flex flex-col items-start overflow-hidden">
                <a href="#about" className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors">About Us</a>
                <a href="#privacy" className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors">Privacy Policy</a>
                <a href="#terms" className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors">Terms & Conditions</a>
                <a href="#affiliate" className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors text-sky-blue">Affiliate Program</a>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <a 
            href="#call" 
            className="hidden md:inline-block font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-navy-blue to-sky-blue border border-sky-blue/30 px-6 py-2.5 rounded-full text-white hover:shadow-[0_0_15px_rgba(135,206,235,0.5)] transition-all duration-300"
          >
            Book A Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
