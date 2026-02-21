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
        return 'Traveling to Break Stop';
      case 'break-stop':
        return 'Break Stop 1 of 1';
      case 'post-break-stop-delay':
        return 'Break Stop Complete';
      case 'post-break-road-to-issue':
        return 'Continuing Journey';
      case 'halt-issue':
        return 'Journey Paused';
      case 'celebration':
        return 'Badge Earned!';
      case 'post-issue-road-to-destination':
        return 'Heading to Campfire';
      case 'traveling-to-destination':
        return 'Arriving Soon';
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
        return 25;
      case 'break-stop':
        return 50;
      case 'post-break-stop-delay':
        return 60;
      case 'post-break-road-to-issue':
        return 65;
      case 'halt-issue':
        return 70;
      case 'celebration':
        return 80;
      case 'post-issue-road-to-destination':
        return 90;
      case 'traveling-to-destination':
        return 95;
      case 'destination':
        return 100;
      case 'complete':
        return 100;
    }
  };

  const isAtBreakStop = (): boolean => {
    return flowState.type === 'break-stop' || 
           flowState.type === 'post-break-stop-delay' ||
           flowState.type === 'post-break-road-to-issue' ||
           flowState.type === 'halt-issue' ||
           flowState.type === 'celebration' ||
           flowState.type === 'post-issue-road-to-destination' ||
           flowState.type === 'traveling-to-destination' ||
           flowState.type === 'destination' ||
           flowState.type === 'complete';
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
            {isAtBreakStop() ? '1' : '0'}/1
          </Badge>
        </div>
        
        <Progress value={getProgress()} className="h-2" />
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Start</span>
          <div className="flex gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                isAtBreakStop()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              1
            </div>
          </div>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}
