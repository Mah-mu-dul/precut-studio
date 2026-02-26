import React from 'react';

const Hero: React.FC = () => {

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 md:pt-28 transition-colors duration-1000" id="home">
      
      {/* Hero Content */}
      <div 
        className="flex flex-col items-center text-center w-full px-6 z-20  mx-auto pointer-events-none sticky top-1/4"
      >
        <h1 className="text-center font-mono font-bold tracking-tight mb-6 leading-tight transition-colors duration-500 text-navy-blue flex flex-col items-center">
          <span className="text-4xl md:text-7xl">Unlimited video editing</span>
          <span className="text-2xl md:text-[3.25rem] mt-2 block w-full">
            <span className="font-sans font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#091549]">
              One subscription,
            </span> Zero bottlenecks.
          </span>
        </h1>
        <p className="text-center text-base md:text-xl max-w-2xl mx-auto transition-colors duration-500 text-navy-blue opacity-70">
          From short-form to brand films, we turn simple footage into performance-driven cinematic content.
        </p>
      </div>



    </section>
  );
};

export default Hero;
