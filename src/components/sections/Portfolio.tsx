import React from 'react';

const Portfolio: React.FC = () => {
  // Placeholder data for the marquee
  const videos = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="py-24 relative z-20" id="work">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 text-navy-blue">
          Everything You Need.<br/>
          <span className="text-sky-blue">In one Creative Studio.</span>
        </h2>
        <p className="text-navy-blue/70 text-lg max-w-3xl mx-auto">
          From short-form to brand films, we turn simple footage into performance-driven cinematic content.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 py-12">
        
        {/* Row 1: Left to right */}
        <div className="flex w-[200vw] animate-marquee-left hover:[animation-play-state:paused] space-x-6 px-6">
          {[...videos, ...videos].map((item, index) => (
            <div 
              key={`row1-${index}`} 
              className="relative w-80 h-[28rem] rounded-2xl bg-navy-blue shrink-0 overflow-hidden group cursor-pointer transition-all duration-500 shadow-[0_8px_30px_rgba(9,21,73,0.15)] hover:scale-110 hover:-translate-y-2 hover:z-30 hover:shadow-[0_30px_60px_rgba(9,21,73,0.3)]"
            >
              {/* Overlay Gradient for luxury feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-blue via-navy-blue/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              {/* Content info on hover */}
              <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="bg-sky-blue text-navy-blue font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">Short Form</span>
                <h3 className="text-white font-mono font-bold text-lg">Brand Magic {item}</h3>
              </div>
              
              <div className="w-full h-full flex items-center justify-center text-white/30 font-mono tracking-widest text-sm uppercase">
                 [Video Placeholder]
              </div>
            </div>
          ))}
        </div>
        
        <style>{`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-left {
            animation: marqueeLeft 30s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Portfolio;
