import { useEffect, useRef, useState } from 'react';

const PATH_D =
  'M52.6029 12.2493C763.103 156.749 335.603 749.249 193.103 590.749C50.6023 432.249 561.603 114.749 702.103 698.249C842.603 1281.75 882.604 531.749 1126.6 727.749C1236 815.626 1404.5 937.275 1526.6 1011.94V878.188C1265.57 613.988 1592.51 1153.82 1349.6 1496.75C1293.27 1576.28 1257.59 1627.41 1141.1 1725.75C980.603 1861.25 1087.6 2297.75 1221.6 2216.75C1355.6 2135.75 1145.6 1958.75 866.103 1863.75C557.497 1758.86 402.219 1805.36 32.6027 1820.25C32.6027 1820.25 130.103 1727.25 130.103 1958.75C130.103 2190.25 659.957 1944.26 763.603 2352.75C865.603 2754.75 1519.59 2402.75 1519.59 2758.25C1519.59 2987.52 764.088 3051.61 587.588 3349.25C419.882 3632.06 20.5882 3464.25 20.5882 3464.25L85.6029 4066.75C85.6029 4066.75 262.142 3869.28 315.103 3812.75C463.603 3654.25 534.731 3754.43 612.103 3892.25C879.603 4368.75 1361.6 4104.25 1361.6 3783.75C1361.6 3080.71 432.603 4165.75 676.603 4418.75C877.974 4627.55 1035.1 4706.75 479.603 4941.75C408.749 4971.72 410.603 5063.25 410.603 5063.25';

const ScrollStripe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  const [metrics, setMetrics] = useState({
    visualHeight: 0,
    heroStart: 0,
    heroAmount: 0,
    hiwStart: 0,
    hiwAmount: 0,
    pricingStart: 0,
    pricingAmount: 0,
    startYOffset: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const wrapper = containerRef.current?.parentElement;
      if (!wrapper) return;

      const vh = window.innerHeight;
      const isMob = window.innerWidth < 768;
      setIsMobile(isMob);

      // Position the SVG's top edge to be exactly below the locked Hero text (around 30vh)
      const startYOffset = vh * 0.3;

      // Hero acts as a pinned section for the first 300vh
      const heroStart = 0;
      const heroAmount = vh * 3;

      let hiwStart = 0, hiwAmount = 0;
      const hiw = document.getElementById('how-it-works');
      if (hiw) {
        const topOffset = isMob ? 80 : 35;
        hiwStart = hiw.offsetTop - topOffset;
        hiwAmount = Math.max(0, hiw.offsetHeight - vh + topOffset);
      }

      let pricingStart = 0, pricingAmount = 0;
      const pricing = document.getElementById('pricing-section');
      if (pricing && !isMob) {
        pricingStart = pricing.offsetTop;
        pricingAmount = Math.max(0, pricing.offsetHeight - vh);
      }

      const totalPinAmount = heroAmount + hiwAmount + pricingAmount;
      const visualHeight = wrapper.offsetHeight - totalPinAmount - startYOffset;

      setMetrics({
        visualHeight,
        heroStart,
        heroAmount,
        hiwStart,
        hiwAmount,
        pricingStart,
        pricingAmount,
        startYOffset,
      });
    };

    const timeoutId = setTimeout(updateMetrics, 200);
    window.addEventListener('resize', updateMetrics);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const glow = glowRef.current; // may be null on mobile (glow path hidden)
    if (!container || !path || metrics.visualHeight === 0) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    if (glow) glow.style.strokeDasharray = `${totalLength}`;

    let currentDraw = totalLength;
    let rafId: number | null = null;
    let isAnimating = false;

    const doFrame = () => {
      isAnimating = true;
      const sy = window.scrollY;
      const totalDocScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      let targetY = 0;

      // Pure math pinning for all sections (ensures perfect lock with video and page content)
      if (sy > metrics.heroStart) {
        targetY += Math.min(sy - metrics.heroStart, metrics.heroAmount);
      }
      if (sy > metrics.hiwStart) {
        targetY += Math.min(sy - metrics.hiwStart, metrics.hiwAmount);
      }
      if (sy > metrics.pricingStart) {
        targetY += Math.min(sy - metrics.pricingStart, metrics.pricingAmount);
      }

      // Drawing progress (waits until Hero title reaches the top)
      const drawStartSy = window.innerHeight * 1.8;
      let drawProgress = 0;
      if (sy > drawStartSy) {
        const scrollRange = Math.max(1, totalDocScroll - drawStartSy);
        drawProgress = (sy - drawStartSy) / scrollRange;
      }
      drawProgress = Math.max(0, Math.min(1, drawProgress));

      const targetDraw = totalLength * (1 - drawProgress);

      // Lerp ONLY the drawing progress for smoothness. 
      // Do NOT lerp the position (targetY) to guarantee pixel-perfect stability without shaking.
      const drawDiff = targetDraw - currentDraw;
      
      // If the lerp hasn't converged yet, keep animating
      if (Math.abs(drawDiff) > 0.5) {
        currentDraw += drawDiff * 0.15;
        // Schedule another frame for smooth lerp convergence
        rafId = requestAnimationFrame(doFrame);
      } else {
        currentDraw = targetDraw;
        isAnimating = false;
      }

      // Apply updates
      container.style.transform = `translateY(${targetY}px)`;
      path.style.strokeDashoffset = `${currentDraw}`;
      if (glow) glow.style.strokeDashoffset = `${currentDraw + totalLength * 0.003}`;
    };

    const onScroll = () => {
      if (!isAnimating) {
        rafId = requestAnimationFrame(doFrame);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial frame
    rafId = requestAnimationFrame(doFrame);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [metrics]);

  return (
    <div
      ref={containerRef}
      className="absolute left-0 w-full pointer-events-none z-0 overflow-visible"
      style={{ 
        top: metrics.startYOffset > 0 ? `${metrics.startYOffset}px` : '30vh',
        height: metrics.visualHeight > 0 ? `${metrics.visualHeight}px` : 'calc(100% - 30vh)',
        contain: 'layout',
      }}
    >
      <svg
        viewBox="0 0 1540 5064"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
        className="w-[130%] h-full -ml-[15%] overflow-visible"
      >
        <defs>
          <linearGradient
            id="stripe-main-grad"
            x1="32.3609" y1="2361.8" x2="1705.24" y2="2361.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0913462" stopColor="#091549" />
            <stop offset="0.875" stopColor="#87CEEB" />
          </linearGradient>

          <linearGradient
            id="stripe-glow-grad"
            x1="32.3609" y1="2361.8" x2="1705.24" y2="2361.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0913462" stopColor="#091549" />
            <stop offset="0.875" stopColor="#87CEEB" />
          </linearGradient>

          <filter id="stripe-glow-blur" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>

        {/* Glow layer — hidden on mobile where SVG filters are software-rasterized */}
        {!isMobile && (
        <path
          ref={glowRef}
          d={PATH_D}
          stroke="url(#stripe-glow-grad)"
          strokeOpacity="0.15"
          strokeWidth="35"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#stripe-glow-blur)"
          vectorEffect="non-scaling-stroke"
        />
        )}

        {/* Main path */}
        <path
          ref={pathRef}
          d={PATH_D}
          stroke="url(#stripe-main-grad)"
          strokeOpacity="0.75"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default ScrollStripe;
