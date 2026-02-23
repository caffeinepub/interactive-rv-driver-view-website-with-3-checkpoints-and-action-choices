import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Flame } from 'lucide-react';
import type { FlowState } from '../../hooks/useRVFlow';

interface ProgressIndicatorProps {
  flowState: FlowState;
}

export function ProgressIndicator({ flowState }: ProgressIndicatorProps) {
  const getProgress = () => {
    switch (flowState.type) {
      case 'start':
        return 0;
      case 'traveling_video_1':
        return 20;
      case 'at_rest_point':
        return 40;
      case 'traveling_video_2':
        return 60;
      case 'journey_halt_issue':
        return 70;
      case 'night_road':
        return 85;
      case 'destination_arrived':
        return 95;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };

  const getStatusText = () => {
    switch (flowState.type) {
      case 'traveling_video_1':
        return 'Traveling to Rest Point';
      case 'at_rest_point':
        return 'At Rest Point';
      case 'traveling_video_2':
        return 'Continuing Journey';
      case 'journey_halt_issue':
        return 'Issue Detected';
      case 'night_road':
        return 'Night Road';
      case 'destination_arrived':
        return 'Destination Reached';
      case 'complete':
        return 'Journey Complete';
      default:
        return 'On the Road';
    }
  };

  const progress = getProgress();
  const statusText = getStatusText();

  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 via-black/60 to-transparent p-4 pb-8">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-white/90 tracking-wide">
              {statusText}
            </span>
          </div>
          
          {flowState.type === 'destination_arrived' && (
            <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white gap-1.5 px-3 py-1 shadow-lg">
              <Flame className="w-4 h-4" />
              <span className="font-semibold">Campfire</span>
            </Badge>
          )}
        </div>
        
        <Progress 
          value={progress} 
          className="h-2.5 bg-white/20 shadow-md"
        />
        
        <div className="flex justify-between text-xs text-white/70 font-medium">
          <span>Start</span>
          <span>{progress}%</span>
          <span>Destination</span>
        </div>
      </div>
    </div>
  );
}
