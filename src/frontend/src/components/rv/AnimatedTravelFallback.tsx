import { useEffect, useState } from 'react';

interface AnimatedTravelFallbackProps {
  className?: string;
}

const SCENE_IMAGES = [
  '/assets/generated/rv-scene-1.dim_1920x1080.png',
  '/assets/generated/rv-scene-2.dim_1920x1080.png',
  '/assets/generated/rv-scene-3.dim_1920x1080.png',
  '/assets/generated/rv-scene-4.dim_1920x1080.png',
];

const CROSSFADE_DURATION = 20000; // 20 seconds per image

export function AnimatedTravelFallback({ className = '' }: AnimatedTravelFallbackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SCENE_IMAGES.length);
        setNextIndex((prev) => (prev + 1) % SCENE_IMAGES.length);
        setIsTransitioning(false);
      }, 1000); // Transition duration
    }, CROSSFADE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Current image with Ken Burns effect */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-ken-burns"
        style={{
          backgroundImage: `url(${SCENE_IMAGES[currentIndex]})`,
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 1s ease-in-out',
        }}
      />
      
      {/* Next image for crossfade */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-ken-burns-alt"
        style={{
          backgroundImage: `url(${SCENE_IMAGES[nextIndex]})`,
          opacity: isTransitioning ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
    </div>
  );
}
