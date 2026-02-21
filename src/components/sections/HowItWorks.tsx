import React from 'react';

const HowItWorks: React.FC = () => {
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
    <section id="how-it-works" className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 text-navy-blue">
            Simple 3-Step Process.<br/>
            <span className="text-sky-blue font-sans">Zero Friction.</span>
          </h2>
          <p className="text-navy-blue/70 text-lg max-w-2xl mx-auto">
            We handle the heavy lifting so you can focus on building your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 border border-navy-blue/5 shadow-sm hover:shadow-[0_10px_40px_rgba(9,21,73,0.08)] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="text-sky-blue font-mono text-4xl font-bold mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                {step.num}
              </div>
              <h3 className="text-2xl font-mono font-bold text-navy-blue mb-4">{step.title}</h3>
              <p className="text-navy-blue/70 leading-relaxed text-lg">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
