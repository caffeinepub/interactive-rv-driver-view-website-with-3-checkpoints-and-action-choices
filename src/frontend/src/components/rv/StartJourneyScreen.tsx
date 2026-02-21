import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';
import { useSfx } from '../../hooks/useSfx';

interface StartJourneyScreenProps {
  onStart: () => void;
}

export function StartJourneyScreen({ onStart }: StartJourneyScreenProps) {
  const startSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.2 });

  const handleStart = () => {
    startSfx.play();
    onStart();
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="absolute inset-0 bg-[url('/assets/generated/road-morning.dim_1920x1080.png')] bg-cover bg-center opacity-20" />
      
      <Card className="relative w-full max-w-2xl shadow-warm-lg border-2 border-primary/30 bg-card/95 backdrop-blur-md hover:border-primary/50 transition-colors">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="text-7xl animate-bounce">
              🚐
            </div>
          </div>
          
          <CardTitle className="text-5xl font-bold text-primary">
            RV Journey Adventure
          </CardTitle>
          
          <CardDescription className="text-xl text-foreground/90 font-medium">
            You are going on trip in RV. You dont see everything that's happening. Remember your choices!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-8">
          <div className="bg-muted/60 rounded-xl p-6 space-y-4 border border-border">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Journey Overview
            </h3>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5 text-lg">•</span>
                <span className="text-base"><strong className="text-foreground">1 Break Stop</strong> along the way</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5 text-lg">•</span>
                <span className="text-base">Experience the journey from the driver's perspective</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5 text-lg">•</span>
                <span className="text-base">Pay attention to what happens during your trip</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-4 flex items-start gap-3 hover:bg-amber-500/15 transition-colors">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-base text-amber-900 dark:text-amber-200 font-medium">
              <strong>Remember:</strong> Limited visibility - stay alert and remember your choices!
            </p>
          </div>
          
          <Button 
            onClick={handleStart}
            size="lg"
            className="w-full text-xl font-bold py-7 hover:scale-105 transition-transform"
          >
            Start Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
