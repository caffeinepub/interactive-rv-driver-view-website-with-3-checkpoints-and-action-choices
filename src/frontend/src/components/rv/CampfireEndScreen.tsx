import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Camera, Flame } from 'lucide-react';

interface CampfireEndScreenProps {
  onContinue: () => void;
}

export function CampfireEndScreen({ onContinue }: CampfireEndScreenProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-2xl shadow-warm-lg border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Flame className="w-20 h-20 text-amber-500 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-16 h-16 text-orange-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-primary/20 text-primary font-bold">
              Checkpoint 1
            </Badge>
            <CardTitle className="text-4xl font-bold text-primary">
              Congratulations! 🎉
            </CardTitle>
            <CardDescription className="text-lg text-foreground/80">
              You've reached the campfire
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Award className="w-12 h-12 text-amber-500" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-foreground">RV Badge Earned!</h3>
                <p className="text-muted-foreground">You have got an RV badge. Take a snap with our team.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Camera className="w-5 h-5" />
            <p className="text-sm">Capture this moment with your team</p>
          </div>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full text-lg font-semibold mt-4"
          >
            Continue Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
