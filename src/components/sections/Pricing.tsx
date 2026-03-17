import React, { useEffect, useRef, useState } from 'react';

const Pricing: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

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

    let animationFrameId: number;
    let currentP = 0;
    let targetP = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start separating when the section starts entering the screen (e.g., when its top is at 60% of viewport height).
      // Reaches 1.0 after 1.5 screen heights of scrolling from that point.
      // This ensures cards are partially open when the title hits the top and becomes sticky,
      // and continue to open while sticky.
      let p = (windowHeight * 0.6 - rect.top) / (windowHeight * 1.5);
      p = Math.max(0, Math.min(1, p));

      targetP = p;
    };

    const updateAnimation = () => {
      // Lerp for smooth scrubbing
      currentP += (targetP - currentP) * 0.1;
      const p = currentP;

      // We want to fan out based on p.
      // p=0: stacked at the bottom center. p=1: perfectly fanned out side-by-side.
      const stackedY = 50;  // minimal vertical movement so it stays centered
      const spreadX = 95;   // keep it on screen

      if (cardsRef.current[0]) {
        // Left Card
        const x = (1 - p) * spreadX;
        const y = (1 - p) * stackedY;
        const angle = (1 - p) * -15; // Rotates back to 0 at p=1
        const scale = 0.85; // Slightly smaller overall to easily fit screen
        // Initially starts slightly smaller behind the middle card
        const initialScale = 0.6;
        const currentScale = initialScale + (p * (scale - initialScale));

        cardsRef.current[0].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[0].style.opacity = '1'; // Solid cards always
      }

      if (cardsRef.current[1]) {
        // Middle Card
        const y = (1 - p) * stackedY;
        const scale = 0.95; // Middle is slightly larger, but still smaller than 1.0 to fit
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
        const angle = (1 - p) * 15; // Rotates back to 0 at p=1
        const scale = 0.85;
        const initialScale = 0.6;
        const currentScale = initialScale + (p * (scale - initialScale));

        cardsRef.current[2].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[2].style.opacity = '1';
      }

      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    updateAnimation();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  const tiers = [
    {
      name: "Starter",
      price: "$399",
      desc: "Best for individual creators & early-stage brands.",
      features: [
        "Unlimited requests",
        "1 active video 48hrs",
        "Unlimited revisions",
        "Mon–Fri workflow",
        "Cancel anytime"
      ],
      highlighted: false,
      link: "https://link.payoneer.com/Token?t=7F1BCA416FCE458AA463157B9EFB36AD&src=pl"
    },
    {
      name: "Pro",
      price: "$699",
      desc: "Best for scaling brands & content-driven teams.",
      features: [
        "Unlimited requests",
        "2 videos every 48hrs",
        "Unlimited revisions",
        "Dedicated Manager",
        "Priority turnaround",
        "Mon–Fri workflow",
        "Advanced color grading"
      ],
      highlighted: true,
      link: "https://link.payoneer.com/Token?t=B815CE12B60E414892ACA647A10C5330&src=pl"
    },
    {
      name: "Agency",
      price: "$1,199",
      desc: "Built for agencies & high-volume brands.",
      features: [
        "Unlimited requests",
        "4 videos every 48hrs",
        "Unlimited revisions",
        "Dedicated Manager",
        "Highest queue priority",
        "Free thumbnails",
        "Advanced motion design",
        "Mon–Fri workflow"
      ],
      highlighted: false,
      link: "https://link.payoneer.com/Token?t=8C79A1EA1FC24581B09B0586B3AE4EAF&src=pl"
    }
  ];

  return (
    <section id="pricing-section" ref={sectionRef} className="relative z-20 md:h-[300vh]">
      {/* Hidden anchor point positioned so that scrolling to it sets p >= 1.0 */}
      {/* Animation reaches 1.0 after 1.5 screen heights (150vh). We put the anchor there. */}
      <div id="pricing" className="absolute top-0 md:top-[150vh] left-0 pointer-events-none w-full"></div>

      {/* Sticky container stays on screen while scrolling the height on desktop */}
      <div className="md:mt-20 p-0 md:sticky top-[80px] md:h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-visible py-8 md:py-16 ">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mt-4 md:mt-0 pb-12">

          <div className="text-left mb-10 md:mb-0 ">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 tracking-widest uppercase text-sm md:text-base font-bold mb-2">Subscription Model</div>
            <h2 className={`text-3xl md:text-5xl font-mono font-bold mb-3 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'}`}>
              One Scalable Subscription.<br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Built for Brands That Move Fast.</span>
            </h2>
            <p className={`text-base transition-colors duration-1000 ${isDarkMode ? 'text-white/60' : 'text-navy-blue/70'}`}>Unlimited video editing. Flexible plans. Built to scale with you.</p>
          </div>

          <div className="flex justify-between  relative max-w-5xl mx-auto">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                style={{ willChange: 'transform, opacity' }}
                className={`w-full max-w-sm mx-auto ${!isDesktop ? "relative !opacity-100 !transform-none" : "absolute inset-0 md:relative"}`}
              // Note: We use !important in tailwind equivalent classes to override the inline styles set by JS if `isDesktop` is false
              >
                <div className={`h-full relative rounded-[2rem] transition-all duration-300 hover:scale-105 ${tier.highlighted
                  ? 'bg-[#0d2060] text-white shadow-2xl shadow-sky-500/20'
                  : `glass-panel transition-colors duration-1000 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-navy-blue hover:bg-white border-navy-blue/10'} shadow-[0_8px_32px_rgba(9,21,73,0.18)]`
                  }`}>

                  {tier.highlighted && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full shadow-[0_4px_15px_rgba(156,163,175,0.6)] z-20 bg-[#0d2060] border border-white/10 text-white overflow-hidden group/badge cursor-default">
                      <div className="relative font-bold text-[10px] tracking-wider px-4 py-1.5 flex items-center justify-center">
                        <span className="relative z-10">MOST POPULAR</span>
                        {/* Hover shine effect */}
                        <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 z-0"></div>
                      </div>
                    </div>
                  )}

                  <div className="h-full w-full p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl font-mono font-bold mb-1">{tier.name}</h3>
                    <div className="flex items-end mb-2">
                      <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight">{tier.price}</span>
                      <span className={`ml-2 pb-1 text-xs md:text-sm font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/60' : (isDarkMode ? 'text-white/60' : 'text-navy-blue/60')}`}>USD/mo</span>
                    </div>
                    <p className={`text-sm mb-4 min-h-[40px] font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/80' : (isDarkMode ? 'text-white/80' : 'text-navy-blue/80')}`}>{tier.desc}</p>

                    <a
                      href={tier.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full py-2.5 px-4 rounded-xl font-mono font-bold uppercase tracking-wider text-sm mb-5 transition-all duration-300 border-0 bg-sky-blue hover:bg-[#7bc0db] text-navy-blue hover:scale-105 shadow-[0_0_15px_rgba(135,206,235,0.4)] hover:shadow-[0_0_25px_rgba(135,206,235,0.8)]"
                    >
                      Get Started
                    </a>

                    <div className={`text-xs tracking-wider uppercase font-semibold mb-2 font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/60' : (isDarkMode ? 'text-white/60' : 'text-navy-blue/60')}`}>Includes:</div>
                    <ul className="space-y-2.5">
                      {tier.features.map(feature => (
                        <li key={feature} className="flex items-start leading-tight">
                          <svg className={`w-4 h-4 mr-2 shrink-0 ${tier.highlighted ? 'text-sky-blue' : 'text-sky-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span className={`text-sm font-sans transition-colors duration-1000 ${tier.highlighted ? 'text-white/90' : (isDarkMode ? 'text-white/90' : 'text-navy-blue/90')}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8  max-w-5xl pr-[25px] mx-auto flex justify-end">
            <p className="text-xs text-navy-blue font-medium">Transparent pricing. No hidden fees.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
