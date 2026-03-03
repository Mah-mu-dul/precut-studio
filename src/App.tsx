import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import HowItWorks from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import CTA from './components/sections/CTA';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const howItWorks = document.getElementById('how-it-works');
      if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-sky-blue selection:text-white transition-colors duration-1000 ease-in-out ${isDarkMode ? 'bg-navy-blue text-off-white' : 'bg-off-white text-navy-blue'} w-full overflow-clip`}>
      <Navbar isDarkMode={isDarkMode} />

      <main>
        <Hero />
        <Portfolio />
        <HowItWorks isDarkMode={isDarkMode} />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
