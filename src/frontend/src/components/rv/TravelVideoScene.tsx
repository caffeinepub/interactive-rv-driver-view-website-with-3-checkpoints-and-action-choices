import { useEffect, useRef, useState } from 'react';

interface TravelVideoSceneProps {
  onTravelTimeReached: () => void;
  travelDuration?: number;
  fallbackImage?: string;
}

export function TravelVideoScene({ 
  onTravelTimeReached,
  travelDuration = 60000, // 60 seconds default
  fallbackImage = '/assets/generated/rv-scene-1.dim_1920x1080.png'
}: TravelVideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoStalled, setVideoStalled] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    setHasTriggered(false);
    setVideoError(false);
    setVideoStalled(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setVideoError(true);
    };

    const handleStalled = () => {
      setVideoStalled(true);
    };

    const handleCanPlay = () => {
      setVideoError(false);
      setVideoStalled(false);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const checkTravelTime = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= travelDuration && !hasTriggered) {
        setHasTriggered(true);
        onTravelTimeReached();
      }
    };

    const interval = setInterval(checkTravelTime, 1000);

    return () => clearInterval(interval);
  }, [onTravelTimeReached, travelDuration, hasTriggered]);

  const showFallback = videoError || videoStalled;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {showFallback ? (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/rv-travel-front-view.mp4" type="video/mp4" />
        </video>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-2 animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-shadow-lg">
          On the Road
        </h2>
        <p className="text-lg text-white/90 text-shadow">
          Enjoying the scenic drive...
        </p>
      </div>
    </div>
  );
}
