import React, { useEffect, useRef, useState } from 'react';

const HowItWorks: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const words = ["Simple", "3-Step", "Process."];

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Debounce: only calculate once per frame
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
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

        let newIndex = -1;
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
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);



  const steps = [
    {
      num: "01",
      title: "Submit Footage",
      desc: "Upload your raw clips to your dedicated hub. Add notes, references, or instructions easily."
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
    <section id="how-it-works" className="relative z-20 h-[300vh]" ref={sectionRef} style={{ contentVisibility: 'auto', containIntrinsicSize: '0 2400px' }}>

      {/* Sticky container pins to top (below navbar) while scrolling through the 300vh tall section */}
      <div className="sticky top-[80px] md:top-[35px] h-[calc(100vh-35px)] md:h-[calc(100vh-35px)] w-full flex flex-col justify-center md:justify-start pt-6 md:pt-16 pb-4 md:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">

          <div className="text-center relative">
            <h2 className="text-2xl md:text-5xl font-mono font-bold mb-0 flex flex-col items-center">

              {/* Wrapping container for the sequential highlights */}
              <div className="relative flex flex-col md:flex-row items-center justify-center">

                {/* "Simple" word - alone on top on mobile */}
                <span
                  key={0}
                  ref={el => { if (el) wordRefs.current[0] = el; }}
                  className={`relative z-10 px-4 py-1 md:py-2 transition-all duration-500 ease-out origin-center inline-block ${activeIndex === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 scale-110 md:scale-[1.15]' : `transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'} scale-100`}`}
                >
                  {words[0]}
                </span>

                {/* Container for "3-Step Process" - one line on mobile */}
                <div className="flex items-center justify-center gap-x-0 sm:gap-x-2">
                  {words.slice(1).map((word, i) => (
                    <span
                      key={i + 1}
                      ref={el => { if (el) wordRefs.current[i + 1] = el; }}
                      className={`relative z-10 px-2 md:px-4 py-1 md:py-2 transition-all duration-500 ease-out origin-center inline-block ${activeIndex === (i + 1) ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 scale-110 md:scale-[1.15]' : `transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'} scale-100`}`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-sans ">Zero Friction.</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-white/70' : 'text-navy-blue/70'}`}>
              We handle the heavy lifting so you can focus on building your brand.
            </p>
          </div>

          <div className="relative mt-8 md:mt-0 h-[380px] md:h-[400px] w-full max-w-5xl mx-auto overflow-hidden flex items-center z-20 px-4 md:px-0">

            {/* The Numbers Column (Left) */}
            <div
              className="absolute left-0 md:left-12 w-full md:w-1/3 h-full hidden md:flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
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
            <div
              className="absolute right-0 md:right-12 w-full md:w-1/2 h-full flex flex-col transition-all duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transform: `translateY(-${Math.max(0, activeIndex) * 100}%)` }}
            >
              {steps.map((step, idx) => (
                <div 
                  key={`card-${idx}`} 
                  className={`h-full shrink-0 flex items-center justify-center p-3 md:p-4 transition-all duration-700 ${activeIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >

                  {/* Main Card - Full width on mobile, max-w-lg on desktop */}
                  <div className="relative w-full md:max-w-lg group">
                    <div className={`rounded-3xl p-8 md:p-12 border relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 ${isDarkMode ? `glass-panel text-white bg-gradient-to-br from-sky-500/20 via-sky-500/10 ${idx === 1 ? 'via-[30%]' : 'via-[70%]'} to-[#091549]/60 border-white/10 hover:border-sky-400/30` : `bg-gradient-to-br from-sky-200 via-sky-100 ${idx === 1 ? 'via-[30%]' : 'via-[70%]'} to-[#091549] text-white border-transparent shadow-xl hover:shadow-2xl`}`}>
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-mono text-2xl md:text-4xl font-bold mb-4">{step.num}</div>
                      <h3 className={`text-2xl md:text-3xl font-mono font-bold mb-2 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue group-hover:text-white/90'}`}>{step.title}</h3>
                      <p className={`leading-relaxed text-base md:text-lg transition-colors duration-1000 ${isDarkMode ? 'text-white/70' : 'text-navy-blue/70 group-hover:text-white/70'}`}>{step.desc}</p>
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
