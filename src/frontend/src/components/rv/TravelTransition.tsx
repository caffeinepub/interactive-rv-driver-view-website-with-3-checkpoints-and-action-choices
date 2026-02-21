import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useSfx } from '../../hooks/useSfx';

interface TravelTransitionProps {
  checkpointNumber: number;
  isLastCheckpoint: boolean;
}

export function TravelTransition({ checkpointNumber, isLastCheckpoint }: TravelTransitionProps) {
  const transitionSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.2 });

  useEffect(() => {
    transitionSfx.play();
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-fade-in">
      <div className="text-center space-y-6 px-4">
        <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            {isLastCheckpoint ? 'Arriving at Destination' : 'Back on the Road'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isLastCheckpoint 
              ? 'Your journey is almost complete...'
              : `Break Stop ${checkpointNumber} complete! Continuing your adventure...`
            }
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
