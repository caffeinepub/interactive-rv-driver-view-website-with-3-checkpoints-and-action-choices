import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';

interface StartJourneyScreenProps {
  onStart: () => void;
}

export function StartJourneyScreen({ onStart }: StartJourneyScreenProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
      <div className="absolute inset-0 bg-[url('/assets/generated/rv-scene-1.dim_1920x1080.png')] bg-cover bg-center opacity-20" />
      
      <Card className="relative z-10 w-full max-w-lg shadow-warm-lg border-2 border-primary/20 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Navigation className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-primary">
            RV Adventure Awaits
          </CardTitle>
          <CardDescription className="text-lg">
            Embark on a scenic journey through beautiful landscapes. Make stops, explore activities, and create memories along the way.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚐</span>
              <div>
                <p className="font-semibold text-foreground">Travel in Style</p>
                <p>Experience the open road from the driver's seat</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-foreground">3 Checkpoints</p>
                <p>Stop at scenic locations and choose your activities</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-semibold text-foreground">Your Journey</p>
                <p>Make choices that shape your unique adventure</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onStart}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            Start Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
