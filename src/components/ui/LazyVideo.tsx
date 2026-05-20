import React, { useRef, useState, useEffect, useCallback } from 'react';
import VideoSkeleton from './VideoSkeleton';

/**
 * LazyVideo — renders a YouTube-style skeleton until the video element
 * enters the viewport (via IntersectionObserver), then sets the `src`
 * and starts loading in the background. Once enough data is buffered
 * (`canplay` event) the skeleton fades out and the video fades in.
 *
 * Supports both plain MP4 and HLS (.m3u8) streams. For HLS it uses
 * hls.js on browsers that don't support native HLS (Chrome, Firefox, Edge)
 * and falls back to native playback on Safari.
 *
 * HLS.js is dynamically imported to keep it out of the initial bundle
 * (~522KB vendor chunk is loaded only when actually needed).
 *
 * Loading states:
 * 1. Initial load: skeleton + spinner visible
 * 2. Rebuffering (HLS chunk not loaded): spinner only (video stays visible but paused)
 * 3. Playing normally: no overlay
 */
interface LazyVideoProps {
  src: string;
  className?: string;
  /** Tailwind aspect class for the wrapper & skeleton */
  aspectClass?: string;
  /** Extra props forwarded to the <video> element */
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  title?: string;
  'aria-label'?: string;
  /** Callback when the video has loaded enough to play */
  onLoaded?: () => void;
  /** Intersection observer rootMargin — controls how early we start loading.
   *  Positive values = load before the element is visible.  */
  rootMargin?: string;
  /** Optional ref forwarded to the <video> element */
  videoRef?: React.RefObject<HTMLVideoElement>;
  /** If true the video element mounts immediately but HLS init is
   *  deferred to after first paint so it doesn't block scroll animations. */
  eager?: boolean;
}

const isHLS = (url: string) => url.endsWith('.m3u8');

// Cache the dynamic import so we only resolve it once across all LazyVideo instances
let hlsModulePromise: Promise<typeof import('hls.js')> | null = null;
function getHlsModule() {
  if (!hlsModulePromise) {
    hlsModulePromise = import('hls.js');
  }
  return hlsModulePromise;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className = '',
  aspectClass = 'aspect-[9/16]',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  title,
  'aria-label': ariaLabel,
  onLoaded,
  rootMargin = '400px 0px',
  videoRef: externalRef,
  eager = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoElement = externalRef || internalVideoRef;
  const hlsRef = useRef<InstanceType<typeof import('hls.js').default> | null>(null);
  const readyFired = useRef(false); // guard against double canplay/loadeddata

  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isReady, setIsReady] = useState(false);       // initial load complete
  const [isBuffering, setIsBuffering] = useState(false); // rebuffering (HLS chunk not loaded)

  // ─── Intersection Observer — triggers loading when near viewport ────
  useEffect(() => {
    if (eager || shouldLoad) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, shouldLoad, rootMargin]);

  // ─── HLS setup — dynamically imports hls.js, deferred to not block first paint ──
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoElement.current;
    if (!video) return;
    if (!isHLS(src)) return; // MP4 is handled natively via <source>

    // Defer HLS initialization so it doesn't compete with the
    // initial render and scroll animations (especially in Hero).
    const timerId = setTimeout(() => {
      const v = videoElement.current;
      if (!v) return;

      // Safari supports HLS natively
      if (v.canPlayType('application/vnd.apple.mpegurl')) {
        v.src = src;
        if (autoPlay) {
          v.muted = true;
          v.play().catch(() => {});
        }
        return;
      }

      // Dynamically import hls.js for Chrome / Firefox / Edge
      getHlsModule().then(({ default: Hls }) => {
        // Guard: component may have unmounted while awaiting import
        const currentVideo = videoElement.current;
        if (!currentVideo) return;

        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: false,   // workers are expensive to spawn per-video
            lowLatencyMode: false,
            maxBufferLength: 8,
            maxMaxBufferLength: 20,
            startLevel: -1,        // auto quality selection
          });
          hlsRef.current = hls;

          hls.loadSource(src);
          hls.attachMedia(currentVideo);

          // Playback is triggered in handleCanPlay below once the
          // browser has actually buffered enough data.
        }
      });
    }, eager ? 150 : 0); // eager: small delay to let first paint settle

    return () => {
      clearTimeout(timerId);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [shouldLoad, src, autoPlay, eager, videoElement]);

  // ─── Called when the browser has buffered enough data to play ───────
  const handleCanPlay = useCallback(() => {
    // Guard: only fire once (both onCanPlay and onLoadedData can trigger)
    if (readyFired.current) return;
    readyFired.current = true;

    setIsReady(true);
    setIsBuffering(false);
    onLoaded?.();

    // For HLS sources the autoPlay HTML attribute doesn't work because
    // hls.js sets the source after mount. Explicitly kick playback.
    const video = videoElement.current;
    if (video && autoPlay) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [onLoaded, autoPlay, videoElement]);

  // ─── Rebuffering: show spinner when waiting for next HLS chunk ─────
  const handleWaiting = useCallback(() => {
    setIsBuffering(true);
  }, []);

  const handlePlaying = useCallback(() => {
    setIsBuffering(false);
  }, []);

  // Show spinner if: initial loading OR rebuffering during playback
  const showSpinner = (shouldLoad && !isReady) || isBuffering;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Skeleton — visible only during initial load (not rebuffering) */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <VideoSkeleton aspectClass={aspectClass} className="w-full h-full" />
      </div>

      {/* Loading spinner — shows during initial load AND rebuffering */}
      {showSpinner && (
        <div className="video-loading-spinner" />
      )}

      {/* Actual video — only mount once shouldLoad is true */}
      {shouldLoad && (
        <video
          ref={videoElement as React.RefObject<HTMLVideoElement>}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          title={title}
          aria-label={ariaLabel}
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Only use <source> for non-HLS — HLS src is set by hls.js or natively */}
          {!isHLS(src) && <source src={src} type="video/mp4" />}
        </video>
      )}
    </div>
  );
};

export default LazyVideo;

