import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FlowState } from '../../hooks/useRVFlow';
import { Navigation, AlertTriangle } from 'lucide-react';

interface ProgressIndicatorProps {
  flowState: FlowState;
}

export function ProgressIndicator({ flowState }: ProgressIndicatorProps) {
  const getStatusText = (): string => {
    switch (flowState.type) {
      case 'start':
        return 'Ready to start';
      case 'traveling':
        return `Traveling to Checkpoint ${flowState.segment}`;
      case 'checkpoint':
        return `Checkpoint ${flowState.checkpointNumber} of 3`;
      case 'playback':
        return `Checkpoint ${flowState.checkpointNumber} Activities`;
      case 'transition':
        return flowState.fromCheckpoint === 3 ? 'Continuing Journey' : 'Continuing Journey';
      case 'halt-issue':
        return 'Journey Paused';
      case 'traveling-to-destination':
        return 'Traveling to Destination';
      case 'destination':
        return 'Arrived at Campfire';
      case 'complete':
        return 'Journey Complete';
    }
  };

  const getProgress = (): number => {
    switch (flowState.type) {
      case 'start':
        return 0;
      case 'traveling':
        return ((flowState.segment - 1) / 3) * 100;
      case 'checkpoint':
        return ((flowState.checkpointNumber - 0.5) / 3) * 100;
      case 'playback':
        return ((flowState.checkpointNumber - 0.3) / 3) * 100;
      case 'transition':
        return (flowState.fromCheckpoint / 3) * 100;
      case 'halt-issue':
        return 100;
      case 'traveling-to-destination':
        return 100;
      case 'destination':
        return 100;
      case 'complete':
        return 100;
    }
  };

  const getCurrentCheckpoint = (): number => {
    switch (flowState.type) {
      case 'start':
        return 0;
      case 'traveling':
        return flowState.segment;
      case 'checkpoint':
        return flowState.checkpointNumber;
      case 'playback':
        return flowState.checkpointNumber;
      case 'transition':
        return flowState.fromCheckpoint;
      case 'halt-issue':
        return 3;
      case 'traveling-to-destination':
        return 3;
      case 'destination':
        return 3;
      case 'complete':
        return 3;
    }
  };

  const isHalted = flowState.type === 'halt-issue';

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
      <div className="bg-card/95 backdrop-blur-md rounded-lg shadow-warm border border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isHalted ? (
              <AlertTriangle className="w-4 h-4 text-destructive" />
            ) : (
              <Navigation className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-semibold text-foreground">
              {getStatusText()}
            </span>
          </div>
          <Badge variant={isHalted ? "destructive" : "secondary"} className="text-xs">
            {getCurrentCheckpoint()}/3
          </Badge>
        </div>
        
        <Progress value={getProgress()} className="h-2" />
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Start</span>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  getCurrentCheckpoint() >= num
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}
