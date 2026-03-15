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

const TrustedBy: React.FC = () => {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-10 relative z-20 overflow-hidden">

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-navy-blue">
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
        {/* Edge fades */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-brands items-center gap-20 px-8">
          {doubled.map((src, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center group transition-all duration-300"
            >
              <img
                src={src}
                alt={`Brand Logo ${(i % logos.length) + 1}`}
                className="h-10 md:h-12 w-auto object-contain opacity-30 grayscale transition-all duration-400"
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marqueeBrands {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-brands {
            animation: marqueeBrands 30s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TrustedBy;
