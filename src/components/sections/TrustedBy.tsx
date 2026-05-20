import React from 'react';
import Daraz from '../../assets/brands/Daraz_Logo.png';
import Oraimo from '../../assets/brands/Oraimo.png';
import RealtorCA from '../../assets/brands/Realtor CA.svg';
import RightAway from '../../assets/brands/Right Away Auto Spa.jpg';
import ShahCement from '../../assets/brands/Shah Cement.png';
import Shubham from '../../assets/brands/Shubham.jpg';
import VIPUS from '../../assets/brands/VIP US Immigration.png';
import VermaAccounting from '../../assets/brands/Verma Accounting.png';

const logos = [
  Daraz,
  Oraimo,
  RealtorCA,
  RightAway,
  ShahCement,
  Shubham,
  VIPUS,
  VermaAccounting
];

const TrustedBy: React.FC = React.memo(() => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-5 relative z-20 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 150px' }}>

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4">
        <h2 className="text-2xl md:text-4xl font-mono font-bold text-navy-blue">
          Trusted by{' '}
          <em className="not-italic font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#091549]">
            the Best.
          </em>
        </h2>
        <p className="text-navy-blue/40 text-sm font-sans mt-1 tracking-wide">
          Global Clients who trust us
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="flex w-max animate-marquee-brands items-center gap-20 px-8" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
          {doubled.map((src, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center group transition-all duration-300"
            >
              <img
                src={src}
                alt={`Brand Logo ${(i % logos.length) + 1}`}
                loading="lazy"
                decoding="async"
                className="h-10 md:h-12 w-auto object-contain opacity-30 grayscale transition-all duration-400"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default TrustedBy;
