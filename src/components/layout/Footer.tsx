import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050A18] py-16 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          <div className="col-span-2">
            <a href="#" className="text-2xl font-bold tracking-[0.2em] text-white block mb-4">
              PRECUT<span className="text-sky-blue">STUDIO</span>
            </a>
            <p className="text-white/50 text-sm max-w-sm">
              Unlimited video editing. One subscription. Zero bottlenecks. We turn simple footage into performance-driven cinematic content.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#work" className="hover:text-sky-blue transition-colors">Our Work</a></li>
              <li><a href="#pricing" className="hover:text-sky-blue transition-colors">Pricing</a></li>
              <li><a href="#call" className="hover:text-sky-blue transition-colors">Book a Call</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Legal & More</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#about" className="hover:text-sky-blue transition-colors">About Us</a></li>
              <li><a href="#privacy" className="hover:text-sky-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-sky-blue transition-colors">Terms & Conditions</a></li>
              <li><a href="#affiliate" className="hover:text-sky-blue transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Precut Studio. All rights reserved. Built for creators and brands.
          </p>
          <div className="text-white/40 text-xs mt-4 md:mt-0">
             Designed for Performance.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
