import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Droplet, Bath, Flame, Gauge } from 'lucide-react';
import { useSfx } from '@/hooks/useSfx';

interface JourneyHaltIssueOverlayProps {
  onResolve: () => void;
}

type AnswerOption = {
  id: string;
  icon: string;
  label: string;
  wrongFeedback?: string;
};

const options: AnswerOption[] = [
  { id: 'fuel', icon: '⛽', label: 'Fuel depleted', wrongFeedback: 'Engine running smoothly!' },
  { id: 'food', icon: '🍲', label: 'Food supplies over', wrongFeedback: 'Snacks still available.' },
  { id: 'tire', icon: '🛞', label: 'Tire damage', wrongFeedback: 'All tires inflated.' },
  { id: 'water', icon: '💧', label: 'Resource tank empty' }, // Correct answer
  { id: 'battery', icon: '🔋', label: 'Battery failure', wrongFeedback: 'Battery fully charged.' },
];

export function JourneyHaltIssueOverlay({ onResolve }: JourneyHaltIssueOverlayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Sound effects
  const thudSfx = useSfx('/assets/sfx/thud.mp3', { volume: 0.5 });
  const warningSfx = useSfx('/assets/sfx/warning-beep.mp3', { volume: 0.4 });
  const alertSfx = useSfx('/assets/sounds/system-alert.mp3', { volume: 0.6 });
  const issueSfx = useSfx('/assets/sfx/post-breakstop-issue.mp3', { volume: 0.5 });

  // Play initial sounds on mount
  useEffect(() => {
    thudSfx.play();
    setTimeout(() => alertSfx.play(), 300);
    setTimeout(() => issueSfx.play(), 600);
  }, []);

  const handleAnswerClick = (optionId: string) => {
    if (isLocked) return;

    setSelectedAnswer(optionId);
    const option = options.find(o => o.id === optionId);
    
    if (optionId === 'water') {
      // Correct answer
      setIsCorrect(true);
      setFeedback('');
      setIsLocked(true);
      
      // Dramatic pause before resolving
      setTimeout(() => {
        onResolve();
      }, 2000);
    } else {
      // Wrong answer
      warningSfx.play();
      setFeedback(option?.wrongFeedback || 'Try again.');
      setIsCorrect(false);
      
      // Clear feedback after a moment
      setTimeout(() => {
        setSelectedAnswer(null);
        setFeedback('');
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in">
      <div className="relative w-full max-w-3xl mx-auto p-6">
        {/* Animated visual indicators */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Steam/drip effect */}
          <div className="absolute top-10 left-1/4 w-2 h-8 bg-blue-400/60 rounded-full animate-drip" />
          <div className="absolute top-16 left-1/3 w-2 h-6 bg-blue-400/40 rounded-full animate-drip" style={{ animationDelay: '0.3s' }} />
          
          {/* Warning lights */}
          <div className="absolute top-8 right-1/4 w-4 h-4 bg-red-500 rounded-full animate-warning-blink" />
          <div className="absolute top-12 right-1/3 w-3 h-3 bg-amber-500 rounded-full animate-warning-blink" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Main content card */}
        <div className="relative bg-gradient-to-br from-destructive/20 via-card to-destructive/10 border-2 border-destructive rounded-xl shadow-2xl p-8 space-y-6">
          {/* Header with pulsing alert icon */}
          <div className="flex items-center justify-center gap-4">
            <AlertTriangle className="w-16 h-16 text-destructive animate-error-pulse" />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-destructive mb-2">Journey Halted!</h2>
              <p className="text-lg text-muted-foreground">Critical issue detected</p>
            </div>
          </div>

          {/* Visual status indicators */}
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="flex flex-col items-center gap-2 p-3 bg-card/50 rounded-lg">
              <Droplet className="w-8 h-8 text-blue-400 animate-drip" />
              <span className="text-xs text-muted-foreground">Water</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-card/50 rounded-lg">
              <Gauge className="w-8 h-8 text-green-400" />
              <span className="text-xs text-muted-foreground">Pressure</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-card/50 rounded-lg">
              <Flame className="w-8 h-8 text-orange-400 animate-steam-stop" />
              <span className="text-xs text-muted-foreground">Engine</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-card/50 rounded-lg">
              <Bath className="w-8 h-8 text-cyan-400" />
              <span className="text-xs text-muted-foreground">Tank</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center space-y-4">
            <p className="text-xl font-semibold text-foreground">
              What caused the RV to stop?
            </p>
            <p className="text-sm text-muted-foreground">
              Select the correct issue to continue
            </p>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const showFeedback = isSelected && feedback;
              
              return (
                <div key={option.id} className="relative">
                  <Button
                    onClick={() => handleAnswerClick(option.id)}
                    disabled={isLocked}
                    variant={isSelected && isCorrect ? 'default' : 'outline'}
                    className={`w-full h-auto py-4 px-6 text-left justify-start gap-3 transition-all ${
                      isSelected && isCorrect 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : isSelected && !isCorrect
                        ? 'bg-destructive/10 border-destructive'
                        : 'hover:bg-accent'
                    } ${isLocked && !isSelected ? 'opacity-50' : ''}`}
                  >
                    <span className="text-3xl">{option.icon}</span>
                    <span className="text-base font-medium">{option.label}</span>
                  </Button>
                  
                  {showFeedback && (
                    <div className="absolute -bottom-8 left-0 right-0 text-center">
                      <p className="text-sm text-destructive font-medium animate-fade-in">
                        {feedback}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Success message */}
          {isCorrect && (
            <div className="text-center py-4 animate-fade-in">
              <p className="text-lg font-semibold text-primary">
                ✓ Correct! Resolving issue...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
