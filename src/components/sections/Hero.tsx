import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate blur and opacity for the hero text based on scroll position
  const textBlur = Math.min(scrollY / 20, 10); // max 10px blur
  const textOpacity = Math.max(1 - scrollY / 400, 0); // fade out text
  
  // Calculate scale and opacity for the video container
  const videoScale = Math.min(0.7 + scrollY / 1000, 1);
  const videoOpacity = Math.min(0.3 + scrollY / 400, 1);

  return (
    <section className="relative min-h-[150vh] flex flex-col items-center pt-48 transition-colors duration-1000" id="home">
      
      {/* Hero Content (Will blur and fade on scroll) */}
      <div 
        className="text-center px-6 z-20 flex-col items-center max-w-4xl mx-auto pointer-events-none sticky top-1/3"
        style={{
          filter: `blur(${textBlur}px)`,
          opacity: textOpacity,
          transform: `translateY(${-scrollY * 0.2}px)`
        }}
      >
        <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tight mb-6 leading-tight transition-colors duration-500 text-navy-blue">
          Unlimited video editing <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">
            One subscription,
          </span> Zero bottlenecks.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-500 text-navy-blue opacity-70">
          From short-form to brand films, we turn simple footage into performance-driven cinematic content.
        </p>
      </div>

      {/* Video Showreel Container (expands on scroll) */}
      <div className="absolute top-[60vh] left-0 w-full h-[80vh] flex justify-center items-center overflow-hidden z-10 pointer-events-none">
         <div 
           className="relative aspect-video bg-navy-blue border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.15)] flex justify-center items-center"
           style={{
             width: '90%',
             transform: `scale(${videoScale}) translateY(${-scrollY * 0.15}px)`,
             opacity: videoOpacity,
             transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
           }}
         >
           {/* Placeholder for Showreel Video */}
           <div className="absolute inset-0 bg-gradient-to-t from-navy-blue via-transparent to-transparent z-10"></div>
           <div className="text-white/30 text-center relative z-20">
             <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             <p className="tracking-widest uppercase text-sm font-semibold">Brand Showreel (Muted)</p>
           </div>
         </div>
      </div>

    </section>
  );
};

export default Hero;
