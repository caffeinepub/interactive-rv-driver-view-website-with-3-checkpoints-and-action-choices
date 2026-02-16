import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Heart } from 'lucide-react';

interface TripCompleteProps {
  onRestart: () => void;
}

export function TripComplete({ onRestart }: TripCompleteProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'rv-journey';

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <Card className="w-full max-w-lg shadow-warm-lg border-2 border-primary/30">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold text-primary">
              Journey Complete!
            </CardTitle>
            <CardDescription className="text-lg">
              You've successfully completed your RV adventure through all 3 break stops
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Trip Summary</p>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-muted-foreground">Break Stops</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">4</p>
                <p className="text-muted-foreground">Scenes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">∞</p>
                <p className="text-muted-foreground">Memories</p>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground italic">
            "The journey of a thousand miles begins with a single step, and continues with many more adventures."
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            Start New Journey
          </Button>
          
          <div className="text-center text-sm text-muted-foreground pt-2 border-t">
            <p>© {currentYear} RV Journey Experience</p>
            <p className="flex items-center justify-center gap-1 mt-1">
              Built with <Heart className="w-3 h-3 text-primary fill-primary" /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
