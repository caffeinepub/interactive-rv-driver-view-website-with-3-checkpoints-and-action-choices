import { useState, useEffect, useRef } from 'react';
import { MousePointer2 } from 'lucide-react';
import { TravelScene } from './TravelScene';

interface TravelVideoSceneProps {
  videoSrc: string;
  backgroundImage: string;
  title: string;
  description: string;
  isClickable?: boolean;
  onClick?: () => void;
  hintText?: string;
  isDarkened?: boolean;
}

export function TravelVideoScene({ 
  videoSrc,
  backgroundImage, 
  title, 
  description,
  isClickable = false,
  onClick,
  hintText,
  isDarkened = false
}: TravelVideoSceneProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = () => {
      console.warn('Video failed to load, falling back to image');
      setVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Attempt to play with proper error handling
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Video autoplay prevented, will use fallback image');
        setVideoError(true);
      }
    };

    playVideo();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  // Fallback to image-based scene if video fails
  if (videoError || !videoSrc) {
    return (
      <TravelScene
        backgroundImage={backgroundImage}
        title={title}
        description={description}
        isClickable={isClickable}
        onClick={onClick}
        hintText={hintText}
      />
    );
  }

  return (
    <div 
      className={`absolute inset-0 w-full h-full ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
      />

      {/* Fallback image while video loads */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Night darkening overlay */}
      {isDarkened && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      )}
      
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      
      {/* Scene Info - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10 animate-fade-in pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-warm-lg max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2 text-shadow-strong">
            {title}
          </h2>
          <p className="text-lg text-white/90 text-shadow">
            {description}
          </p>
        </div>
      </div>

      {/* Click hint indicator */}
      {isClickable && (
        <div className="absolute bottom-8 right-8 z-10 animate-fade-in pointer-events-none">
          <div className="bg-primary/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 shadow-warm-lg border border-primary-foreground/20 animate-pulse">
            <MousePointer2 className="w-5 h-5 text-primary-foreground" />
            <span className="text-base font-semibold text-primary-foreground">
              {hintText || 'Click anywhere to continue'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
