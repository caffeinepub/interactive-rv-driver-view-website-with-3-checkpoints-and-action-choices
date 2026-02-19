import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ClickToContinueHintProps {
  onContinue: () => void;
  message?: string;
}

export function ClickToContinueHint({ 
  onContinue, 
  message = "Click to continue" 
}: ClickToContinueHintProps) {
  return (
    <div 
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 cursor-pointer"
      onClick={onContinue}
    >
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Button 
          size="lg"
          onClick={onContinue}
          className="text-lg px-8 py-6 shadow-2xl"
        >
          {message}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
