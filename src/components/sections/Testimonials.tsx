import React, { useEffect, useState } from 'react';

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('testimonials');
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      role: "Creative Director",
      text: "Precut Studio completely transformed our agency's output capacity. What used to take us a week now takes 48 hours without compromising an ounce of quality."
    },
    {
      id: 2,
      name: "Sarah T.",
      role: "Brand Founder",
      text: "We needed cinematic, high-retention content for our paid social funnel. Their team delivered exactly what we needed to scale our CAC down by 30%."
    },
    {
      id: 3,
      name: "David K.",
      role: "YouTube Creator (1M+ Subs)",
      text: "I was drowning in footage before finding them. Now I just drop the files and get back a polished, perfectly paced final cut every single time."
    }
  ];

  return (
    <section id="testimonials" className="py-12 relative z-20 overflow-hidden">
      
      {/* Intro Text Sequence */}
      <div className={`max-w-4xl mx-auto px-6 text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Submit your request.
        </h3>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-navy-blue/50 mb-4 transition-all duration-1000 delay-300">
          We handle the execution.
        </h3>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-1000 delay-500">
          You focus on growth.
        </h3>
      </div>
      
      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-navy-blue">
            Success Stories<br/>
            <span className="text-navy-blue/60 font-sans">from the Creative Frontline</span>
          </h2>
          <p className="text-navy-blue/50 text-lg">Trusted by creators and brands who demand performance-driven visuals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
              <div 
               key={review.id} 
              className="bg-white p-8 rounded-2xl border border-navy-blue/5 shadow-[0_8px_30px_rgba(9,21,73,0.04)] flex flex-col justify-between hover:scale-105 hover:shadow-[0_20px_40px_rgba(9,21,73,0.08)] transition-all duration-300"
            >
              <div className="flex text-sky-blue mb-6">
                {[1,2,3,4,5].map(star => (
                   <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
              </div>
              <p className="text-navy-blue/80 text-lg leading-relaxed mb-8">"{review.text}"</p>
              
              <div className="flex items-center">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-blue/10 to-navy-blue/5 flex items-center justify-center text-xl font-bold text-sky-400 mr-4">
                   {review.name.charAt(0)}
                 </div>
                 <div>
                   <h4 className="text-navy-blue font-medium">{review.name}</h4>
                   <p className="text-navy-blue/40 text-sm">{review.role}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
