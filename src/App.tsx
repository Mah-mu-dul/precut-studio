import { useState, useEffect, lazy, Suspense } from 'react';

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

// Lazy-load non-critical pages — they are only needed when the user navigates to them
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Affiliate = lazy(() => import('./pages/Affiliate'));

function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Debounce via rAF: only compute dark mode once per frame
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        let dark = false;
        const currentScrollY = window.scrollY;
        const howItWorks = document.getElementById('how-it-works');
        const pricing = document.getElementById('pricing-section');

        // 1. Initial Hero Phase (Dark Background)
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
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-sky-blue selection:text-white transition-colors duration-1000 ease-in-out ${isDarkMode ? 'bg-aurora text-off-white' : 'bg-off-white text-navy-blue'} w-full overflow-clip`}>
      <Navbar isDarkMode={isDarkMode} />

      <main>
        <div className="relative">
          <Hero />
          <TrustedBy />
          <Portfolio />
          <HowItWorks isDarkMode={isDarkMode} />
          <Testimonials />
          <Pricing isDarkMode={isDarkMode} />
          <CTA isDarkMode={isDarkMode} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Simple loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen bg-aurora flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-sky-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/affiliate" element={<Affiliate />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
