import React, { useEffect, useRef, useState } from 'react';
import { getCalApi } from "@calcom/embed-react";
import logo from '../assets/website PNG.png';
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

const videoFiles = import.meta.glob('../assets/portfolio-videos/*.mp4', { eager: true, import: 'default' }) as Record<string, string>;
const videos = Object.values(videoFiles);
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

const teamColors = ['#0d2060','#0a3d62','#1a1a2e','#16213e','#0f3460','#1b2838','#0d2060','#162447','#1f4068','#1b262c','#0d2060','#172a3a'];
const teamMembers = [
  { initials: 'AH', name: 'Abrar Hossain', role: 'Founder & Creative Director' },
  { initials: 'MK', name: 'Mehedi Khan', role: 'Senior Video Editor' },
  { initials: 'RA', name: 'Rafiq Ahmed', role: 'Motion Designer' },
  { initials: 'SJ', name: 'Sadia Jahan', role: 'Color Grader' },
  { initials: 'FI', name: 'Farhan Islam', role: 'Video Editor' },
  { initials: 'NR', name: 'Nusrat Rahman', role: 'Brand Strategist' },
  { initials: 'TH', name: 'Tanvir Hasan', role: 'Content Specialist' },
  { initials: 'ZA', name: 'Zara Ali', role: 'Project Manager' },
  { initials: 'OK', name: 'Omar Khan', role: 'Social Media Expert' },
  { initials: 'PB', name: 'Priya Bose', role: 'Thumbnail Designer' },
  { initials: 'KM', name: 'Karim Mahmud', role: 'Video Editor' },
  { initials: 'LF', name: 'Lina Farzana', role: 'Content Writer' },
];
const featuredPosts = [
  { tag: 'Tips & Tricks', title: 'How to Make Short-Form Content That Actually Converts', date: 'March 2025', color: '#87CEEB' },
  { tag: 'Case Study', title: 'How We Helped a Brand Go from 0 to 100K Views in 30 Days', date: 'February 2025', color: '#0d2060' },
  { tag: 'Behind the Scenes', title: 'Our Editing Workflow: From Raw Footage to Final Cut', date: 'January 2025', color: '#091549' },
];

/* All section IDs in page order — used to find the current active section */
const ALL_SECTION_IDS = [
  'sec-hero', 'sec-trusted', 'sec-statement',
  'sec-mission', 'sec-videos', 'sec-creative',
  'sec-team', 'sec-cards',
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

  /* ── Cal.com booking calendar state */
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const handlePrevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); };
  const handleNextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); };
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const calDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calDays.push(i);
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const isPastMonth = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  const s1 = useCountUp(500, 2200, statsStarted);
  const s2 = useCountUp(80, 2200, statsStarted);
  const s3 = useCountUp(48, 2200, statsStarted);
  const s4 = useCountUp(99, 2200, statsStarted);
  const missionCount = useCountUp(11239, 3000, missionStarted);

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
  const doubledVideos = videos.length ? [...videos, ...videos] : [];
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
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-mono font-bold leading-[1.05] mb-6 transition-colors duration-1000 ${H}`}>
                  Turning Ideas<br />
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Into Visual</span>
                </h1>
              </Reveal>
              <Reveal delay={220}>
                <p className={`font-sans text-lg leading-relaxed max-w-md mb-8 transition-colors duration-1000 ${B}`}>
                  At Precut Studio, we combine creative direction with sharp editing to produce scroll-stopping videos and graphics that match your brand and drive results across every platform.
                </p>
              </Reveal>
              <Reveal delay={340}>
                <a href="https://cal.com/precutstudio/booking" target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-8 py-3.5 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book A Call
                </a>
              </Reveal>
            </div>
            <Reveal from="right" delay={200}>
              <div className="relative">
                <div className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-navy-blue shadow-2xl hover:shadow-[0_0_50px_rgba(135,206,235,0.2)] transition-shadow duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-blue via-[#0d2060] to-[#091549]" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 opacity-20">
                    <div className="w-20 h-20 rounded-full border-2 border-sky-blue/50" />
                    <span className="text-sky-blue/60 font-mono text-xs tracking-widest uppercase">Image Placeholder</span>
                  </div>
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
      <section id="sec-trusted" className={`py-12 border-y transition-colors duration-1000 ${BR} overflow-hidden`}>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-off-white leading-tight max-w-3xl mx-auto">
              On A Mission to Shape The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#5bb8d4]">Future Of Content</span>
            </h2>
          </Reveal>
          <div ref={missionRef} className="flex items-center justify-center gap-2 md:gap-3 mb-6 flex-wrap">
            {digits.map((d, i) =>
              d === ',' ? (
                <span key={i} className="text-5xl md:text-7xl font-mono font-bold text-sky-blue self-end pb-1">,</span>
              ) : (
                <div key={i} className="w-14 h-20 md:w-20 md:h-28 border border-sky-blue/30 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-sky-blue/60 hover:bg-white/10">
                  <span className="text-4xl md:text-6xl font-mono font-bold text-off-white">{d}</span>
                </div>
              )
            )}
          </div>
          <Reveal><p className="text-center text-off-white/40 font-sans text-sm uppercase tracking-widest mb-16">Total Videos Delivered</p></Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <Reveal delay={0}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Mission</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className="text-off-white/70 font-sans leading-relaxed">To craft content that captures attention, builds trust, and drives growth — without the stress, delays, or inconsistency.</p>
              </Reveal>
              <Reveal delay={150}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Vision</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className="text-off-white/70 font-sans leading-relaxed">To become the go-to creative partner for modern brands by delivering premium, scalable content through a smooth, reliable workflow.</p>
              </Reveal>
            </div>
            <Reveal from="right" delay={100}>
              <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-[#0d2060] hover:border-sky-blue/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d2060] to-navy-blue" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#87CEEB 1px,transparent 1px),linear-gradient(90deg,#87CEEB 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-20"><div className="w-32 h-32 rounded-full border-2 border-sky-blue/40" /></div>
                <span className="absolute bottom-6 left-6 text-sky-blue/30 font-mono text-xs tracking-widest uppercase">Image Placeholder</span>
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
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-off-white">
              From Raw to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#5bb8d4]">Polished.</span>
            </h2>
            <p className="text-off-white/40 font-sans mt-2">See our craft in action.</p>
          </Reveal>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-4 px-6" style={{ animation: 'aboutVideos 35s linear infinite' }}>
            {doubledVideos.map((src, i) => <VideoThumb key={i} src={src} />)}
          </div>
        </div>
      </section>

      {/* ══ 7. CREATIVITY SPLIT ══════════════════════════ */}
      <section id="sec-creative" className="flex flex-col md:flex-row min-h-[70vh]">
        <Reveal from="left" className="relative flex-1 bg-navy-blue flex flex-col justify-end p-10 md:p-16 overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-navy-blue via-navy-blue/80 to-[#0d2060]" />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-64 h-64 rounded-full border border-sky-blue/30 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg viewBox="0 0 200 300" className="h-72 w-auto fill-sky-blue">
              <ellipse cx="100" cy="60" rx="35" ry="40"/>
              <path d="M40 300 Q40 180 100 160 Q160 180 160 300Z"/>
              <rect x="155" y="100" width="30" height="60" rx="5"/>
              <rect x="165" y="90" width="20" height="15" rx="3"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-off-white leading-tight mb-4">
              Creativity.<br />Authenticity.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#5bb8d4]">Innovation.</span>
            </h2>
            <p className="text-off-white/50 font-sans text-base max-w-sm">The three pillars that drive every project we touch.</p>
          </div>
        </Reveal>
        <Reveal from="right" className="flex-1 grid grid-cols-2 gap-0">
          {[{ bg:'#87CEEB', label:'Brand Films' }, { bg:'#0d2060', label:'Short-Form' }, { bg:'#091549', label:'Motion Graphics' }, { bg:'#5bb8d4', label:'Color Grading' }].map((item, i) => (
            <div key={i} className="relative aspect-square flex items-end p-6 overflow-hidden group cursor-default" style={{ backgroundColor: item.bg }}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <span className="relative z-10 font-mono font-bold text-white/80 text-xs uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ══ 8. OUR PEOPLE (triggers LIGHT) ══════════════ */}
      <section id="sec-team" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className={`mb-12 transition-colors duration-1000`}>
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue mb-4">Our People</span>
            <h2 className={`text-4xl md:text-5xl font-mono font-bold transition-colors duration-1000 ${H}`}>
              The Minds Behind{' '}<span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Precut</span>
            </h2>
            <p className={`font-sans mt-2 transition-colors duration-1000 ${M}`}>A passionate team dedicated to your growth.</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {teamMembers.map((member, i) => (
              <Reveal key={i} delay={i * 50} from="bottom">
                <div className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:border-sky-blue/40 hover:shadow-xl hover:-translate-y-2 ${BR}`}>
                  <div className="h-40 flex items-center justify-center text-3xl font-mono font-bold text-white group-hover:scale-105 transition-transform duration-300 origin-center" style={{ backgroundColor: teamColors[i % teamColors.length] }}>
                    {member.initials}
                  </div>
                  <div className={`p-4 transition-colors duration-1000 ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                    <p className={`font-mono font-bold text-sm transition-colors duration-1000 ${H}`}>{member.name}</p>
                    <p className={`font-sans text-xs mt-0.5 transition-colors duration-1000 ${M}`}>{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. FEATURED CARDS ════════════════════════════ */}
      <section id="sec-cards" className={`py-20 border-t transition-colors duration-1000 ${BR}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className="mb-12">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue mb-4">Latest</span>
            <h2 className={`text-4xl md:text-5xl font-mono font-bold transition-colors duration-1000 ${H}`}>
              Insights &{' '}<span className={`text-transparent bg-clip-text bg-gradient-to-r ${G}`}>Work</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => (
              <Reveal key={i} delay={i * 120} from="bottom">
                <div className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:border-sky-blue/40 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${BR}`}>
                  <div className="h-48 flex items-end p-6 relative overflow-hidden" style={{ backgroundColor: post.color }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    <span className="relative z-10 text-xs font-mono font-bold uppercase tracking-widest text-white/70 border border-white/30 rounded-full px-3 py-1">{post.tag}</span>
                  </div>
                  <div className={`p-6 transition-colors duration-1000 ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                    <h3 className={`font-mono font-bold text-base leading-snug mb-3 group-hover:text-sky-blue transition-colors duration-200 ${H}`}>{post.title}</h3>
                    <p className={`font-sans text-xs transition-colors duration-1000 ${M}`}>{post.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. WHAT OUR CLIENTS SAY (dark) ══════════════ */}
      <section id="sec-testimonials" className="py-16 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-off-white">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#5bb8d4]">Clients Say</span>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-off-white leading-tight">
              Turning Everyday Moments<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#5bb8d4]">Into High-Impact Content</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-10">
              <Reveal delay={0}>
                <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-sky-blue mb-3">Our Story</h3>
                <div className="w-10 h-0.5 bg-sky-blue mb-4" />
                <p className="text-off-white/70 font-sans leading-relaxed text-base">Precut Studio started with one simple goal: help creators and brands look premium, consistently. What began as a small idea turning raw clips into scroll-stopping edits has grown into a studio built for speed, quality, and long-term content growth.</p>
                <p className="text-off-white/70 font-sans leading-relaxed text-base mt-4">We've always believed great content isn't just about visuals. It's about impact. The right pacing, the right cuts, the right feeling — the kind that keeps people watching and makes your brand memorable.</p>
              </Reveal>
            </div>
            <Reveal from="right" delay={150}>
              <div className="relative">
                <div className="relative h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-[#0d2060] hover:shadow-[0_0_40px_rgba(135,206,235,0.1)] transition-shadow duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d2060] via-navy-blue to-[#091549]" />
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#87CEEB 1px,transparent 1px),linear-gradient(90deg,#87CEEB 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
                  <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-sky-blue/40 rounded-tr-lg" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-sky-blue/40 rounded-bl-lg" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20"><div className="w-24 h-24 rounded-full border-2 border-sky-blue/50" /></div>
                  <span className="absolute bottom-6 right-6 text-sky-blue/30 font-mono text-xs tracking-widest uppercase">Image Placeholder</span>
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
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
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

      {/* ══ 14. CTA (light) ═══════════════════════════════ */}
      <section id="sec-cta" className="py-20 md:py-28 border-t border-navy-blue/10 bg-off-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <Reveal from="left">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-blue mb-6">Why Us?</span>
              <h2 className="text-5xl md:text-6xl font-mono font-bold text-navy-blue leading-[1.05] mb-6">
                Let's Make<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-[#0d2060]">Magic Together.</span>
              </h2>
              <p className="font-sans text-navy-blue/70 text-base md:text-lg leading-relaxed mb-4 max-w-md">
                No contracts. No delays. Just consistent, high-performance content — delivered when you need it.
              </p>
              <p className="font-sans text-navy-blue/50 text-sm leading-relaxed mb-8 max-w-md">
                Schedule a quick strategy call. Your next level starts here.
              </p>
              <a href="https://cal.com/precutstudio/booking" target="_blank" rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Your Free Strategy Call
              </a>
            </Reveal>

            {/* Right: interactive calendar mockup (same as homepage) */}
            <Reveal from="right" delay={150}>
              <div className="glass-panel p-0 rounded-2xl shadow-2xl relative z-10 w-full max-w-lg mx-auto border-black/5 shadow-black/10">
                <div className="bg-[#111827] rounded-xl overflow-hidden flex flex-col pt-2 md:aspect-[4/3]">
                  {/* Header */}
                  <div className="border-b border-white/10 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/5">
                        <img src={logo} alt="Precut Studio" className="w-[150%] h-[150%] object-cover scale-75" />
                      </div>
                      <div className="text-white text-sm font-medium">Precut Studio</div>
                    </div>
                  </div>
                  {/* Calendar body */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center relative">
                    <div className="text-center w-full max-w-md">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={handlePrevMonth} disabled={isPastMonth}
                          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isPastMonth ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <h4 className="text-white font-medium">{monthNames[currentMonth]} {currentYear}</h4>
                        <button onClick={handleNextMonth}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-x-4 md:gap-x-6 text-white/40 text-[10px] md:text-xs">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        {calDays.map((day, idx) => {
                          if (day === null) return <div key={`e-${idx}`} />;
                          const dateObj = new Date(currentYear, currentMonth, day);
                          const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                          const isPast = day < today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                          if (isPast || isWeekend) return (
                            <div key={idx} className="text-white/20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto cursor-not-allowed">{day}</div>
                          );
                          return (
                            <button key={idx}
                              data-cal-namespace="booking"
                              data-cal-link="precutstudio/booking"
                              data-cal-config={JSON.stringify({ layout: "month_view", date: dateStr })}
                              className={`rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto transition-all cursor-pointer ${isToday ? 'text-black bg-sky-blue font-bold hover:bg-white' : 'text-white hover:bg-sky-blue/20'}`}>
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
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
        @keyframes aboutVideos       { 0%{ transform:translateX(0) }    100%{ transform:translateX(-50%) } }
        @keyframes testimonialScroll { 0%{ transform:translateX(0) }    100%{ transform:translateX(-50%) } }
      `}</style>
    </div>
  );
};

export default About;
