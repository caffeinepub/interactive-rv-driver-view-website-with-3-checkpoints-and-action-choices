import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { useSfx } from '@/hooks/useSfx';

interface BreakStopReachedOverlayProps {
  breakStopNumber: number;
  onContinue: () => void;
}

export function BreakStopReachedOverlay({ 
  breakStopNumber, 
  onContinue 
}: BreakStopReachedOverlayProps) {
  const breakStopSfx = useSfx('/assets/sounds/break-point-reached.mp3', { volume: 0.5 });

  // Play sound effect once on mount
  useEffect(() => {
    breakStopSfx.play();
  }, []);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-lg shadow-warm-lg border-2 border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              <MapPin className="w-5 h-5 mr-2" />
              Break Stop {breakStopNumber}
            </Badge>
          </div>
          <CardTitle className="text-4xl font-bold text-primary">
            You have reached Break Stop {breakStopNumber}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4 animate-bounce">
            🚐
          </div>
          <p className="text-lg text-muted-foreground">
            Taking a moment to rest before continuing your journey
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full max-w-xs text-lg font-semibold"
          >
            Continue Journey
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
