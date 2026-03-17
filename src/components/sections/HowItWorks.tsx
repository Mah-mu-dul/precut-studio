import React, { useEffect, useRef, useState } from 'react';

const HowItWorks: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

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
    <section id="how-it-works" className="relative z-20 h-[300vh]" ref={sectionRef}>

      {/* Sticky container pins to top (below navbar) while scrolling through the 300vh tall section */}
      <div className="sticky top-[80px] md:top-[35px] h-[calc(100vh-35px)] md:h-[calc(100vh-35px)] w-full flex flex-col justify-center md:justify-start pt-12 md:pt-20 pb-8 md:pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">

          <div className="text-center relative">
            <h2 className="text-3xl md:text-5xl font-mono font-bold mb-0 flex flex-col items-center">

              {/* Wrapping container for the sequential highlights */}
              <div className="relative inline-flex flex-wrap justify-center gap-x-1 sm:gap-x-2 ">

                {/* The 3 Words */}
                {words.map((word, i) => (
                  <span
                    key={i}
                    ref={el => { if (el) wordRefs.current[i] = el; }}
                    className={`relative z-10 px-4 py-2 transition-all duration-500 ease-out origin-center inline-block ${activeIndex === i ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 scale-110 md:scale-[1.15]' : `transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue'} scale-100`}`}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-sans ">Zero Friction.</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-1000 ${isDarkMode ? 'text-white/70' : 'text-navy-blue/70'}`}>
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
            <div
              className="absolute right-0 md:right-12 w-2/3 md:w-1/2 h-full flex flex-col transition-transform duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transform: `translateY(-${Math.max(0, activeIndex) * 100}%)` }}
            >
              {steps.map((step, idx) => (
                <div key={`card-${idx}`} className="h-full shrink-0 flex items-center justify-center p-4">

                  {/* Main Card without any external shadow overlays */}
                  <div className="relative w-full max-w-lg group">
                    <div className={`rounded-3xl p-5 md:p-12 border relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 ${isDarkMode ? `glass-panel text-white bg-gradient-to-br from-sky-500/20 via-sky-500/10 ${idx === 1 ? 'via-[30%]' : 'via-[70%]'} to-[#091549]/60 border-white/10 hover:border-sky-400/30` : `bg-gradient-to-br from-sky-200 via-sky-100 ${idx === 1 ? 'via-[30%]' : 'via-[70%]'} to-[#091549] text-white border-transparent shadow-xl hover:shadow-2xl`}`}>
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 font-mono text-3xl md:text-4xl font-bold mb-4">{step.num}</div>
                      <h3 className={`text-2xl md:text-3xl font-mono font-bold mb-4 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-navy-blue group-hover:text-white/90'}`}>{step.title}</h3>
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
