import React, { useEffect, useRef, useState } from 'react';
import { getCalApi } from "@calcom/embed-react";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Daraz from '../assets/brands/Daraz_Logo.png';
import Oraimo from '../assets/brands/Oraimo.png';
import RealtorCA from '../assets/brands/Realtor CA.svg';
import RightAway from '../assets/brands/Right Away Auto Spa.jpg';
import ShahCement from '../assets/brands/Shah Cement.png';
import Shubham from '../assets/brands/Shubham.jpg';
import VIPUS from '../assets/brands/VIP US Immigration.png';
import VermaAccounting from '../assets/brands/Verma Accounting.png';
import t1 from '../assets/testimonials/Testimonial 1.png';
import t2 from '../assets/testimonials/Testimonial 2.png';
import t3 from '../assets/testimonials/Testimonial 3.png';
import t4 from '../assets/testimonials/Testimonial 4.png';
import t5 from '../assets/testimonials/Testimonial 5.png';

const videos = [
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%201.mp4",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%202.mp4",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%203.mp4",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%204.mp4",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%205.mp4",
  "https://pub-b70b101e512244ea960326310542d6ae.r2.dev/Video%209.mp4"
];
const logos = [Daraz, Oraimo, RealtorCA, RightAway, ShahCement, Shubham, VIPUS, VermaAccounting];
const testimonialImages = [t1, t2, t3, t4, t5];

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

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function useCountUp(target: number, duration = 2200, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let st: number | null = null;
    const step = (ts: number) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / duration, 1);
      setCount(Math.floor(easeOut(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

/* ─── REVEAL (reversible) ─ */
interface RevealProps { children: React.ReactNode; delay?: number; from?: 'bottom'|'left'|'right'|'scale'; className?: string; threshold?: number; }
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

/* ─── FAQ ─ */
const faqs = [
  { q: 'What exactly does Precut Studio do?', a: "We're a full-service video editing and creative studio. We take your raw footage and turn it into polished, scroll-stopping content — from short-form social clips to long-form brand films, reels, ads, and more." },
  { q: 'How does the subscription model work?', a: "You subscribe to a monthly plan that gives you unlimited video editing requests. Submit as many projects as you need, and we deliver one (or more) at a time — fast, consistently, and on brand." },
  { q: 'How fast do you deliver?', a: 'Most videos are delivered within 48 business hours. Turnaround depends on complexity, but speed is always a priority.' },
  { q: 'Can I pause or cancel my subscription?', a: 'Yes. You can pause or cancel at any time. No contracts, no lock-ins — just flexible, premium editing whenever you need it.' },
  { q: 'What kinds of videos do you edit?', a: "TikToks, Reels, YouTube, brand films, ads, podcast clips, event highlights, and more. If it's video, we handle it." },
  { q: 'Do you offer revisions?', a: "Absolutely. Every plan includes unlimited revisions. We're not done until you're 100% happy." },
  { q: 'Who is Precut Studio for?', a: 'Creators, personal brands, e-commerce businesses, agencies — anyone who needs premium video without a full in-house team.' },
];

const FAQItem = ({ q, a }: { q: string; a: string; index: number; dark: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border border-navy-blue/10 bg-white transition-all duration-300 ${open ? 'shadow-md' : 'hover:shadow-sm'}`}>
      <button className="w-full flex items-center justify-between text-left py-5 px-6 gap-4 group" onClick={() => setOpen(!open)}>
        <span className="font-sans font-medium text-navy-blue text-sm md:text-base group-hover:text-sky-blue transition-colors leading-snug">{q}</span>
        <svg className={`shrink-0 w-5 h-5 text-navy-blue/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: open ? '300px' : '0' }}>
        <p className="px-6 pb-5 font-sans text-sm md:text-base leading-relaxed text-navy-blue/60">{a}</p>
      </div>
    </div>
  );
};

const VideoThumb = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-52 aspect-[9/16] rounded-2xl bg-white/5 shrink-0 overflow-hidden border border-white/10">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      <video src={src} className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay muted loop playsInline onLoadedData={() => setLoaded(true)} />
    </div>
  );
};


/* All section IDs in page order — used to find the current active section */
const ALL_SECTION_IDS = [
  'sec-hero', 'sec-trusted', 'sec-statement',
  'sec-mission', 'sec-videos', 'sec-creative',
  'sec-testimonials', 'sec-story',
  'sec-stats',
  'sec-faq', 'sec-cta',
];
const DARK_SET = new Set(['sec-mission','sec-videos','sec-creative','sec-testimonials','sec-story']);

/* ═══════ MAIN COMPONENT ═══════ */
const About: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [missionStarted, setMissionStarted] = useState(false);
  const statsRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);


  const s1 = useCountUp(500, 2200, statsStarted);
  const s2 = useCountUp(30, 2200, statsStarted);
  const s3 = useCountUp(48, 2200, statsStarted);
  const s4 = useCountUp(99, 2200, statsStarted);
  const missionCount = useCountUp(1124, 3000, missionStarted);

  /* ── Scroll-based page bg — find the section currently "owning" the 80px line */
  useEffect(() => {
    const onScroll = () => {
      let currentId = '';
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          currentId = id;   // keep updating — last one with top ≤ 80 wins
        }
      }
      setIsDark(DARK_SET.has(currentId));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  /* ── Cal.com API init */
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#091549" }, dark: { "cal-brand": "#87ceeb" } },
        hideEventTypeDetails: true,
        layout: "month_view"
      });
    })();
  }, []);

  /* ── Count-up observers */
  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMissionStarted(true); }, { threshold: 0.3 });
    if (statsRef.current) o1.observe(statsRef.current);
    if (missionRef.current) o2.observe(missionRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const doubled = [...logos, ...logos];
  const doubledVideos = videos.length ? [...videos, ...videos, ...videos, ...videos] : [];
  const doubledTestimonials = [...testimonialImages, ...testimonialImages];
  const mStr = String(missionCount).padStart(6, '0');
  const digits = [mStr[0], mStr[1], mStr[2], ',', mStr[3], mStr[4], mStr[5]];

  /* ── Theme-adaptive helpers */
  const H  = isDark ? 'text-off-white' : 'text-navy-blue';
  const B  = isDark ? 'text-off-white/65' : 'text-navy-blue/65';
  const M  = isDark ? 'text-off-white/40' : 'text-navy-blue/40';
  const BR = isDark ? 'border-white/10' : 'border-navy-blue/10';
  const G  = isDark ? 'from-sky-blue to-[#5bb8d4]' : 'from-sky-blue to-[#091549]';

  return (
    <div className={`min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-1000 ease-in-out ${isDark ? 'bg-navy-blue' : 'bg-off-white'}`}>
      <Navbar isDarkMode={isDark} />

      {/* ══ 1. HERO ══════════════════════════════════════ */}
      <section id="sec-hero" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-sky-blue/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal delay={0}>
                <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue border border-sky-blue/30 rounded-full px-4 py-1.5 mb-6">About Us</span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-mono font-bold leading-[1.05] mb-6 transition-colors duration-500 ${H}`}>
                  Turning Ideas<br />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Into Visual</span>
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <p className={`font-sans text-lg leading-relaxed max-w-md mb-8 transition-colors duration-500 ${B}`}>
                  At Precut Studio, we combine creative direction with sharp editing to produce scroll-stopping videos and graphics that match your brand and drive results across every platform.
                </p>
              </Reveal>
              <Reveal delay={340}>
                <a href="https://cal.com/precutstudio/booking" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)]">
                  Book A Call
                </a>
              </Reveal>
            </div>
            <Reveal from="right" delay={200}>
              <div className="relative">
                <div className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-navy-blue shadow-2xl hover:shadow-[0_0_50px_rgba(135,206,235,0.3)] transition-all duration-700 group">
                  <img src="https://i.ibb.co.com/DDLx0Kcb/Moon.jpg" alt="Moon" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10">
                    <p className="text-white font-mono font-bold text-sm">Premium Creative Studio</p>
                    <p className="text-white/50 font-sans text-xs mt-0.5">Video · Motion · Brand</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10"
                  style={{ backgroundImage: `radial-gradient(${isDark ? '#87CEEB' : '#091549'} 1px, transparent 1px)`, backgroundSize: '12px 12px' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 2. TRUSTED BY ════════════════════════════════ */}
      <section id="sec-trusted" className={`py-12 border-y transition-colors duration-500 ${BR} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <Reveal>
            <h2 className={`text-3xl md:text-4xl font-mono font-bold transition-colors duration-1000 ${H}`}>
              Trusted by{' '}<em className={`not-italic font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r ${G}`}>the Best.</em>
            </h2>
            <p className={`text-sm font-sans mt-1 tracking-wide transition-colors duration-1000 ${M}`}>Clients who trust us</p>
          </Reveal>
        </div>
        <div className="relative w-full overflow-hidden py-4">
          <div className={`absolute left-0 top-0 h-full w-32 bg-gradient-to-r ${isDark ? 'from-navy-blue' : 'from-off-white'} to-transparent z-10 pointer-events-none transition-colors duration-1000`} />
          <div className={`absolute right-0 top-0 h-full w-32 bg-gradient-to-l ${isDark ? 'from-navy-blue' : 'from-off-white'} to-transparent z-10 pointer-events-none transition-colors duration-1000`} />
          <div className="flex w-max items-center gap-20 px-8" style={{ animation: 'aboutLogos 28s linear infinite' }}>
            {doubled.map((src, i) => (
              <div key={i} className="shrink-0 flex items-center justify-center opacity-30 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-500">
                <img src={src} alt={`Brand ${i + 1}`} className="h-10 md:h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. BOLD STATEMENT ════════════════════════════ */}
      <section id="sec-statement" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal from="left">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-mono font-bold leading-[1.05] transition-colors duration-1000 ${H}`}>
                We Don't<br />Just Edit.<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>We Elevate.</span>
              </h2>
            </Reveal>
            <Reveal from="right" delay={150}>
              <div>
                <p className={`font-sans text-lg md:text-xl leading-relaxed mb-6 transition-colors duration-1000 ${B}`}>
                  Every frame we touch is an opportunity to make your brand more memorable, more shareable, and more powerful. We're not just editors — we're creative partners invested in your success.
                </p>
                <p className={`font-sans text-base leading-relaxed transition-colors duration-1000 ${M}`}>
                  From concept to delivery, we handle every stage of the post-production process with precision, passion, and an eye for what makes content truly stand out.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    

      {/* ══ 5. OUR DRIVE + DIGIT COUNTER ════════════════ */}
      <section id="sec-mission" className="py-20 md:py-28 overflow-hidden relative">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-sky-blue/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue/70 mb-4">Our Drive</span>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold leading-tight max-w-3xl mx-auto transition-colors duration-500 ${H}`}>
              On A Mission to Shape The{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-sky-blue to-[#5bb8d4]' : G}`}>Future Of Content</span>
            </h2>
          </Reveal>
          <div ref={missionRef} className="flex items-center justify-center gap-2 md:gap-3 mb-6 flex-wrap">
            {digits.map((d, i) =>
              d === ',' ? (
                <span key={i} className="text-5xl md:text-7xl font-mono font-bold text-sky-blue self-end pb-1">,</span>
              ) : (
                <div key={i} className={`w-14 h-20 md:w-20 md:h-28 border border-sky-blue/30 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-navy-blue/5'} backdrop-blur-sm transition-all duration-300 hover:border-sky-blue/60 hover:bg-white/10`}>
                  <span className={`text-4xl md:text-6xl font-mono font-bold transition-colors duration-500 ${H}`}>{d}</span>
                </div>
              )
            )}
          </div>
          <Reveal><p className={`text-center font-sans text-sm uppercase tracking-widest mb-16 transition-colors duration-500 ${M}`}>Total Videos Delivered</p></Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <Reveal delay={0}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Mission</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className={`font-sans leading-relaxed transition-colors duration-500 ${B}`}>To craft content that captures attention, builds trust, and drives growth — without the stress, delays, or inconsistency.</p>
              </Reveal>
              <Reveal delay={150}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Vision</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className={`font-sans leading-relaxed transition-colors duration-500 ${B}`}>To become the go-to creative partner for modern brands by delivering premium, scalable content through a smooth, reliable workflow.</p>
              </Reveal>
            </div>
            <Reveal from="right" delay={100}>
              <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-[#0d2060] hover:border-sky-blue/30 transition-all duration-500 group">
                <img src="https://i.ibb.co.com/gnTJ4RJ/logo-09.png" alt="Our Mission" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d2060]/40 to-navy-blue/40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 6. FROM RAW TO POLISHED ══════════════════════ */}
      <section id="sec-videos" className="py-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <Reveal>
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue/70 mb-4">Our Work</span>
            <h2 className={`text-4xl md:text-5xl font-mono font-bold transition-colors duration-500 ${H}`}>
              From Raw to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Polished.</span>
            </h2>
            <p className={`font-sans mt-2 transition-colors duration-500 ${M}`}>See our craft in action.</p>
          </Reveal>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-4 px-6" style={{ animation: 'aboutVideos 35s linear infinite' }}>
            {doubledVideos.map((src, i) => <VideoThumb key={i} src={src} />)}
          </div>
        </div>
      </section>

      


      {/* ══ 10. WHAT OUR CLIENTS SAY (dark) ══════════════ */}
      <section id="sec-testimonials" className="py-16 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <Reveal>
            <h2 className={`text-3xl md:text-4xl font-mono font-bold transition-colors duration-500 ${H}`}>
              What Our <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Clients Say</span>
            </h2>
          </Reveal>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max space-x-6 px-6" style={{ animation: 'testimonialScroll 40s linear infinite' }}>
            {doubledTestimonials.map((src, i) => (
              <div key={i} className="w-80 md:w-96 shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-sky-blue/30 transition-colors duration-300">
                <img src={src} alt={`Testimonial ${i + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. OUR STORY (dark — same bg as Testimonials) */}
      <section id="sec-story" className="py-20 md:py-28 overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-blue/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className="mb-14 max-w-3xl">
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold leading-tight transition-colors duration-500 ${H}`}>
              Turning Everyday Moments<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Into High-Impact Content</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-10">
              <Reveal delay={0}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Story</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className={`font-sans leading-relaxed text-base transition-colors duration-500 ${B}`}>Precut Studio started with one simple goal: help creators and brands look premium, consistently. What began as a small idea turning raw clips into scroll-stopping edits has grown into a studio built for speed, quality, and long-term content growth.</p>
                <p className={`font-sans leading-relaxed text-base mt-4 transition-colors duration-500 ${B}`}>We've always believed great content isn't just about visuals. It's about impact. The right pacing, the right cuts, the right feeling — the kind that keeps people watching and makes your brand memorable.</p>
              </Reveal>
            </div>
            <Reveal from="right" delay={150}>
              <div className="relative">
                <div className="relative h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-[#0d2060] hover:shadow-[0_0_40px_rgba(135,206,235,0.2)] transition-all duration-700 group">
                  <img src="https://i.ibb.co.com/DPSdwDck/affiliate-page.png" alt="Our Story" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d2060]/40 via-transparent to-[#091549]/40" />
                  <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-sky-blue/40 rounded-tr-lg" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-sky-blue/40 rounded-bl-lg" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4">
                  <p className="text-off-white font-mono font-bold text-sm">Est. 2023</p>
                  <p className="text-off-white/50 font-sans text-xs">Built for Creators &amp; Brands</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 12. BY THE NUMBERS (light/off-white) ═════════ */}
      <section id="sec-stats" ref={statsRef as React.RefObject<HTMLElement>} className="py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-14">
          <Reveal>
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue mb-4">By the Numbers</span>
            <h2 className={`text-4xl md:text-5xl font-mono font-bold transition-colors duration-1000 ${H}`}>
              Results That <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Speak</span>
            </h2>
          </Reveal>
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x transition-colors duration-1000 ${isDark ? 'md:divide-white/10' : 'md:divide-navy-blue/10'}`}>
            {[{ val: s1, suffix: '+', label: 'Projects Delivered' }, { val: s2, suffix: '+', label: 'Happy Clients' }, { val: s3, suffix: 'hr', label: 'Avg. Turnaround' }, { val: s4, suffix: '%', label: 'Satisfaction Rate' }].map((stat, i) => (
              <Reveal key={i} delay={i * 100} from="scale" className="flex flex-col items-center text-center px-6">
                <span className="text-5xl md:text-7xl font-mono font-bold text-sky-blue leading-none">{stat.val.toLocaleString()}{stat.suffix}</span>
                <span className={`mt-3 font-sans text-xs uppercase tracking-widest transition-colors duration-1000 ${M}`}>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13. FAQ (always light, two-col) ══════════════════ */}
      <section id="sec-faq" className="py-20 md:py-28 border-t border-navy-blue/10 bg-off-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: heading + CTA */}
            <Reveal from="left" className="md:sticky md:top-28">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-blue inline-block" />
                <span className="text-xs font-sans font-semibold uppercase tracking-widest text-navy-blue/60">FAQ</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-navy-blue leading-[1.1] mb-12">
                Answers to the<br />frequently asked<br />
                <em className="font-serif italic font-normal">questions.</em>
              </h2>
              <div className="border-t border-navy-blue/10 pt-8">
                <p className="font-sans font-bold text-navy-blue text-sm mb-1">Still have questions?</p>
                <p className="font-sans text-navy-blue/55 text-sm mb-5">Didn't find what you were looking for? Our team is just a message away.</p>
                <a href="https://cal.com/precutstudio/booking" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.8)]">
                  Book a Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </Reveal>

            {/* Right: accordion cards */}
            <Reveal from="right" delay={100}>
              <div className="flex flex-col gap-3">
                {faqs.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} dark={false} />)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    

      <Footer />

      <style>{`
        @keyframes aboutLogos        { 0%{ transform:translateX(0) }    100%{ transform:translateX(-50%) } }
        @keyframes tickerL           { 0%{ transform:translateX(0) }    100%{ transform:translateX(-50%) } }
        @keyframes tickerR           { 0%{ transform:translateX(-50%) } 100%{ transform:translateX(0)   } }
        @keyframes aboutVideos       { 0%{ transform:translateX(0) }    100%{ transform:translateX(-25%) } }
        @keyframes testimonialScroll { 0%{ transform:translateX(0) }    100%{ transform:translateX(-50%) } }
      `}</style>
    </div>
  );
};

export default About;
