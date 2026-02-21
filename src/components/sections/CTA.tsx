import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="call" className="py-24 md:py-32 relative z-20 overflow-hidden">
      
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div>
            <div className="text-sky-blue uppercase tracking-widest text-sm font-bold mb-6">Why Us?</div>
            <h2 className="text-4xl md:text-6xl font-mono font-bold mb-8 leading-tight text-navy-blue">
              Let’s Make Magic <br/>Together.
            </h2>
            <p className="text-navy-blue/80 text-lg md:text-xl mb-6">
              No contracts. No delays. Just consistent, high-performance content — delivered when you need it.
            </p>
            <p className="text-navy-blue/60 text-base mb-10">
              Schedule a quick strategy call. Your next level starts here.
            </p>
            
            <a 
              href="#call" 
              className="inline-block bg-gradient-to-r from-navy-blue to-sky-blue border border-sky-blue/30 px-8 py-4 rounded-full text-white font-medium hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Book Your Free Strategy Call
            </a>
            
            <div className="mt-8 flex items-center space-x-2 text-navy-blue/50 text-sm">
               <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <span>Available to start immediately</span>
            </div>
          </div>
          
          {/* Right Calendar Mockup */}
          <div className="relative">
            <div className="glass-panel p-2 rounded-2xl shadow-2xl border border-white/10 relative z-10">
               <div className="bg-[#111827] rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
                 {/* Mock Calendar Header */}
                 <div className="border-b border-white/10 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-sky-blue/20 flex items-center justify-center text-sky-400 font-bold">P</div>
                      <div>
                        <div className="text-white text-sm font-medium">Precut Studio</div>
                        <div className="text-white/40 text-xs text-left">30 min meeting</div>
                      </div>
                    </div>
                 </div>
                 
                 {/* Mock Calendar Body */}
                 <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
                    <div className="text-center w-full max-w-sm">
                      <h4 className="text-white font-medium mb-4">Select a Date & Time</h4>
                      <div className="grid grid-cols-7 gap-2 mb-4 text-white/40 text-xs">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        <div className="col-start-4 text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">1</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">2</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">3</div>
                        <div className="text-white bg-sky-blue text-navy-blue font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-[0_0_10px_rgba(56,189,248,0.5)] cursor-pointer">4</div>
                        
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">5</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">6</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">7</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">8</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">9</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">10</div>
                        <div className="text-white hover:bg-sky-blue/20 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-colors">11</div>
                      </div>
                      
                      {/* Timeslots Mock */}
                      <div className="flex gap-2 justify-center">
                         <div className="py-2 px-4 border border-sky-blue/30 text-sky-400 rounded-md text-xs cursor-pointer hover:bg-sky-blue/10">10:00am</div>
                         <div className="py-2 px-4 border border-white/10 text-white/60 rounded-md text-xs cursor-pointer hover:bg-white/5 bg-white/5">11:30am</div>
                         <div className="py-2 px-4 border border-white/10 text-white/60 rounded-md text-xs cursor-pointer hover:bg-white/5 bg-white/5">2:00pm</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Decorative background shapes */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-sky-blue/10 rounded-full blur-[40px] z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-sky-blue/20 rounded-full blur-[30px] z-0"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CTA;
