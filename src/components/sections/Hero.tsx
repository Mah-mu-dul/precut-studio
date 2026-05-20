import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import LazyVideo from '../ui/LazyVideo';

const desktopVideo = "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/VSL%20video%20%20(1)/index.m3u8";
const mobileVideo = "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/saas%20video%20precuts-vartical/index.m3u8";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [volume, setVolume] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  // isMobile must be declared before `progress` which depends on it
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.05,
  });

  // On mobile, use raw scroll progress — spring physics creates continuous
  // rAF frames that never fully stop, burning CPU. Mobile touch scrolling
  // already has native momentum, so the spring adds lag without benefit.
  const progress = isMobile ? scrollYProgress : smoothYProgress;

  // ─── VIDEO PLAYBACK ──────────────────────────────────────────
  useMotionValueEvent(progress, 'change', (latest) => {
    if (!videoRef.current) return;
    if (latest > 0.65) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = volume === 0;
    }
  }, [volume]);

  const lockOffset = isMobile ? -360 : -350; // Locked position at the top
  const endOffset = lockOffset - 400; // Final scroll exit

  const scrollYOffset = useTransform(
    progress,
    [0, 0.45, 0.85, 1],
    [0, lockOffset, lockOffset, endOffset]
  );

  const contentOpacity = useTransform(progress, [0.10, 0.25], [0, 1]);
  const monitorBgOpacity = useTransform(progress, [0.10, 0.25], [1, 0]);
  const videoWidth = useTransform(progress, [0.55, 0.85], ['65%', '100%']);
  const videoScale = useTransform(progress, [0.55, 0.85], [0.85, 1]);
  const borderRadius = useTransform(progress, [0.55, 0.85], ['40px', '32px']);
  const plusOpacity = useTransform(progress, [0.85, 0.95], [0, 1]);
  const h1Opacity = useTransform(progress, [0.15, 0.25], [0, 1]);
  const h1Y = useTransform(progress, [0.15, 0.25], [20, 0]);
  const pOpacity = useTransform(progress, [0.18, 0.28], [0, 1]);
  const pY = useTransform(progress, [0.18, 0.28], [20, 0]);
  const textColor = useTransform(
    progress,
    [0.18, 0.28],
    ['#ffffff', '#0c1b55ff']
  );
  const bgTextOpacity = useTransform(progress, [0, 0.20], [0.4, 0]);
  const bgTextY = useTransform(progress, [0, 0.20], [0, -50]);
  const bgTextScale = useTransform(progress, [0, 0.20], [1, 1.1]);

  const headingText = "Unlimited video editing";

  // On mobile, skip per-character motion.span animation (22 individual motion
  // elements tracking viewport intersection = expensive). Use plain text instead.
  const headingChars = useMemo(() => {
    if (isMobile) {
      return <span className="inline-block">{headingText}</span>;
    }
    return headingText.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: 20, opacity: 0, scale: 0.5 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: i * 0.02,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        viewport={{ once: true }}
        className="inline-block whitespace-pre"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="home">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Aurora Background Gradient */}
        <motion.div
          style={{ opacity: monitorBgOpacity }}
          className="absolute inset-0 bg-aurora z-0"
        />

        {/* Background Large Text (PRECUT STUDIO) */}
        <motion.div
          style={{
            opacity: bgTextOpacity,
            y: bgTextY,
            scale: bgTextScale,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none overflow-hidden md:overflow-visible"
        >
          <div className="flex flex-col items-center justify-center font-black italic tracking-tighter leading-[0.8] text-center w-full">
            <span
              className="text-[18vw] md:text-[22vw] text-transparent bg-clip-text bg-gradient-to-b from-[#f3f4f6] via-[#9ca3af] to-[#4b5563]"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
            >
              PRECUT
            </span>
            <span
              className="text-[18vw] md:text-[22vw] text-transparent bg-clip-text bg-gradient-to-b from-[#f3f4f6] via-[#9ca3af] to-[#4b5563] -mt-[4vw]"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
            >
              STUDIO
            </span>
          </div>
        </motion.div>

        {/* Main Content (Text + Video) */}
        <motion.div
          style={{
            y: scrollYOffset,
            opacity: contentOpacity
          }}
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full px-6 z-20 mx-auto pointer-events-none"
        >
          {/* Hero Text */}
          <div className="flex flex-col items-center">
            <motion.h1
              id="hero-title"
              style={{ opacity: h1Opacity, y: h1Y, color: textColor }}
              className="text-center font-mono font-bold tracking-tight mb-6 leading-tight flex flex-col items-center"
            >
              <span className="text-2xl md:text-5xl flex flex-wrap justify-center overflow-hidden py-1">
                {headingChars}
              </span>
              <span className="text-2xl md:text-[3.25rem] mt-2 block w-full px-4">
                <span className="font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-[#091549]">
                  One subscription,

                  Zero bottlenecks.
                </span>
              </span>
            </motion.h1>

            <motion.p
              style={{ opacity: pOpacity, y: pY, color: textColor }}
              className="text-center text-base md:text-xl max-w-2xl mx-auto opacity-70"
            >
              From short-form to brand films, we turn simple footage into performance-driven cinematic content.
            </motion.p>
          </div>

          {/* Video Container */}
          <div 
            className="w-full max-w-7xl px-6 md:px-12 flex justify-center items-center z-10 mt-2 md:mt-4 relative pointer-events-auto group/video"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            <motion.div style={{ opacity: plusOpacity }} className="absolute -top-8 left-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -top-8 right-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -bottom-8 left-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -bottom-8 right-0 text-navy-blue/20 font-bold text-xl">+</motion.div>

              <motion.div
                style={{
                  width: videoWidth,
                  scale: videoScale,
                  borderRadius: borderRadius,
                }}
                className={`relative ${isMobile ? 'aspect-[9/16]' : 'aspect-video'} bg-navy-blue/10 overflow-hidden shadow-xl border border-navy-blue/5 origin-center`}
              >
              <LazyVideo
                src={isMobile ? mobileVideo : desktopVideo}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                autoPlay={false}
                muted={true}
                loop={true}
                playsInline={true}
                eager={false}
                rootMargin="200px 0px"
                title="Precut Studio Hero VSL"
                aria-label="Main video sales letter showing premium video editing samples"
                className="absolute inset-0 w-full h-full"
                aspectClass="aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              {/* Volume Slider Overlay */}
              <div className={`absolute bottom-6 right-6 flex items-center gap-3 transition-opacity duration-500 z-30 ${isVideoHovered ? 'opacity-100' : 'opacity-30'}`}>
                <div className="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 flex items-center gap-2">
                  <button 
                    onClick={() => setVolume(v => v > 0 ? 0 : 0.5)}
                    className="text-white hover:text-sky-blue transition-colors"
                  >
                    {volume === 0 ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 md:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-blue"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
