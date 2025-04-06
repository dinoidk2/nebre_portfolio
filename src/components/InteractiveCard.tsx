
import React, { useState } from 'react';

interface InteractiveCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, icon, children }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-32 sm:h-40 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white/80 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow">
          {icon && <span className="text-3xl mb-2">{icon}</span>}
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="mt-2 text-spiderverse-purple">
            <span className="text-xs">Click to reveal</span>
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
