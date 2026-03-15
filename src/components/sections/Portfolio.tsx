import React, { useState } from 'react';

// Dynamically import all mp4 files from the portfolio-videos folder
const videoFiles = import.meta.glob('../../assets/portfolio-videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const videos = Object.values(videoFiles);

const VideoItem = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-[28rem] aspect-[9/16] rounded-2xl bg-navy-blue shrink-0 group cursor-pointer transition-all duration-500 hover:scale-105 hover:z-30 hover:shadow-[0_0_40px_-5px_rgba(9,21,73,0.9)]">
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-blue via-navy-blue/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>

        <div className="w-full h-full bg-navy-blue relative">
          {!isLoaded && (
            <div className="absolute inset-0 bg-navy-blue/80 animate-pulse z-0"></div>
          )}
          <video
            src={src}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

const HEADING_WORDS = ["Everything", "You", "Need,"];

const Portfolio: React.FC = () => {
  return (
    <section className="py-12 relative z-20" id="work">
      <style>{`
        @keyframes wordFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .word-fade-up {
          display: inline-block;
          opacity: 0;
          animation: wordFadeUp 0.55s ease forwards;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center ">
        <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6 text-navy-blue">
          {HEADING_WORDS.map((word, i) => (
            <span
              key={i}
              className="word-fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {word}{i < HEADING_WORDS.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
          <br />
          <span className="ml-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">In one Creative Studio.</span>
        </h2>
        <p className="text-navy-blue/70 text-lg max-w-3xl mx-auto">
          From short-form to brand films, we turn simple footage into performance-driven cinematic content.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 py-8">

        {/* Row 1: Left to right */}
        {/* Adjusted padding/margin for a seamless infinite loop */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-6 pr-6 py-4">
          {[...videos, ...videos].map((item, index) => (
            <VideoItem key={`row1-${index}`} src={item} />
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
