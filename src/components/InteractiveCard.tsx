
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface InteractiveCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, icon, children }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Reset flipped state when switching between mobile and desktop
  useEffect(() => {
    setIsFlipped(false);
    setIsModalOpen(false);
  }, [isMobile]);

  // Handle click event for both desktop and mobile
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
    
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <>
      <div 
        className="relative w-full h-32 sm:h-40 cursor-pointer perspective-1000"
        onClick={handleInteraction}
        onTouchStart={(e) => {
          // Prevent scroll on touch
          e.stopPropagation();
        }}
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
              <span className="text-xs">{isMobile ? "Tap to open" : "Tap to reveal"}</span>
            </div>
          </div>
          
          {/* Back of card - only used on desktop */}
          {!isMobile && (
            <div className="absolute w-full h-full backface-hidden bg-white/90 backdrop-blur-md rounded-lg p-4 rotate-y-180 overflow-auto">
              <div className="text-sm">{children}</div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile modal popup */}
      {isMobile && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"></div>
          
          <div 
            className="bg-white/95 backdrop-blur-md rounded-lg w-full max-w-xs shadow-xl relative overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-spiderverse-purple text-white text-xs"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            
            <div className="p-5">
              <div className="flex items-center mb-4">
                {icon && <span className="text-3xl mr-3">{icon}</span>}
                <h3 className="font-bold text-xl">{title}</h3>
              </div>
              <div className="text-sm">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveCard;
