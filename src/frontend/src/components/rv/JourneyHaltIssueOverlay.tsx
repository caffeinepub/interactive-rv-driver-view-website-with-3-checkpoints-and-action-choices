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
  const alertSfx = useSfx('/assets/sfx/system-alert.mp3', { volume: 0.6 });
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
      <div className="w-full max-w-4xl mx-4 space-y-8">
        {/* Visual Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Faucet - nothing comes out */}
          <div className="bg-black/40 rounded-lg p-6 flex flex-col items-center justify-center space-y-3 border border-destructive/30">
            <Droplet className="w-12 h-12 text-destructive animate-drip" />
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">Water Supply</p>
              <p className="text-xs text-destructive animate-pulse">Empty</p>
            </div>
          </div>

          {/* Bath/Shower - error symbol */}
          <div className="bg-black/40 rounded-lg p-6 flex flex-col items-center justify-center space-y-3 border border-destructive/30">
            <div className="relative">
              <Bath className="w-12 h-12 text-muted-foreground/50" />
              <AlertTriangle className="w-6 h-6 text-destructive absolute -top-1 -right-1 animate-error-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">Shower</p>
              <p className="text-xs text-destructive animate-pulse">Error</p>
            </div>
          </div>

          {/* Cooking - steam stops */}
          <div className="bg-black/40 rounded-lg p-6 flex flex-col items-center justify-center space-y-3 border border-destructive/30">
            <Flame className="w-12 h-12 text-muted-foreground/50 animate-steam-stop" />
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">Cooking</p>
              <p className="text-xs text-destructive animate-pulse">Offline</p>
            </div>
          </div>

          {/* Dashboard warning */}
          <div className="bg-black/40 rounded-lg p-6 flex flex-col items-center justify-center space-y-3 border border-destructive/30">
            <Gauge className="w-12 h-12 text-destructive animate-warning-blink" />
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">Dashboard</p>
              <p className="text-xs text-destructive animate-pulse">Alert</p>
            </div>
          </div>
        </div>

        {/* System Alert Quiz */}
        <div className="bg-gradient-to-b from-destructive/20 to-black/60 rounded-xl p-8 border-2 border-destructive/50 shadow-warm-lg animate-slide-up">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl animate-warning-blink">🚨</span>
              <h2 className="text-3xl font-bold text-white text-shadow-lg">SYSTEM ALERT</h2>
              <span className="text-4xl animate-warning-blink">🚨</span>
            </div>
            
            <p className="text-xl text-white/90 text-shadow-md">
              Trip Interrupted. Select probable cause:
            </p>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleAnswerClick(option.id)}
                  disabled={isLocked}
                  variant={selectedAnswer === option.id ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                  size="lg"
                  className={`h-auto py-4 text-lg font-semibold transition-all ${
                    selectedAnswer === option.id && isCorrect
                      ? 'bg-accent text-accent-foreground animate-pulse-slow scale-105'
                      : ''
                  } ${
                    isLocked && option.id !== 'water' ? 'opacity-50' : ''
                  }`}
                >
                  <span className="text-2xl mr-3">{option.icon}</span>
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="mt-6 p-4 bg-black/60 rounded-lg border border-yellow-500/50 animate-fade-in">
                <p className="text-yellow-400 text-lg font-medium text-shadow-md">
                  {feedback}
                </p>
              </div>
            )}

            {/* Correct answer dramatic pause */}
            {isCorrect && (
              <div className="mt-6 p-6 bg-accent/20 rounded-lg border-2 border-accent animate-fade-in">
                <p className="text-accent text-2xl font-bold text-shadow-lg animate-pulse-slow">
                  Correct! Resolving issue...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
