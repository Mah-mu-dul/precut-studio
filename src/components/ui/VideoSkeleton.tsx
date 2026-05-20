import React from 'react';

/**
 * YouTube-style skeleton loader for video placeholders.
 * Shows animated shimmer bars mimicking a video thumbnail
 * with a play-button silhouette in the center.
 */
interface VideoSkeletonProps {
  className?: string;
  /** Aspect ratio class, e.g. 'aspect-[9/16]' or 'aspect-video' */
  aspectClass?: string;
  /** Show the play-button ghost in the centre */
  showPlayIcon?: boolean;
}

const VideoSkeleton: React.FC<VideoSkeletonProps> = ({
  className = '',
  aspectClass = 'aspect-[9/16]',
  showPlayIcon = true,
}) => {
  return (
    <div className={`relative ${aspectClass} overflow-hidden rounded-2xl ${className}`}>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-navy-blue/90" />

      {/* Animated shimmer sweep */}
      <div className="absolute inset-0 skeleton-shimmer" />

      {/* Fake content bars — mimics YouTube thumbnail skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2.5">
        {/* Title bar */}
        <div className="h-3 w-3/4 rounded-full bg-white/[0.07]" />
        {/* Subtitle bar */}
        <div className="h-2.5 w-1/2 rounded-full bg-white/[0.05]" />
      </div>

      {/* Centred play-button ghost */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center backdrop-blur-sm border border-white/[0.04]">
            <svg
              className="w-6 h-6 text-white/20 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSkeleton;
