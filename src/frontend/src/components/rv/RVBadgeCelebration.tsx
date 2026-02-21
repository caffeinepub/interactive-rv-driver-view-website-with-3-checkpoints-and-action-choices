import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Camera } from 'lucide-react';
import { useSfx } from '../../hooks/useSfx';

interface RVBadgeCelebrationProps {
  onProceed: () => void;
}

export function RVBadgeCelebration({ onProceed }: RVBadgeCelebrationProps) {
  const celebrationSfx = useSfx('/assets/sounds/campfire-arrival.mp3', { volume: 0.5 });

  useEffect(() => {
    celebrationSfx.play();
  }, []);

  const handleProceed = () => {
    onProceed();
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-gradient-to-br from-primary/30 via-background/95 to-accent/30 backdrop-blur-md animate-fade-in">
      <Card className="w-full max-w-lg shadow-warm-lg border-2 border-primary/30">
        <CardHeader className="text-center space-y-6 pb-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-slow">
                <Award className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-bounce">
                <span className="text-xl">🎉</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Badge variant="secondary" className="text-base px-4 py-1">
              Congratulations!
            </Badge>
            <CardTitle className="text-3xl font-bold text-primary">
              RV Badge Earned
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20">
            <div className="flex items-start gap-3 text-center justify-center">
              <Camera className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-foreground font-medium">
                You have got an RV badge. Take a snap with our team.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>

          <Button 
            onClick={handleProceed}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            Continue to Destination
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
