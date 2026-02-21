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
      <div className="absolute inset-0 bg-[url('/assets/generated/rv-scene-1.png')] bg-cover bg-center opacity-20" />
      
      <Card className="relative w-full max-w-2xl shadow-warm-lg border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-6xl animate-bounce">
              🚐
            </div>
          </div>
          
          <CardTitle className="text-5xl font-bold text-primary">
            RV Journey Adventure
          </CardTitle>
          
          <CardDescription className="text-xl text-foreground/80">
            You are going on trip in RV. You dont see everything that's happening. Remember your choices!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Journey Overview
            </h3>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span><strong className="text-foreground">1 Break Stop</strong> along the way</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Experience the journey from the driver's perspective</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Pay attention to what happens during your trip</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>Remember:</strong> Limited visibility - stay alert and remember your choices!
            </p>
          </div>
          
          <Button 
            onClick={handleStart}
            size="lg"
            className="w-full text-xl font-bold py-6"
          >
            Start Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
