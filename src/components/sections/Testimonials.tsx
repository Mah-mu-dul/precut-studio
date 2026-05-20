import React, { useEffect, useRef, useState } from 'react';
import t1 from '../../assets/testimonials/Testimonial 1.png';
import t2 from '../../assets/testimonials/Testimonial 2.png';
import t3 from '../../assets/testimonials/Testimonial 3.png';
import t4 from '../../assets/testimonials/Testimonial 4.png';
import t5 from '../../assets/testimonials/Testimonial 5.png';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-25% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const testimonialImages = [t1, t2, t3, t4, t5];
  return (
    <section ref={sectionRef} id="testimonials" className="py-6 relative z-20 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>

      {/* Intro Text Sequence */}
      <div className={`max-w-4xl mx-auto px-6 text-center mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 inline-block">
          We edit. You grow.
        </h3>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-5xl font-mono font-bold mb-4 text-white">
            Success Stories<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-sans font-bold">from the Creative Frontline</span>
          </h2>
          <p className="text-white/50 text-lg">Trusted by creators and brands who demand performance-driven visuals.</p>
        </div>
      </div>

      {/* Marquee Wrapper - moved outside the max-w-7xl container to span full width */}
      <div className="relative w-full overflow-hidden flex flex-col py-4 mt-0">
        <div className="flex w-max animate-marquee-left-testimonials hover:[animation-play-state:paused] space-x-8 px-4" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
          {[...testimonialImages, ...testimonialImages].map((src, index) => (
            <div
              key={index}
              className="relative w-96 md:w-[450px] shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={src}
                alt={`Testimonial ${(index % testimonialImages.length) + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
