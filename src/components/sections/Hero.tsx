import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import heroVideo from '../../assets/portfolio-videos/Video 1.mp4';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for text scrolling UP
  const textY = useTransform(smoothYProgress, [0, 0.4], [0, -300]);
  const textOpacity = useTransform(smoothYProgress, [0, 0.3], [1, 0]);

  // Transform values for the video growth and movement
  // Starts small at the left and lower, moves to center and full width
  const width = useTransform(smoothYProgress, [0, 0.8], ["40%", "100%"]);
  const scale = useTransform(smoothYProgress, [0, 0.8], [0.85, 1]);
  const borderRadius = useTransform(smoothYProgress, [0, 0.8], ["40px", "0px"]);
  
  // X: move from far left to center
  const videoX = useTransform(smoothYProgress, [0, 0.8], ["-50%", "0%"]);
  // Y: move from lower position up to center
  const videoY = useTransform(smoothYProgress, [0, 0.8], ["60%", "0%"]);

  return (
    <section ref={containerRef} className="relative h-[250vh] transition-colors duration-1000" id="home">
      {/* Sticky Hero Backdrop/Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Text Content - Absolute so it can be transformed independently */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="absolute top-32 flex flex-col items-center text-center w-full px-6 z-20 mx-auto pointer-events-none"
        >
          <h1 className="text-center font-mono font-bold tracking-tight mb-6 leading-tight transition-colors duration-500 text-navy-blue flex flex-col items-center">
            <span className="text-3xl md:text-5xl">Unlimited video editing</span>
            <span className="text-3xl md:text-[3.25rem] mt-2 block w-full">
              <span className="font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">
                One subscription,
              </span>
              <span className="ml-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">
                Zero bottlenecks.
              </span>
            </span>
          </h1>
          <p className="text-center text-base md:text-xl max-w-2xl mx-auto transition-colors duration-500 text-navy-blue opacity-70">
            From short-form to brand films, we turn simple footage into performance-driven cinematic content.
          </p>
        </motion.div>

        {/* Animated Video Placeholder - Centered Grid Container */}
        <div className="w-full max-w-7xl px-6 md:px-12 flex justify-center items-center z-10 w-full mb-52 pt-20">
          <motion.div
            style={{
              width,
              scale,
              borderRadius,
              x: videoX,
              y: videoY,
            }}
            className="relative aspect-video bg-navy-blue/10 overflow-hidden shadow-xl border border-navy-blue/5 origin-bottom-left"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            
            {/* Visual Polish: Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};



export default Hero;
