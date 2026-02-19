import { useEffect, useRef, useState } from 'react';
import { AnimatedTravelFallback } from './AnimatedTravelFallback';

interface TravelVideoSceneProps {
  onTravelTimeReached?: () => void;
  onUserAdvance?: () => void;
  enableTimer?: boolean;
  travelDuration?: number;
  segmentKey: string;
}

const PLAYBACK_START_TIMEOUT = 2000; // 2 seconds to start playing
const MAX_STALL_COUNT = 3;

export function TravelVideoScene({ 
  onTravelTimeReached,
  onUserAdvance,
  enableTimer = false,
  travelDuration = 60000,
  segmentKey
}: TravelVideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [stallCount, setStallCount] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stallTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset all state when segment changes
  useEffect(() => {
    startTimeRef.current = Date.now();
    setHasTriggered(false);
    setIsVideoPlaying(false);
    setUseFallback(false);
    setStallCount(0);
    
    // Clear any existing timeouts
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
    if (stallTimeoutRef.current) {
      clearTimeout(stallTimeoutRef.current);
      stallTimeoutRef.current = null;
    }
  }, [segmentKey]);

  // Video playback health monitoring
  useEffect(() => {
    const video = videoRef.current;
    if (!video || useFallback) return;

    // Set timeout for initial playback start
    playbackTimeoutRef.current = setTimeout(() => {
      if (!isVideoPlaying) {
        console.warn('Video failed to start playing within timeout, using fallback');
        setUseFallback(true);
      }
    }, PLAYBACK_START_TIMEOUT);

    const handlePlaying = () => {
      setIsVideoPlaying(true);
      setStallCount(0);
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
      if (stallTimeoutRef.current) {
        clearTimeout(stallTimeoutRef.current);
        stallTimeoutRef.current = null;
      }
    };

    const handleWaiting = () => {
      setIsVideoPlaying(false);
      // Set a timeout to detect prolonged waiting
      if (stallTimeoutRef.current) {
        clearTimeout(stallTimeoutRef.current);
      }
      stallTimeoutRef.current = setTimeout(() => {
        setStallCount(prev => {
          const newCount = prev + 1;
          if (newCount >= MAX_STALL_COUNT) {
            console.warn('Video stalled too many times, using fallback');
            setUseFallback(true);
          }
          return newCount;
        });
      }, 2000);
    };

    const handleStalled = () => {
      setIsVideoPlaying(false);
      setStallCount(prev => {
        const newCount = prev + 1;
        if (newCount >= MAX_STALL_COUNT) {
          console.warn('Video stalled, using fallback');
          setUseFallback(true);
        }
        return newCount;
      });
    };

    const handleError = () => {
      console.error('Video error, using fallback');
      setIsVideoPlaying(false);
      setUseFallback(true);
    };

    const handlePause = () => {
      // If video pauses unexpectedly (not user-initiated), it might be autoplay blocked
      if (!video.ended) {
        setIsVideoPlaying(false);
      }
    };

    const handleCanPlay = () => {
      // Attempt to play when ready
      video.play().catch((error) => {
        console.warn('Autoplay blocked or play failed:', error);
        setUseFallback(true);
      });
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('error', handleError);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('error', handleError);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplay', handleCanPlay);
      
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
      }
      if (stallTimeoutRef.current) {
        clearTimeout(stallTimeoutRef.current);
      }
    };
  }, [useFallback, isVideoPlaying, segmentKey]);

  // Travel duration timer (only when enabled)
  useEffect(() => {
    if (!enableTimer || !onTravelTimeReached) return;

    const checkTravelTime = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= travelDuration && !hasTriggered) {
        setHasTriggered(true);
        onTravelTimeReached();
      }
    };

    const interval = setInterval(checkTravelTime, 1000);

    return () => clearInterval(interval);
  }, [onTravelTimeReached, travelDuration, hasTriggered, enableTimer]);

  const handleClick = () => {
    if (onUserAdvance) {
      onUserAdvance();
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black cursor-pointer"
      onClick={handleClick}
    >
      {/* Always render animated fallback as base layer */}
      <AnimatedTravelFallback className="absolute inset-0" />
      
      {/* Video layer on top, only visible when confirmed playing */}
      {!useFallback && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isVideoPlaying ? 1 : 0 }}
        >
          <source src="/assets/rv-travel-front-view.mp4" type="video/mp4" />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-2 animate-fade-in pointer-events-none">
        <h2 className="text-3xl font-bold text-white text-shadow-lg">
          On the Road
        </h2>
        {!onUserAdvance && (
          <p className="text-lg text-white/90 text-shadow">
            Enjoying the scenic drive...
          </p>
        )}
      </div>
    </div>
  );
}
