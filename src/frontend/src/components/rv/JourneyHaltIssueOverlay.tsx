import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface JourneyHaltIssueOverlayProps {
  onResolve: () => void;
}

export function JourneyHaltIssueOverlay({ onResolve }: JourneyHaltIssueOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in">
      <Card className="w-full max-w-md mx-4 shadow-warm border-destructive/50">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <Badge variant="destructive" className="text-xs">
              Journey Paused
            </Badge>
            <CardTitle className="text-2xl">Unidentified Issue</CardTitle>
            <CardDescription className="text-base">
              The RV has encountered an unexpected problem. Please address the issue before continuing your journey.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              • Check all systems
            </p>
            <p className="text-sm text-muted-foreground">
              • Verify connections
            </p>
            <p className="text-sm text-muted-foreground">
              • Ensure everything is secure
            </p>
          </div>
          <Button 
            onClick={onResolve}
            className="w-full"
            size="lg"
          >
            Issue resolved
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
