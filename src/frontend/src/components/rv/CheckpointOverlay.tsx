import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckpointData } from './checkpoints';
import { Check, AlertCircle } from 'lucide-react';

interface CheckpointOverlayProps {
  checkpoint: CheckpointData;
  selectedActions: Set<string>;
  selectionLimitReached: boolean;
  onToggleAction: (actionId: string) => void;
  onContinue: () => void;
}

export function CheckpointOverlay({ 
  checkpoint, 
  selectedActions, 
  selectionLimitReached,
  onToggleAction, 
  onContinue 
}: CheckpointOverlayProps) {
  const canContinue = selectedActions.size === 2;
  const remainingSelections = Math.max(0, 2 - selectedActions.size);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-2xl shadow-warm-lg border-2 border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-base px-4 py-1">
              Checkpoint {checkpoint.id}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            {checkpoint.title}
          </CardTitle>
          <CardDescription className="text-base">
            {checkpoint.subtitle}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <p>Choose 2 activities to continue</p>
            {selectionLimitReached && (
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Maximum 2 activities</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checkpoint.actions.map((action) => {
              const isSelected = selectedActions.has(action.id);
              const isDisabled = !isSelected && selectedActions.size >= 2;
              
              return (
                <button
                  key={action.id}
                  onClick={() => onToggleAction(action.id)}
                  disabled={isDisabled}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-primary bg-primary/10 shadow-md' 
                      : isDisabled
                      ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl flex-shrink-0">{action.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{action.label}</h4>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={onContinue}
            disabled={!canContinue}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            {canContinue 
              ? 'Continue Journey' 
              : `Select ${remainingSelections} more ${remainingSelections === 1 ? 'activity' : 'activities'}`
            }
          </Button>
          
          <div className="flex items-center justify-center gap-1 mt-2">
            {checkpoint.actions.map((action) => (
              <div
                key={action.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedActions.has(action.id) ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
