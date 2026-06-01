import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeMobileIdx, setActiveMobileIdx] = useState(1); // Default to middle card (Pro)

  // Auto-swipe demo refs (no state — avoids re-renders)
  const autoSwipeAbortedRef = useRef(false);
  const autoSwipeDoneRef    = useRef(false);
  const autoTimersRef       = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Cancel all pending auto-swipe timeouts — called on any user interaction
  const abortAutoSwipe = useCallback(() => {
    autoSwipeAbortedRef.current = true;
    autoTimersRef.current.forEach(clearTimeout);
    autoTimersRef.current = [];
  }, []);

  // ── Auto-swipe demo ───────────────────────────────────────────────────────
  // Runs ONCE when the section enters the viewport.
  // Sequence (1 s apart): Pro → Agency → Pro → Starter → Pro
  // Cancelled immediately if the user taps or drags before it finishes.
  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || autoSwipeDoneRef.current) return;
        autoSwipeDoneRef.current = true;
        observer.disconnect();

        // Steps: index to show, fired at 1 s, 2 s, 3 s, 4 s after arrival
        const sequence = [2, 1, 0, 1];
        sequence.forEach((targetIdx, i) => {
          const t = setTimeout(() => {
            if (autoSwipeAbortedRef.current) return;
            setActiveMobileIdx(targetIdx);
          }, 1000 + i * 1000);
          autoTimersRef.current.push(t);
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      autoTimersRef.current.forEach(clearTimeout);
    };
  }, [isDesktop, abortAutoSwipe]);

  useEffect(() => {
    if (!isDesktop) {
      // Clear out any lingering inline styles if we resized from desktop
      cardsRef.current.forEach(card => {
        if (card) {
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
        }
      });
      return;
    }

    let rafId: number | null = null;
    let currentP = 0;
    let targetP = 0;
    let isAnimating = false;

    const applyCardTransforms = (p: number) => {
      // We want to fan out based on p.
      const stackedY = 50;
      const spreadX = 95;

      if (cardsRef.current[0]) {
        // Left Card
        const x = (1 - p) * spreadX;
        const y = (1 - p) * stackedY;
        const angle = (1 - p) * -15;
        const scale = 0.85;
        const initialScale = 0.6;
        const currentScale = initialScale + (p * (scale - initialScale));

        cardsRef.current[0].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[0].style.opacity = '1';
      }

      if (cardsRef.current[1]) {
        // Middle Card
        const y = (1 - p) * stackedY;
        const scale = 0.95;
        const initialScale = 0.75;
        const currentScale = initialScale + (p * (scale - initialScale));

        cardsRef.current[1].style.transform = `translate3d(0, ${y}px, 0) scale(${currentScale})`;
        cardsRef.current[1].style.opacity = '1';
        cardsRef.current[1].style.zIndex = '10';
      }

      if (cardsRef.current[2]) {
        // Right Card
        const x = (1 - p) * -spreadX;
        const y = (1 - p) * stackedY;
        const angle = (1 - p) * 15;
        const scale = 0.85;
        const initialScale = 0.6;
        const currentScale = initialScale + (p * (scale - initialScale));

        cardsRef.current[2].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[2].style.opacity = '1';
      }
    };

    const updateAnimation = () => {
      isAnimating = true;
      // Lerp for smooth scrubbing
      const diff = targetP - currentP;
      
      if (Math.abs(diff) > 0.01) {
        currentP += diff * 0.1;
        applyCardTransforms(currentP);
        rafId = requestAnimationFrame(updateAnimation);
      } else {
        currentP = targetP;
        applyCardTransforms(currentP);
        isAnimating = false;
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start separating when the section starts entering the screen (e.g., when its top is at 60% of viewport height).
      // Reaches 1.0 after 1.5 screen heights of scrolling from that point.
      let p = (windowHeight * 0.6 - rect.top) / (windowHeight * 1.5);
      p = Math.max(0, Math.min(1, p));

      targetP = p;

      if (!isAnimating) {
        rafId = requestAnimationFrame(updateAnimation);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    // Kick initial animation
    rafId = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  const tiers = [
    {
      name: "Starter",
      price: "$699",
      desc: "Best for individual creators & early-stage brands.",
      features: [
        "Unlimited requests",
        "1 active video 48hrs",
        "Unlimited revisions",
        "Mon–Fri workflow",
        "Thumbnail Add-on"
      ],
      highlighted: false,
      link: "https://link.payoneer.com/Token?t=7F1BCA416FCE458AA463157B9EFB36AD&src=pl"
    },
    {
      name: "Pro",
      price: "$1,099",
      desc: "Best for scaling brands & content-driven teams.",
      features: [
        "Unlimited requests",
        "2 videos every 48hrs",
        "Unlimited revisions",
        "Dedicated Manager",
        "Priority turnaround",
        "Mon–Fri workflow",
        "Advanced color grading",
        "Thumbnail Add-on"
      ],
      highlighted: true,
      link: "https://link.payoneer.com/Token?t=B815CE12B60E414892ACA647A10C5330&src=pl"
    },
    {
      name: "Agency",
      price: "$1,899",
      desc: "Built for agencies & high-volume brands.",
      features: [
        "Unlimited requests",
        "4 videos every 48hrs",
        "Unlimited revisions",
        "Dedicated Manager",
        "Highest queue priority",
        "Mon–Fri workflow",
        "Thumbnail Add-on"
      ],
      highlighted: false,
      link: "https://link.payoneer.com/Token?t=8C79A1EA1FC24581B09B0586B3AE4EAF&src=pl"
    }
  ];

  return (
    <section id="pricing-section" ref={sectionRef} className="relative z-20 h-auto md:h-[300vh]" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 2400px' }}>
      <div id="pricing" className="absolute top-0 md:top-[150vh] left-0 pointer-events-none w-full"></div>

      <div className="mt-20 md:mt-20 p-0 md:sticky top-[80px] md:h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-visible py-6 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-2 md:mt-0 pb-8 lg:pb-44">

          <div className="text-left mb-10 lg:mt-10 md:mb-0">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 tracking-widest uppercase text-xs md:text-base font-bold mb-2">Subscription Model</div>
            <h2 className={`text-2xl md:text-5xl font-mono font-bold mb-3 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'}`}>
              One Scalable Subscription.<br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-700">Built for Brands That Move Fast.</span>
            </h2>
            <p className={`text-sm md:text-base transition-colors duration-1000 ${isDarkMode ? 'text-white/60' : 'text-navy-blue/70'}`}>Unlimited video editing. Flexible plans. Built to scale with you.</p>
          </div>

          <div className={`
            relative max-w-4xl mx-auto mt-6 md:mt-0
            ${isDesktop ? 'flex flex-row justify-between gap-3' : 'h-[560px] flex items-center justify-center'}
          `}>
            {tiers.map((tier, idx) => {
              // Mobile stack logic: Left, Center, Right positions are fixed
              const isMobileActive = activeMobileIdx === idx;
              
              // Calculate mobile positioning: Sequential Offset Deck logic
              let mobileX = '0';
              let mobileRotate = 0;
              let mobileScale = 1.0;
              let mobileZ = 10;
              let mobileY = '0';

              if (isMobileActive) {
                mobileX = '0';
                mobileRotate = 0;
                mobileScale = 1.05;
                mobileZ = 50;
                mobileY = '0';
              } else {
                // Sequential deck stacking
                if (activeMobileIdx === 0) {
                  // Everything moves right
                  if (idx === 1) { mobileX = '25%'; mobileRotate = 6; mobileZ = 40; mobileY = '20px'; }
                  if (idx === 2) { mobileX = '45%'; mobileRotate = 12; mobileZ = 30; mobileY = '40px'; }
                } else if (activeMobileIdx === 1) {
                  // Flanking the center
                  if (idx === 0) { mobileX = '-35%'; mobileRotate = -8; mobileZ = 40; mobileY = '25px'; }
                  if (idx === 2) { mobileX = '35%'; mobileRotate = 8; mobileZ = 40; mobileY = '25px'; }
                } else if (activeMobileIdx === 2) {
                  // Everything moves left
                  if (idx === 1) { mobileX = '-25%'; mobileRotate = -6; mobileZ = 40; mobileY = '20px'; }
                  if (idx === 0) { mobileX = '-45%'; mobileRotate = -12; mobileZ = 30; mobileY = '40px'; }
                }
                mobileScale = 0.85;
              }

              return (
                <motion.div
                  key={tier.name}
                  ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                  initial={!isDesktop ? { opacity: 0, scale: 0.8, y: 50 } : false}
                  animate={!isDesktop ? { 
                    opacity: 1, 
                    x: mobileX,
                    y: mobileY,
                    rotate: mobileRotate,
                    scale: mobileScale,
                    zIndex: mobileZ
                  } : {}}
                  drag={!isDesktop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={() => abortAutoSwipe()}
                  onDragEnd={(_, info) => {
                    if (isDesktop) return;
                    const swipeThreshold = 50;
                    if (info.offset.x > swipeThreshold) {
                      setActiveMobileIdx(prev => Math.max(0, prev - 1));
                    } else if (info.offset.x < -swipeThreshold) {
                      setActiveMobileIdx(prev => Math.min(tiers.length - 1, prev + 1));
                    }
                  }}
                  whileInView={isDesktop ? { opacity: 1, x: 0 } : {}}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={!isDesktop ? {
                    type: 'spring',
                    stiffness: 220,
                    damping: 26,
                    mass: 0.8,
                  } : { duration: 0.6, delay: idx * 0.1 }}
                  style={isDesktop ? {
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  } : { 
                    position: 'absolute',
                    width: 'min(80vw, 275px)',
                    cursor: 'grab',
                    touchAction: 'none'
                  }}
                  onClick={() => {
                    if (!isDesktop) {
                      abortAutoSwipe();
                      setActiveMobileIdx(idx);
                    }
                  }}
                  className={`w-full max-w-sm mx-auto ${isDesktop ? "relative" : ""}`}
                >
                <div className={`h-full relative rounded-[2rem] transition-all duration-500 hover:scale-105 transform-gpu ${tier.highlighted
                  ? 'bg-aurora text-white shadow-lg shadow-sky-500/10'
                  : `${!isDesktop ? (isDarkMode ? 'bg-navy-blue border-white/20' : 'bg-white border-navy-blue/10') : 'glass-panel'} ${isDarkMode ? 'text-white md:hover:bg-white/10' : 'text-navy-blue md:hover:bg-white md:border-navy-blue/10'} shadow-[0_4px_12px_rgba(9,21,73,0.10)]`
                  }`}>

                  {tier.highlighted && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full shadow-[0_2px_8px_rgba(156,163,175,0.3)] z-20 bg-aurora border border-white/10 text-white overflow-hidden group/badge cursor-default">
                      <div className="relative font-bold text-[10px] tracking-wider px-4 py-1.5 flex items-center justify-center">
                        <span className="relative z-10">MOST POPULAR</span>
                        <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 z-0"></div>
                      </div>
                    </div>
                  )}

                  <div className="h-full w-full p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-mono font-bold mb-1">{tier.name}</h3>
                    <div className="flex items-end mb-2">
                      <span className="text-3xl md:text-4xl font-mono font-bold tracking-tight">{tier.price}</span>
                      <span className={`ml-2 pb-1 text-xs md:text-sm font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/60' : (isDarkMode ? 'text-white/60' : 'text-navy-blue/60')}`}>USD/mo</span>
                    </div>
                    <p className={`text-xs mb-4 font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/90' : (isDarkMode ? 'text-white/90' : 'text-navy-blue')}`}>{tier.desc}</p>

                    <a
                      href={tier.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-2.5 px-4 rounded-xl font-mono font-bold uppercase tracking-wider text-xs mb-4 transition-all duration-300 border-0 bg-sky-blue hover:bg-[#7bc0db] text-navy-blue hover:scale-105 shadow-[0_0_15px_rgba(135,206,235,0.4)] hover:shadow-[0_0_25px_rgba(135,206,235,0.8)]"
                    >
                      Get Started
                    </a>

                    <div className={`text-xs tracking-wider uppercase font-semibold mb-3 font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/70' : (isDarkMode ? 'text-white/70' : 'text-navy-blue')}`}>Includes:</div>
                    <ul className="space-y-2">
                      {tier.features.map(feature => (
                        <li key={feature} className="flex items-start leading-tight">
                          <svg className={`w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0 ${tier.highlighted ? 'text-sky-blue' : 'text-sky-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span className={`text-xs font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/90' : (isDarkMode ? 'text-white/80' : 'text-navy-blue/80')}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-12 max-w-5xl mx-auto flex justify-center md:justify-end px-4">
            <p className={`text-xs font-medium transition-colors duration-1000 ${isDarkMode ? 'text-white/50' : 'text-navy-blue/50'}`}>Transparent pricing. No hidden fees.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
