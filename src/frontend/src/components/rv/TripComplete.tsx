import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MapPin, Heart } from 'lucide-react';

interface TripCompleteProps {
  onRestart: () => void;
}

export function TripComplete({ onRestart }: TripCompleteProps) {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'unknown-app';

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-2xl shadow-warm-lg border-2 border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-primary animate-pulse" />
          </div>
          
          <CardTitle className="text-5xl font-bold text-primary">
            Journey Complete! 🎉
          </CardTitle>
          
          <CardDescription className="text-xl text-foreground/80">
            You've successfully completed your RV adventure
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Journey Summary
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                <Badge variant="secondary" className="text-lg">1</Badge>
                <span className="text-sm text-muted-foreground">Break Stop</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                <Badge variant="secondary" className="text-lg">✓</Badge>
                <span className="text-sm text-muted-foreground">Badge Earned</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full text-xl font-bold py-6"
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
