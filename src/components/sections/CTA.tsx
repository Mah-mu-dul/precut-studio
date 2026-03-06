import React, { useEffect, useState } from 'react';
import { getCalApi } from "@calcom/embed-react";

const CTA: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "booking" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#091549" },
          dark: { "cal-brand": "#87ceeb" }
        },
        hideEventTypeDetails: true,
        layout: "month_view"
      });
    })();
  }, []);

  const today = new Date();

  // State for the currently displayed month and year
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Prevent users from going to historical months (before current month/year)
  const isPastMonth = currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  return (
    <section id="call" className="py-12 md:py-20 relative z-20 overflow-hidden">

      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left Text */}
          <div>
            <div id='why-us' className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 uppercase tracking-widest text-lg font-bold mb-6">Why Us?</div>
            <h2 className="text-3xl md:text-6xl font-mono font-bold mb-8 leading-tight text-white">
              Let’s Make Magic <br />Together.
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-6">
              No contracts. No delays. Just consistent, high-performance content — delivered when you need it.
            </p>
            <p className="text-white/60 text-base mb-10">
              Schedule a quick strategy call. Your next level starts here.
            </p>

            {/* Direct link to external calendar page as requested */}
            <a
              href="https://cal.com/precutstudio/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-navy-blue to-sky-blue border-0 px-8 py-4 rounded-full text-white font-medium shadow-[0_0_10px_rgba(0,51,204,0.3)] hover:shadow-[0_0_25px_rgba(0,51,204,0.8)] transition-all duration-300 transform hover:scale-105"
            >
              Book Your Free Strategy Call
            </a>
          </div>

          {/* Custom Interactive Mockup Triggering Cal.com Modal */}
          <div className="glass-panel p-0 rounded-2xl shadow-2xl relative z-10 w-full max-w-lg mx-auto">
            <div className="bg-[#111827] rounded-xl overflow-hidden flex flex-col pt-2 md:aspect-[4/3]">
              {/* Mock Calendar Header */}
              <div className="border-b border-white/10 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-sky-blue/20 flex items-center justify-center text-sky-400 font-bold">P</div>
                  <div>
                    <div className="text-white text-sm font-medium">Precut Studio</div>
                  </div>
                </div>
              </div>

              {/* Mock Calendar Body */}
              <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center relative">
                <div className="text-center w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevMonth}
                      disabled={isPastMonth}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isPastMonth ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h4 className="text-white font-medium">{monthNames[currentMonth]} {currentYear}</h4>
                    <button
                      onClick={handleNextMonth}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-x-4 md:gap-x-6  text-white/40 text-[10px] md:text-xs">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>

                    {days.map((day, idx) => {
                      if (day === null) {
                        return <div key={`empty-${idx}`}></div>;
                      }

                      const dateObj = new Date(currentYear, currentMonth, day);
                      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                      // Only highlight if it's the exact day AND the exact month AND the exact year
                      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                      // Disable past dates, or today if it's already passed (we just use day < today.getDate() for simplicity of current month)
                      const isPast = day < today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

                      // We disable the button if it's in the past OR if it's a weekend
                      if (isPast || isWeekend) {
                        return (
                          <div key={idx} className="text-white/20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto cursor-not-allowed">
                            {day}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={idx}
                          data-cal-namespace="booking"
                          data-cal-link="precutstudio/booking"
                          data-cal-config={JSON.stringify({ layout: "month_view", date: dateStr })}
                          className={`rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto transition-all cursor-pointer ${isToday ? 'text-black bg-sky-blue font-bold shadow-[0_0_10px_rgba(135,206,235,0.5)] hover:bg-white' : 'text-white hover:bg-sky-blue/20'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
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
    </section>
  );
};

export default CTA;
