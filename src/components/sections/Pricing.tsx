import React, { useEffect, useRef, useState } from 'react';

const Pricing: React.FC = () => {
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
    if (!isDesktop) return;

    let animationFrameId: number;
    let currentP = 0;
    let targetP = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The section is 200vh tall. 
      // Animation starts when the top of the section hits the top of the viewport (rect.top = 0).
      // Animation ends earlier, so it holds stable for reading. Let's finish when we scroll 60% of windowHeight.
      // (Originally we waited until rect.top = -windowHeight, now we wait until -windowHeight * 0.6)
      let p = -rect.top / (windowHeight * 0.6);
      p = Math.max(0, Math.min(1, p));
      
      targetP = p;
    };

    const updateAnimation = () => {
      // Lerp for smooth scrubbing
      currentP += (targetP - currentP) * 0.1;
      const p = currentP;
      
      // We want to fan out based on p.
      // p=0: stacked at the bottom center. p=1: perfectly fanned out side-by-side.
      const stackedY = 200; // start 200px lower
      const spreadX = 110;  // 110% to left and right

      if (cardsRef.current[0]) {
        // Left Card
        const x = (1 - p) * spreadX; 
        const y = (1 - p) * stackedY;
        const angle = (1 - p) * -15; // Rotates back to 0 at p=1
        const scale = 0.85; // Slightly smaller overall to easily fit screen
        // Initially starts slightly smaller behind the middle card
        const initialScale = 0.7; 
        const currentScale = initialScale + (p * (scale - initialScale));
        
        cardsRef.current[0].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[0].style.opacity = Math.min(1, p + 0.2).toString(); // Slow fade in
      }
      
      if (cardsRef.current[1]) {
        // Middle Card
        const y = (1 - p) * stackedY;
        const scale = 0.95; // Middle is slightly larger, but still smaller than 1.0 to fit
        const initialScale = 0.75;
        const currentScale = initialScale + (p * (scale - initialScale));
        
        cardsRef.current[1].style.transform = `translate3d(0, ${y}px, 0) scale(${currentScale})`;
        cardsRef.current[1].style.opacity = Math.min(1, p + 0.5).toString(); 
        cardsRef.current[1].style.zIndex = '10'; 
      }
      
      if (cardsRef.current[2]) {
        // Right Card
        const x = (1 - p) * -spreadX; 
        const y = (1 - p) * stackedY;
        const angle = (1 - p) * 15; // Rotates back to 0 at p=1
        const scale = 0.85;
        const initialScale = 0.7;
        const currentScale = initialScale + (p * (scale - initialScale));
        
        cardsRef.current[2].style.transform = `translate3d(${x}%, ${y}px, 0) rotate(${angle}deg) scale(${currentScale})`;
        cardsRef.current[2].style.opacity = Math.min(1, p + 0.2).toString();
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
      highlighted: false
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
      highlighted: true
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
      highlighted: false
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="relative z-20 h-[200vh]">
      {/* Sticky container stays on screen while scrolling the 200vh height */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          
          <div className="text-center">
             <div className="text-sky-blue tracking-widest uppercase text-[10px] font-bold mb-2">Subscription Model</div>
             <h2 className="text-3xl md:text-4xl font-mono font-bold mb-3 text-navy-blue">
               One Scalable Subscription.<br/>
               <span className="font-sans text-navy-blue/80">Built for Brands That Move Fast.</span>
             </h2>
             <p className="text-navy-blue/60 text-base">Unlimited video editing. Flexible plans. Built to scale with you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-5xl mx-auto relative perspective-[1200px]">
             {tiers.map((tier, idx) => (
               <div 
                 key={tier.name}
                 ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                 style={{ willChange: 'transform, opacity' }}
                 className={!isDesktop ? "mb-6" : "absolute inset-0 md:relative"} // On mobile, stack normally. On desktop, absolute stack them for animation.
               >
                 <div className={`h-full relative rounded-[2rem] transition-shadow duration-300 ${
                   tier.highlighted 
                     ? 'bg-navy-blue text-white shadow-[0_20px_40px_rgba(9,21,73,0.15)] hover:shadow-[0_25px_50px_rgba(9,21,73,0.25)]' 
                     : 'bg-white text-navy-blue border border-navy-blue/10 shadow-[0_8px_20px_rgba(9,21,73,0.03)] hover:shadow-[0_15px_30px_rgba(9,21,73,0.08)]'
                 }`}>
                   
                   {tier.highlighted && (
                     <div className="absolute top-0 right-6 -translate-y-1/2 bg-sky-blue text-navy-blue text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                       MOST POPULAR
                     </div>
                   )}
                   
                   <div className="h-full w-full p-6 md:p-8">
                     <h3 className="text-xl font-mono font-bold mb-1">{tier.name}</h3>
                     <div className="flex items-end mb-3">
                       <span className="text-4xl font-mono font-bold tracking-tight">{tier.price}</span>
                       <span className={`ml-2 pb-1 text-xs font-sans ${tier.highlighted ? 'text-white/60' : 'text-navy-blue/60'}`}>USD/mo</span>
                     </div>
                     <p className={`text-xs mb-6 min-h-[36px] font-sans ${tier.highlighted ? 'text-white/80' : 'text-navy-blue/80'}`}>{tier.desc}</p>
                     
                     <button className={`w-full py-2.5 px-4 rounded-xl font-mono font-bold uppercase tracking-wider text-xs mb-6 transition-all ${
                       tier.highlighted 
                         ? 'bg-sky-blue hover:bg-[#7bc0db] text-navy-blue shadow-[0_0_15px_rgba(135,206,235,0.4)] hover:-translate-y-0.5' 
                         : 'bg-navy-blue/5 hover:bg-navy-blue/10 text-navy-blue border border-navy-blue/10 hover:-translate-y-0.5'
                     }`}>
                       Get Started
                     </button>
                     
                     <div className={`text-[10px] tracking-wider uppercase font-semibold mb-3 font-sans ${tier.highlighted ? 'text-white/50' : 'text-navy-blue/50'}`}>Includes:</div>
                     <ul className="space-y-3">
                       {tier.features.map(feature => (
                         <li key={feature} className="flex items-start leading-tight">
                           <svg className={`w-4 h-4 mr-2 shrink-0 ${tier.highlighted ? 'text-sky-blue' : 'text-navy-blue/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                           <span className={`text-[11px] font-sans ${tier.highlighted ? 'text-white/90' : 'text-navy-blue/90'}`}>{feature}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
               </div>
             ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-navy-blue/40 text-xs">Transparent pricing. No hidden fees.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
