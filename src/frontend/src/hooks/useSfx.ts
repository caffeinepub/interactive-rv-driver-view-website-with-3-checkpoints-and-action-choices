import { useEffect, useRef } from 'react';

interface UseSfxOptions {
  volume?: number;
  loop?: boolean;
}

export function useSfx(src: string, options: UseSfxOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { volume = 1.0, loop = false } = options;

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [src, volume, loop]);

  const play = () => {
    if (audioRef.current) {
      // Reset to start if already playing
      audioRef.current.currentTime = 0;
      
      // Attempt to play, catch autoplay errors
      audioRef.current.play().catch((error) => {
        console.warn('Audio playback blocked or failed:', error);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
}
