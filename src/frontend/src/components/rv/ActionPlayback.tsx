import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { ActionItem } from './checkpoints';

interface ActionPlaybackProps {
  checkpointNumber: number;
  selectedActions: ActionItem[];
  onComplete: () => void;
}

export function ActionPlayback({ 
  checkpointNumber, 
  selectedActions, 
  onComplete 
}: ActionPlaybackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentAction = selectedActions[currentIndex];
  const isLastAction = currentIndex === selectedActions.length - 1;

  const handleNext = () => {
    if (isLastAction) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background/95 to-secondary/20 backdrop-blur-md animate-fade-in">
      <Card className="w-full max-w-xl shadow-warm-lg border-2 border-primary/30">
        <CardHeader className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Checkpoint {checkpointNumber}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {currentIndex + 1} of {selectedActions.length}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Activity in Progress
          </CardTitle>
          <CardDescription className="text-base">
            Experiencing your chosen activities
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border-2 border-primary/20 animate-slide-up">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-6xl animate-pulse-slow">
                {currentAction.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {currentAction.label}
                </h3>
                <p className="text-muted-foreground">
                  {currentAction.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {selectedActions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-8 bg-primary' 
                    : idx < currentIndex
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            {isLastAction ? 'Continue Journey' : 'Next Activity'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
