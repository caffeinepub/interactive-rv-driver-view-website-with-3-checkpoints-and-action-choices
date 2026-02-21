import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MapPin, Heart } from 'lucide-react';
import { useSfx } from '../../hooks/useSfx';

interface TripCompleteProps {
  onRestart: () => void;
}

export function TripComplete({ onRestart }: TripCompleteProps) {
  const completeSfx = useSfx('/assets/sounds/journey-complete.mp3', { volume: 0.6 });

  useEffect(() => {
    const timer = setTimeout(() => {
      completeSfx.play();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'unknown-app';

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <Card className="w-full max-w-2xl shadow-warm-lg border-2 border-primary/30 hover:border-primary/50 transition-colors">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <CheckCircle2 className="w-24 h-24 text-primary animate-pulse" />
          </div>
          
          <CardTitle className="text-5xl font-bold text-primary">
            Journey Complete! 🎉
          </CardTitle>
          
          <CardDescription className="text-xl text-foreground/90 font-medium">
            You've successfully completed your RV adventure
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-8">
          <div className="bg-muted/60 rounded-xl p-6 space-y-4 border border-border">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Journey Summary
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:bg-card/80 transition-colors">
                <Badge variant="secondary" className="text-xl px-3 py-1">1</Badge>
                <span className="text-base font-medium text-muted-foreground">Break Stop</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:bg-card/80 transition-colors">
                <Badge variant="secondary" className="text-xl px-3 py-1">✓</Badge>
                <span className="text-base font-medium text-muted-foreground">Badge Earned</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full text-xl font-bold py-7 hover:scale-105 transition-transform"
          >
            Start New Journey
          </Button>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}
