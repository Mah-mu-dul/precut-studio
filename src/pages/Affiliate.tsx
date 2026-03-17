import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';

/* ─── REVERSIBLE useInView ─ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis] as const;
}

/* ─── REVEAL COMPONENT ─ */
interface RevealProps { children: React.ReactNode; delay?: number; from?: 'bottom' | 'left' | 'right' | 'scale'; className?: string; threshold?: number; }
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, from = 'bottom', className = '', threshold = 0.12 }) => {
  const [ref, vis] = useInView(threshold);
  const hidden = from === 'left' ? 'opacity-0 -translate-x-10' : from === 'right' ? 'opacity-0 translate-x-10' : from === 'scale' ? 'opacity-0 scale-90' : 'opacity-0 translate-y-8';
  return (
    <div ref={ref} style={{ transitionDelay: vis ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hidden} ${className}`}>
      {children}
    </div>
  );
};

const Affiliate: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const H = 'text-navy-blue';
  const B = 'text-navy-blue/60';
  const BG = 'bg-off-white';

  const steps = [
    {
      number: '01',
      title: 'Apply / Get your link',
      desc: 'Fill out the quick form below to get your unique referral link.'
    },
    {
      number: '02',
      title: 'Share with your network',
      desc: 'Share your link with creators, brands, or businesses in your circle.'
    },
    {
      number: '03',
      title: 'They subscribe',
      desc: 'Once they join Precut Studio and complete their first payment.'
    },
    {
      number: '04',
      title: 'Earn recurring savings',
      desc: 'Your 5% discount activates automatically on your next billing cycle.'
    }
  ];

  const benefits = [
    {
      title: '5% Recurring Discount',
      desc: 'Save every month as long as your referred client stays subscribed to Precut Studio.'
    },
    {
      title: 'No Caps, No Limits',
      desc: 'Refer as many brands as you want. Your savings can grow with your network.'
    },
    {
      title: 'Fast, Simple Activation',
      desc: 'Once your referral subscribes successfully, your discount applies automatically from your next billing cycle.'
    }
  ];


  return (
    <div className={`min-h-screen ${BG} text-navy-blue font-sans selection:bg-sky-blue selection:text-white overflow-x-hidden`}>
      <Navbar isDarkMode={false} />

      {/* ─── HERO SECTION ─── */}
      <section id="sec-hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Reveal delay={100}>
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue border border-sky-blue/30 rounded-full px-4 py-1.5 mb-8">
                Affiliate Program
              </span>
            </Reveal>
            <Reveal delay={200}>
              <h1 className={`text-5xl md:text-7xl font-mono font-bold leading-tight mb-8 transition-colors duration-500 ${H}`}>
                Turn Referrals Into<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue">
                  Monthly Rewards
                </span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12 transition-colors duration-500 ${B}`}>
                Love the workflow? Invite another creator or brand. Once they join, you get 5% off your plan every month. No complicated rules. Just recurring savings.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a
                href="https://app.youform.com/forms/v9maqeth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-gradient-to-r from-navy-blue to-sky-blue border-0 rounded-full text-white font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)]"
              >
                Start Earning
              </a>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (DSQR STYLE) ─── */}
      <section id="sec-how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="mb-16">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue font-mono text-xs font-bold uppercase tracking-widest">How it works</span>
              <h2 className={`text-4xl md:text-5xl font-mono font-bold mt-4 transition-colors duration-500 ${H}`}>Simple Steps, <span className="italic font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue">Unlimited Potential</span></h2>
              <p className={`${B} mt-4 max-w-lg transition-colors duration-500`}>Apply, share your link, and earn. It's that easy.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group p-8 rounded-3xl bg-white border border-navy-blue/5 hover:border-sky-blue/30 transition-all duration-300 relative overflow-hidden h-full">
                  <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${H}`}>
                    <span className="text-6xl font-black font-mono">{step.number}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-navy-blue/5 flex items-center justify-center mb-6 group-hover:bg-sky-blue/10 transition-colors">
                    <span className={`font-bold text-sm ${H}`}>{step.number}</span>
                  </div>
                  <h3 className={`text-lg font-mono font-bold mb-3 group-hover:text-sky-blue transition-colors line-clamp-1 ${H}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${B}`}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS SECTION ─── */}
      <section id="sec-perks" className="py-24 relative border-y border-navy-blue/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue font-mono text-xs font-bold uppercase tracking-widest">Perks</span>
            <h2 className={`text-4xl md:text-5xl font-mono font-bold mt-4 transition-colors duration-500 ${H}`}>Your Earnings, <span className="italic font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue">Elevated</span></h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <Reveal key={i} delay={i * 150} from="bottom">
                <div className="p-10 rounded-[2.5rem] bg-white border border-navy-blue/5 shadow-xl shadow-navy-blue/[0.02] flex flex-col items-center text-center group hover:-translate-y-2 transition-transform h-full">
                  <div className="w-14 h-14 rounded-full bg-sky-blue/10 flex items-center justify-center mb-8 group-hover:bg-sky-blue group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-mono font-bold mb-4 ${H}`}>{benefit.title}</h3>
                  <p className={`leading-relaxed text-sm ${B}`}>{benefit.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="sec-apply" className="py-32 overflow-hidden relative border-t border-navy-blue/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-blue/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal from="scale">
            <h2 className={`text-4xl md:text-6xl font-mono font-bold mb-8 transition-colors duration-500 ${H}`}>Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-navy-blue">Monetize?</span></h2>
          </Reveal>
          <Reveal delay={100}>
            <p className={`mb-12 text-lg transition-colors duration-500 ${B}`}>Join other creators and brands already saving with Precut Studio. Fill out the quick form and start earning.</p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="https://app.youform.com/forms/v9maqeth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-gradient-to-r from-navy-blue to-sky-blue border-0 rounded-full text-white font-mono font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)]"
            >
              Apply Now
            </a>
          </Reveal>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Affiliate;
