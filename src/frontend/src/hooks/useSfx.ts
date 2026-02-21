import { useEffect, useRef, useState } from 'react';

interface UseSfxOptions {
  volume?: number;
  loop?: boolean;
}

export function useSfx(src: string, options: UseSfxOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { volume = 1.0, loop = false } = options;

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audio.preload = 'auto';

    // Handle loading
    const handleCanPlay = () => {
      setIsReady(true);
      setHasError(false);
    };

    const handleError = () => {
      console.warn(`Failed to load audio: ${src}`);
      setHasError(true);
      setIsReady(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src, volume, loop]);

  const play = () => {
    if (!audioRef.current || !isReady || hasError) {
      return;
    }

    try {
      // Reset to start if not looping
      if (!loop) {
        audioRef.current.currentTime = 0;
      }
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay was prevented - this is expected on first load
          if (error.name === 'NotAllowedError') {
            console.log('Audio autoplay prevented - waiting for user interaction');
          } else {
            console.warn('Audio playback failed:', error);
          }
        });
      }
    } catch (error) {
      console.warn('Error playing audio:', error);
    }
  };

  const stop = () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } catch (error) {
      console.warn('Error stopping audio:', error);
    }
  };

  return { play, stop, isReady, hasError };
}
