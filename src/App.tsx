import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import HowItWorks from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import CTA from './components/sections/CTA';

function App() {
  return (
    <div className={`min-h-screen font-sans selection:bg-sky-blue selection:text-off-white transition-all duration-500 ease-in-out bg-off-white text-navy-blue`}>
      <Navbar />
      
      <main>
        <Hero />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
