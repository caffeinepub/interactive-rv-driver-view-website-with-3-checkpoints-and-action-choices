import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Droplet, Bath, Flame, Gauge, CheckCircle, XCircle } from 'lucide-react';
import { useSfx } from '@/hooks/useSfx';

interface JourneyHaltIssueOverlayProps {
  onResolve: () => void;
}

type AnswerOption = {
  id: string;
  icon: string;
  label: string;
  feedback: string;
  isCorrect: boolean;
};

const options: AnswerOption[] = [
  { 
    id: 'fuel', 
    icon: '⛽', 
    label: 'Fuel depleted', 
    feedback: 'The fuel gauge shows plenty of gas remaining. Engine running smoothly!',
    isCorrect: false
  },
  { 
    id: 'food', 
    icon: '🍲', 
    label: 'Food supplies over', 
    feedback: 'The pantry is well-stocked. Snacks and meals are still available.',
    isCorrect: false
  },
  { 
    id: 'tire', 
    icon: '🛞', 
    label: 'Tire damage', 
    feedback: 'All tires are properly inflated and in good condition.',
    isCorrect: false
  },
  { 
    id: 'water', 
    icon: '💧', 
    label: 'Resource tank empty',
    feedback: 'Correct! The water tank is completely empty. This is causing the RV systems to fail.',
    isCorrect: true
  },
  { 
    id: 'battery', 
    icon: '🔋', 
    label: 'Battery failure', 
    feedback: 'The battery is fully charged and functioning normally.',
    isCorrect: false
  },
];

export function JourneyHaltIssueOverlay({ onResolve }: JourneyHaltIssueOverlayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Sound effects
  const alertSfx = useSfx('/assets/sounds/system-alert.mp3', { volume: 0.6 });
  const correctSfx = useSfx('/assets/sounds/break-point-reached.mp3', { volume: 0.5 });
  const wrongSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.2 });

  // Play initial alert sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      alertSfx.play();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerClick = (optionId: string) => {
    if (isLocked) return;

    const option = options.find(o => o.id === optionId);
    if (!option) return;

    setSelectedAnswer(optionId);
    setFeedback(option.feedback);
    
    if (option.isCorrect) {
      // Correct answer
      setIsCorrect(true);
      setIsLocked(true);
      correctSfx.play();
      
      // Dramatic pause before resolving
      setTimeout(() => {
        onResolve();
      }, 2500);
    } else {
      // Wrong answer
      wrongSfx.play();
      setIsCorrect(false);
      
      // Clear selection after showing feedback
      setTimeout(() => {
        setSelectedAnswer(null);
        setFeedback('');
      }, 3000);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-30 animate-fade-in">
      <div className="relative w-full max-w-4xl mx-auto p-6">
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
        <div className="relative bg-gradient-to-br from-destructive/20 via-card to-destructive/10 border-2 border-destructive rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header with pulsing alert icon */}
          <div className="flex items-center justify-center gap-4">
            <AlertTriangle className="w-20 h-20 text-destructive animate-error-pulse" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-destructive mb-2">Journey Halted!</h2>
              <p className="text-xl text-muted-foreground">Critical issue detected</p>
            </div>
          </div>

          {/* Visual status indicators */}
          <div className="grid grid-cols-4 gap-4 py-4">
            <div className="flex flex-col items-center gap-2 p-4 bg-card/60 rounded-xl border border-border/50 hover:bg-card/80 transition-colors">
              <Droplet className="w-10 h-10 text-blue-400 animate-drip" />
              <span className="text-sm font-medium text-muted-foreground">Water</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-card/60 rounded-xl border border-border/50 hover:bg-card/80 transition-colors">
              <Gauge className="w-10 h-10 text-green-400" />
              <span className="text-sm font-medium text-muted-foreground">Pressure</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-card/60 rounded-xl border border-border/50 hover:bg-card/80 transition-colors">
              <Flame className="w-10 h-10 text-orange-400 animate-steam-stop" />
              <span className="text-sm font-medium text-muted-foreground">Engine</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-card/60 rounded-xl border border-border/50 hover:bg-card/80 transition-colors">
              <Bath className="w-10 h-10 text-cyan-400" />
              <span className="text-sm font-medium text-muted-foreground">Tank</span>
            </div>
          </div>

          {/* Question */}
          <div className="text-center space-y-3">
            <p className="text-2xl font-bold text-foreground">
              What caused the RV to stop?
            </p>
            <p className="text-base text-muted-foreground">
              Select the correct issue to continue your journey
            </p>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const showAsCorrect = isSelected && option.isCorrect;
              const showAsWrong = isSelected && !option.isCorrect;
              
              return (
                <div key={option.id} className="relative">
                  <Button
                    onClick={() => handleAnswerClick(option.id)}
                    disabled={isLocked}
                    variant="outline"
                    className={`w-full h-auto py-5 px-6 text-left justify-start gap-4 transition-all duration-300 ${
                      showAsCorrect
                        ? 'bg-green-500/20 border-green-500 border-2 hover:bg-green-500/30' 
                        : showAsWrong
                        ? 'bg-red-500/20 border-red-500 border-2 hover:bg-red-500/30'
                        : 'hover:bg-accent hover:border-primary/50'
                    } ${isLocked && !isSelected ? 'opacity-40' : ''}`}
                  >
                    <span className="text-4xl">{option.icon}</span>
                    <span className="text-lg font-semibold flex-1">{option.label}</span>
                    {showAsCorrect && (
                      <CheckCircle className="w-7 h-7 text-green-500 animate-pulse" />
                    )}
                    {showAsWrong && (
                      <XCircle className="w-7 h-7 text-red-500 animate-pulse" />
                    )}
                  </Button>
                  
                  {/* Feedback text below the button */}
                  {isSelected && feedback && (
                    <div className={`mt-3 p-4 rounded-lg border-2 animate-fade-in ${
                      option.isCorrect 
                        ? 'bg-green-500/10 border-green-500/50' 
                        : 'bg-red-500/10 border-red-500/50'
                    }`}>
                      <p className={`text-sm font-medium ${
                        option.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}>
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
              <p className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Excellent! Resolving issue...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
