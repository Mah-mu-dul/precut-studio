import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import TrustedBy from './components/sections/TrustedBy';
import HowItWorks from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import CTA from './components/sections/CTA';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Affiliate from './pages/Affiliate';

function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let dark = false;
      const currentScrollY = window.scrollY;
      const howItWorks = document.getElementById('how-it-works');
      const pricing = document.getElementById('pricing-section');

      // 1. Initial Hero Monitor Phase (Dark Background)
      // Transition point moved earlier per user request (from 1.35 to 0.7)
      if (currentScrollY < window.innerHeight * 0.7) {
        dark = true;
      }
      // 2. How It Works Section (Dark Background)
      else if (howItWorks) {
        const rect = howItWorks.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          dark = true;
        }
      }

      // 3. Pricing Section (Back to Light Background)
      if (pricing) {
        const rect = pricing.getBoundingClientRect();
        if (rect.top <= 0) {
          dark = false;
        }
      }

      setIsDarkMode(dark);
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
        <TrustedBy />
        <Portfolio />
        <HowItWorks isDarkMode={isDarkMode} />
        <Testimonials />
        <Pricing isDarkMode={isDarkMode} />
        <CTA isDarkMode={isDarkMode} />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/affiliate" element={<Affiliate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
