
import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface TrailDot extends Position {
  id: number;
  color: string;
}

interface ExplosionProps {
  position: Position;
  color: string;
  onAnimationEnd: () => void;
}

// Maximum number of dots in the trail
const MAX_TRAIL_LENGTH = 20;

// Array of colors for the trail dots
const TRAIL_COLORS = [
  'bg-spiderverse-purple', 'bg-spiderverse-blue', 
  'bg-spiderverse-pink', 'bg-spiderverse-yellow',
  'bg-monet-blue', 'bg-monet-purple',
  'bg-monet-green', 'bg-vangogh-yellow',
  'bg-vangogh-orange'
];

const Explosion: React.FC<ExplosionProps> = ({ position, color, onAnimationEnd }) => {
  return (
    <div 
      className={`explosion ${color}`}
      style={{ left: position.x, top: position.y }}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

const CursorEffects: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [explosions, setExplosions] = useState<{ id: number; position: Position; color: string }[]>([]);
  const [nextExplosionId, setNextExplosionId] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is likely mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only add mouse event listeners if not on mobile
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleClick = (e: MouseEvent) => {
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
        const newExplosion = { 
          id: nextExplosionId, 
          position: { x: e.clientX, y: e.clientY },
          color
        };
        
        setExplosions(prev => [...prev, newExplosion]);
        setNextExplosionId(prev => prev + 1);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', checkMobile);
      };
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [nextExplosionId, isMobile]);

  // Update trail effect
  useEffect(() => {
    if (isMobile) return;
    
    const id = Math.random();
    const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
    
    setTrail(prev => {
      // Add new dot to the beginning of the array
      const newTrail = [{ id, x: position.x, y: position.y, color }, ...prev];
      // Remove excess dots if we exceed MAX_TRAIL_LENGTH
      if (newTrail.length > MAX_TRAIL_LENGTH) {
        return newTrail.slice(0, MAX_TRAIL_LENGTH);
      }
      return newTrail;
    });
  }, [position, isMobile]);

  const handleExplosionEnd = (id: number) => {
    setExplosions(prev => prev.filter(explosion => explosion.id !== id));
  };

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot bg-white mix-blend-difference"
        style={{ 
          left: position.x, 
          top: position.y 
        }}
      />
      
      {/* Trail dots */}
      {trail.map((dot, index) => (
        <div 
          key={dot.id}
          className={`cursor-trail ${dot.color}`}
          style={{ 
            left: dot.x, 
            top: dot.y,
            opacity: 1 - (index / MAX_TRAIL_LENGTH),
            transform: `translate(-50%, -50%) scale(${1 - (index / MAX_TRAIL_LENGTH)})`,
            transition: 'transform 0.1s, opacity 0.3s'
          }}
        />
      ))}
      
      {/* Click explosions */}
      {explosions.map(explosion => (
        <Explosion 
          key={explosion.id}
          position={explosion.position}
          color={explosion.color}
          onAnimationEnd={() => handleExplosionEnd(explosion.id)}
        />
      ))}
    </>
  );
};

export default CursorEffects;
