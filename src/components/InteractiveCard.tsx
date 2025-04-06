
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface InteractiveCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, icon, children }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();
  
  // Reset flipped state when switching between mobile and desktop
  useEffect(() => {
    setIsFlipped(false);
  }, [isMobile]);

  // Handle click event for both desktop and mobile
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full h-32 sm:h-40 cursor-pointer perspective-1000"
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleInteraction(e as any);
        }
      }}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white/80 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow">
          {icon && <span className="text-3xl mb-2">{icon}</span>}
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="mt-2 text-spiderverse-purple">
            <span className="text-xs">Tap to reveal</span>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-white/90 backdrop-blur-md rounded-lg p-4 rotate-y-180 overflow-auto">
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
