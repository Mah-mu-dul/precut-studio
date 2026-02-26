import React, { useEffect, useRef, useState } from 'react';

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });

  const words = ["Simple", "3-Step", "Process."];

  useEffect(() => {
    let animationFrameId: number;
    let newIndex = -1;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The section is 300vh, so scrollable pinning distance is 200vh
      const scrollableDistance = rect.height - windowHeight;
      if (scrollableDistance <= 0) return;

      // Progress p is 0 when the section top reaches the viewport top
      // Progress p is 1 when the section bottom reaches the viewport bottom
      const p = -rect.top / scrollableDistance;
      
      // Divide the scroll progress into stages
      // Less than 0: Not pinned yet (scroll freely above)
      // 0.0 - 0.25: Highlight Word 0 ("Simple")
      // 0.25 - 0.50: Highlight Word 1 ("3-Step")
      // 0.50 - 0.75: Highlight Word 2 ("Process.")
      // 0.75 - 1.0: Keep Word 2 highlighted ("Process.")
      // > 1.0: Unpinned (scroll freely below), but keep Word 2 active
      
      if (p < 0) {
        newIndex = -1;
      } else if (p >= 0 && p < 0.25) {
        newIndex = 0;
      } else if (p >= 0.25 && p < 0.50) {
        newIndex = 1;
      } else if (p >= 0.50) {
        newIndex = 2; // Keep it on the last step
      }

      setActiveIndex(newIndex);
    };

    // Use requestAnimationFrame for smooth performance
    const renderLoop = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Update the liquid highlight background's position and width smoothly when the active word changes
  useEffect(() => {
    const updateHighlight = () => {
      if (activeIndex >= 0 && activeIndex < 3 && wordRefs.current[activeIndex]) {
          const el = wordRefs.current[activeIndex];
          setHighlightStyle({ 
            left: el.offsetLeft, 
            width: el.offsetWidth,
            top: el.offsetTop,
            height: el.offsetHeight 
          });
      }
    };
    
    updateHighlight();
    
    // Also recalculate if the user resizes the window
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [activeIndex]);

  const steps = [
    {
      num: "01",
      title: "Submit Footage",
      desc: "Upload your raw clips to your dedicated dashboard. Add notes, references, or instructions easily."
    },
    {
      num: "02",
      title: "We Edit",
      desc: "Our professional editors turn your clips into engaging, performance-driven videos in just 48 hours."
    },
    {
      num: "03",
      title: "Receive Final Video",
      desc: "Review the finished product. Request unlimited revisions until it's perfect. Download and post."
    }
  ];

  return (
    // Make section 300vh so it pins for exactly 200vh of scroll distance
    <section id="how-it-works" className="relative z-20 h-[300vh]" ref={sectionRef}>
      
      {/* Sticky container pins to top (below navbar) while scrolling through the 300vh tall section */}
      <div className="sticky top-[80px] md:top-[35px] h-[calc(100vh-35px)] md:h-[calc(100vh-35px)] w-full flex flex-col justify-center md:justify-start pt-12 md:pt-20 pb-8 md:pb-0 overflow-hidden bg-off-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          
          <div className="text-center relative">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-0 flex flex-col items-center">
              
              {/* Wrapping container for the sequential highlights */}
              <div className="relative inline-flex flex-wrap justify-center gap-x-1 sm:gap-x-2 py-2">
                 
                 {/* The Liquid Highlight Background (#091549 = navy-blue) */}
                 <div 
                   className="absolute bg-navy-blue rounded-xl z-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                   style={{ 
                     left: highlightStyle.left, 
                     top: highlightStyle.top,
                     width: highlightStyle.width,
                     height: highlightStyle.height,
                     opacity: activeIndex >= 0 ? 1 : 0,
                     transform: activeIndex >= 0 ? 'scale(1)' : 'scale(0.8)'
                   }}
                 />
                 
                 {/* The 3 Words */}
                 {words.map((word, i) => (
                   <span 
                     key={i} 
                     ref={el => { if (el) wordRefs.current[i] = el; }}
                     className={`relative z-10 px-4 py-2 transition-colors duration-500 rounded-xl ${activeIndex === i ? 'text-white' : 'text-navy-blue'}`}
                   >
                     {word}
                   </span>
                 ))}
                 
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-sans mt-2">Zero Friction.</span>
            </h2>
            <p className="text-navy-blue/70 text-lg max-w-2xl mx-auto">
              We handle the heavy lifting so you can focus on building your brand.
            </p>
          </div>

          <div className="relative -mt-0 md:-mt-0 h-[300px] md:h-[400px] w-full max-w-5xl mx-auto overflow-hidden flex items-center z-20">
            
            {/* The Numbers Column (Left) */}
            <div 
              className="absolute left-0 md:left-12 w-1/3 h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transform: `translateY(-${Math.max(0, activeIndex) * 100}%)` }}
            >
              {steps.map((_, idx) => (
                <div key={`num-${idx}`} className="h-full shrink-0 flex items-center justify-center">
                  <span className="text-[12rem] md:text-[20rem] font-bold font-sans text-gray-200/80 tracking-tighter leading-none select-none">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* The Cards Column (Right) */}
            {/* Adding a delay-200 so it slides up slightly after the number, as requested */}
            <div 
              className="absolute right-0 md:right-12 w-2/3 md:w-1/2 h-full flex flex-col transition-transform duration-700 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transform: `translateY(-${Math.max(0, activeIndex) * 100}%)` }}
            >
              {steps.map((step, idx) => (
                <div key={`card-${idx}`} className="h-full shrink-0 flex items-center justify-center p-4">
                  
                  {/* Container simulating the yellow background shadow offset from the image */}
                  <div className="relative w-full max-w-lg">
                    {/* Yellow offset background */}
                    <div className="absolute inset-0 bg-[#F5F5DC] rounded-3xl translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10"></div>
                    
                    {/* Main White Card */}
                    <div className="bg-white rounded-3xl p-5 md:p-12 border border-black/5 shadow-sm relative z-10 w-full">
                      <div className="text-sky-blue font-mono text-3xl md:text-4xl font-bold mb-4">{step.num}</div>
                      <h3 className="text-2xl md:text-3xl font-mono font-bold text-navy-blue mb-4">{step.title}</h3>
                      <p className="text-navy-blue/70 leading-relaxed text-base md:text-lg">{step.desc}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
