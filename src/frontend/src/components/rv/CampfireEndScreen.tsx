import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Camera, Flame } from 'lucide-react';
import { useSfx } from '@/hooks/useSfx';

interface CampfireEndScreenProps {
  onContinue: () => void;
}

export function CampfireEndScreen({ onContinue }: CampfireEndScreenProps) {
  const campfireSfx = useSfx('/assets/sounds/campfire-arrival.mp3', { volume: 0.7 });

  // Play campfire arrival sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      campfireSfx.play();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 animate-fade-in">
      {/* Campfire destination image as background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/assets/generated/rv-destination-campfire.dim_1920x1080.png)',
          filter: 'brightness(0.6)',
        }}
      />
      
      {/* Dark overlay for better card visibility */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <Card className="relative z-10 w-full max-w-2xl shadow-warm-lg border-2 border-primary/30 bg-gradient-to-br from-card/95 via-card/95 to-primary/10 hover:border-primary/50 transition-colors">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Flame className="w-24 h-24 text-amber-500 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-20 h-20 text-orange-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-5xl font-bold text-primary">
              Destination Reached! 🎉
            </CardTitle>
            <CardDescription className="text-xl text-foreground/90 font-medium">
              You have reached your checkpoint one
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-xl p-6 space-y-4 border border-amber-500/20">
            <div className="flex items-center justify-center gap-4">
              <Award className="w-14 h-14 text-amber-500" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-foreground">RV Badge Earned!</h3>
                <p className="text-muted-foreground text-base mt-1">You have got an RV badge. Take a snap with our team.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Camera className="w-6 h-6" />
            <p className="text-base font-medium">Capture this moment with your team</p>
          </div>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full text-lg font-semibold mt-4 py-6 hover:scale-105 transition-transform"
          >
            Continue Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
