import React, { useRef, useState, useEffect, memo, useMemo } from 'react';
import LazyVideo from '../ui/LazyVideo';

const videos = [
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%201/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%202/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%203/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%204/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%205/index.m3u8",
  // "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%206/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%207/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%208/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%209/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%2010/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%2011/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%2012/index.m3u8",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%2013/index.m3u8"
];

/**
 * VideoItem — only loads the real <LazyVideo> once it enters the visible
 * viewport (via IntersectionObserver). Once loaded, the video stays alive
 * to prevent HLS init/destroy churn as the marquee loops.
 */
const VideoItem = memo(({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // ONE-WAY flag: once true, never goes back to false.
  // This prevents HLS instances from being repeatedly created/destroyed
  // as marquee items scroll in and out of view.
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (hasBeenVisible) return; // already activated, no need to observe
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px 200px' } // tighter margin to avoid loading too many at once
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

  return (
    <div
      ref={containerRef}
      className="relative h-[28rem] aspect-[9/16] rounded-2xl bg-navy-blue shrink-0 group cursor-pointer transition-transform duration-500 hover:scale-105 hover:z-30 md:hover:shadow-[0_0_40px_-5px_rgba(9,21,73,0.9)]"
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-blue via-navy-blue/20 to-transparent z-20 opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>

        {hasBeenVisible ? (
          <LazyVideo
            src={src}
            title="Precut Studio Portfolio Video"
            aria-label="Video portfolio showcase item"
            className="w-full h-full"
            aspectClass="aspect-[9/16]"
            rootMargin="200px 0px"
          />
        ) : (
          /* Lightweight placeholder — no video element, no HLS instance */
          <div className="w-full h-full bg-navy-blue/90" />
        )}
      </div>
    </div>
  );
});

const HEADING_WORDS = ["Everything", "You", "Need,"];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Only render the marquee when the Portfolio section is near the viewport.
  // This avoids creating any video elements until the user scrolls down.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect(); // once visible, keep it alive
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On mobile, limit the number of videos to reduce HLS instances / GPU pressure
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const displayVideos = useMemo(() => {
    const list = isMobile ? videos.slice(0, 4) : videos;
    return [...list, ...list];
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-6 relative z-20" id="work" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
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
        <h2 className="text-2xl md:text-5xl font-mono font-bold mb-6 text-navy-blue flex flex-col items-center">
          <div className="flex flex-wrap justify-center">
            {HEADING_WORDS.map((word, i) => (
              <span
                key={i}
                className="word-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {word}{i < HEADING_WORDS.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">In one Creative Studio.</span>
        </h2>
        <p className="text-navy-blue/70 text-base max-w-3xl mx-auto">
          From short-form to brand films, we turn simple footage into performance-driven cinematic content.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 py-4">

        {/* Row 1: Left to right */}
        {/* Adjusted padding/margin for a seamless infinite loop */}
        <div
          className={`flex py-16 w-max hover:[animation-play-state:paused] gap-6 pr-6 ${isMobile ? 'animate-marquee-left-slow' : 'animate-marquee-left'}`}
          style={{
            willChange: isMobile ? 'auto' : 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {isSectionVisible
            ? displayVideos.map((item, index) => (
                <VideoItem key={`row1-${index}`} src={item} />
              ))
            : /* Pre-render lightweight placeholders to preserve layout */ 
              displayVideos.map((_, index) => (
                <div key={`row1-ph-${index}`} className="h-[28rem] aspect-[9/16] rounded-2xl bg-navy-blue/40 shrink-0" />
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
