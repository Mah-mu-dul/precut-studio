import React, { useEffect, useState } from 'react';
import t1 from '../../assets/testimonials/Testimonial 1.png';
import t2 from '../../assets/testimonials/Testimonial 2.png';
import t3 from '../../assets/testimonials/Testimonial 3.png';
import t4 from '../../assets/testimonials/Testimonial 4.png';
import t5 from '../../assets/testimonials/Testimonial 5.png';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('testimonials');
      if (section) {
        const top = section.getBoundingClientRect().top;
        setIsVisible(top < window.innerHeight * 0.75);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonialImages = [t1, t2, t3, t4, t5];
  return (
    <section id="testimonials" className="py-12 relative z-20 overflow-hidden">

      {/* Intro Text Sequence */}
      <div className={`max-w-4xl mx-auto px-6 text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 inline-block">
          We edit. You grow.
        </h3>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-mono font-bold mb-4 text-white">
            Success Stories<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-sans font-bold">from the Creative Frontline</span>
          </h2>
          <p className="text-white/50 text-lg">Trusted by creators and brands who demand performance-driven visuals.</p>
        </div>
      </div>

      {/* Marquee Wrapper - moved outside the max-w-7xl container to span full width */}
      <div className="relative w-full overflow-hidden flex flex-col py-8 mt-4">
        <div className="flex w-max animate-marquee-left-testimonials hover:[animation-play-state:paused] space-x-8 px-4">
          {[...testimonialImages, ...testimonialImages].map((src, index) => (
            <div
              key={index}
              className="relative w-96 md:w-[450px] shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            >
              <img src={src} alt={`Testimonial ${index + 1}`} className="w-full h-auto rounded-xl " />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marqueeLeftTestimonials {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-left-testimonials {
            animation: marqueeLeftTestimonials 40s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
