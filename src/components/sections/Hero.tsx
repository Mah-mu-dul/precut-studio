import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const heroVideo = "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%201.mp4";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ─── VIDEO PLAYBACK ──────────────────────────────────────────
  useMotionValueEvent(smoothYProgress, 'change', (latest) => {
    if (!videoRef.current) return;
    if (latest > 0.65) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  });

  // ─── ANIMATION STAGES ───────────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lockOffset = isMobile ? -360 : -350; // Locked position at the top
  const endOffset = lockOffset - 400; // Final scroll exit

  const scrollYOffset = useTransform(
    smoothYProgress,
    [0, 0.45, 0.85, 1], // Map: Start -> Locked -> Full Zoom -> Exit
    [0, lockOffset, lockOffset, endOffset]
  );

  // Content visibility: fades in as we scroll past background text
  const contentOpacity = useTransform(smoothYProgress, [0.10, 0.25], [0, 1]);

  // Monitor background: Fades out to sync with App.tsx dark mode change
  const monitorBgOpacity = useTransform(smoothYProgress, [0.10, 0.25], [1, 0]);

  // Video Zoom Phase (0.55 -> 0.85): Happens while text is locked
  const videoWidth = useTransform(smoothYProgress, [0.55, 0.85], ['40%', '100%']);
  const videoScale = useTransform(smoothYProgress, [0.55, 0.85], [0.85, 1]);
  const borderRadius = useTransform(smoothYProgress, [0.55, 0.85], ['40px', '32px']);
  const videoX = useTransform(smoothYProgress, [0.55, 0.85], ['-50%', '0%']);
  const plusOpacity = useTransform(smoothYProgress, [0.85, 0.95], [0, 1]);

  // Main Heading & Paragraph Stagger - Finishes by the time we lock
  const h1Opacity = useTransform(smoothYProgress, [0.15, 0.25], [0, 1]);
  const h1Y = useTransform(smoothYProgress, [0.15, 0.25], [20, 0]);
  const pOpacity = useTransform(smoothYProgress, [0.18, 0.28], [0, 1]);
  const pY = useTransform(smoothYProgress, [0.18, 0.28], [20, 0]);

  const textColor = useTransform(
    smoothYProgress,
    [0.18, 0.28], // Synced with monitorBgOpacity and App.tsx transition
    ['#ffffff', '#0c1b55ff']
  );

  const headingText = "Unlimited video editing";

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="home">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dark Background Gradient */}
        <motion.div
          style={{ opacity: monitorBgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black via-[#050b24] to-[#091549] z-0"
        />

        {/* Background Large Text (PRECUT STUDIO) */}
        <motion.div
          style={{
            opacity: useTransform(smoothYProgress, [0, 0.20], [0.4, 0]),
            y: useTransform(smoothYProgress, [0, 0.20], [0, -50]),
            scale: useTransform(smoothYProgress, [0, 0.20], [1, 1.1])
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
              style={{ opacity: h1Opacity, y: h1Y, color: textColor }}
              className="text-center font-mono font-bold tracking-tight mb-6 leading-tight flex flex-col items-center"
            >
              <span className="text-3xl md:text-5xl flex flex-wrap justify-center overflow-hidden py-1">
                {headingText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0, scale: 0.5 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.02,
                      ease: [0.34, 1.56, 0.64, 1] // Bouncy popup popup effect
                    }}
                    viewport={{ once: true }}
                    className="inline-block whitespace-pre"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="text-3xl md:text-[3.25rem] mt-2 block w-full px-4">
                <span className="font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-blue to-sky-400">
                  One subscription,
                </span>
                <span className="ml-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-blue to-sky-400">
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
          <div className="w-full max-w-7xl px-6 md:px-12 flex justify-center items-center z-10 mt-2 md:mt-4 relative pointer-events-auto">
            <motion.div style={{ opacity: plusOpacity }} className="absolute -top-8 left-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -top-8 right-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -bottom-8 left-0 text-navy-blue/20 font-bold text-xl">+</motion.div>
            <motion.div style={{ opacity: plusOpacity }} className="absolute -bottom-8 right-0 text-navy-blue/20 font-bold text-xl">+</motion.div>

            <motion.div
              style={{
                width: videoWidth,
                scale: videoScale,
                borderRadius: borderRadius,
                x: videoX,
              }}
              className="relative aspect-video bg-navy-blue/10 overflow-hidden shadow-xl border border-navy-blue/5 origin-bottom-left"
            >
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
