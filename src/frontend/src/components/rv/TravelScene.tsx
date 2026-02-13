interface TravelSceneProps {
  backgroundImage: string;
  title: string;
  description: string;
}

export function TravelScene({ backgroundImage, title, description }: TravelSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      
      {/* Scene Info - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10 animate-fade-in">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
          <h2 className="text-white text-xl font-semibold text-shadow-md">{title}</h2>
          <p className="text-white/90 text-sm text-shadow-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
