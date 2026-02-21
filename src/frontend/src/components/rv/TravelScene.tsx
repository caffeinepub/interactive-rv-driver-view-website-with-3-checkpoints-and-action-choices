import { MousePointer2 } from 'lucide-react';

interface TravelSceneProps {
  backgroundImage: string;
  title: string;
  description: string;
  isClickable?: boolean;
  onClick?: () => void;
  hintText?: string;
}

export function TravelScene({ 
  backgroundImage, 
  title, 
  description,
  isClickable = false,
  onClick,
  hintText
}: TravelSceneProps) {
  return (
    <div 
      className={`absolute inset-0 w-full h-full ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      
      {/* Scene Info - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10 animate-fade-in">
        <div className="bg-black/50 backdrop-blur-md rounded-xl px-5 py-4 border border-white/30 shadow-warm-lg">
          <h2 className="text-white text-2xl font-bold text-shadow-md">{title}</h2>
          <p className="text-white/95 text-base text-shadow-sm mt-1.5">{description}</p>
        </div>
      </div>

      {/* Click hint for interactive scenes */}
      {isClickable && hintText && (
        <div className="absolute bottom-8 right-8 z-10 animate-pulse">
          <div className="bg-primary/90 backdrop-blur-md rounded-xl px-5 py-3 border border-primary-foreground/20 shadow-warm-lg flex items-center gap-2">
            <MousePointer2 className="w-5 h-5 text-primary-foreground" />
            <p className="text-primary-foreground text-sm font-semibold">{hintText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
