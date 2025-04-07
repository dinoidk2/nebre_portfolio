
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!nameRef.current) return;
    
    const addRandomRotation = () => {
      const letters = nameRef.current?.querySelectorAll('.letter');
      if (!letters) return;
      
      letters.forEach(letter => {
        const rotation = (Math.random() * 12) - 6;
        (letter as HTMLElement).style.transform = `rotate(${rotation}deg)`;
      });
    };
    
    addRandomRotation();
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
        <div className="relative">
          <div className="portal-ring" style={{ '--i': '0' } as React.CSSProperties}></div>
          <div className="portal-ring" style={{ '--i': '1' } as React.CSSProperties}></div>
          <div className="portal-ring" style={{ '--i': '2' } as React.CSSProperties}></div>
          <div className="portal-ring" style={{ '--i': '3' } as React.CSSProperties}></div>
          <div className="portal-ring" style={{ '--i': '4' } as React.CSSProperties}></div>
          <div className="portal-ring" style={{ '--i': '5' } as React.CSSProperties}></div>
          <div className="portal-center-glow"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container bg-gradient-to-br from-monet-blue/30 via-vangogh-yellow/30 to-monet-purple/30">
      <div className="absolute inset-0 bg-halftone-dots opacity-20 pointer-events-none"></div>
      
      <div className="min-h-screen flex flex-col justify-center items-center relative pt-28 md:pt-40">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-spiderverse-purple to-spiderverse-blue rounded-full blur-xl opacity-40 animate-pulse-light"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-spiderverse-pink to-spiderverse-yellow rounded-full blur-xl opacity-40 animate-float"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-gradient-to-r from-vangogh-yellow to-vangogh-orange rounded-full blur-xl opacity-40 animate-rotate-slow"></div>
        
        {/* Main Content - Adjusted positioning with more space below navbar */}
        <div className="z-10 flex flex-col items-center w-full px-4 mt-32 md:mt-24">
          <h1 className="comic-title text-spiderverse-purple mb-2 text-center">
            <div ref={nameRef} className="inline-flex flex-wrap justify-center">
              {'Oceana Viktoria'.split('').map((char, i) => (
                <span key={i} className="letter inline-block transform transition-transform duration-300 hover:scale-125 hover:-rotate-6">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </h1>
          <h2 className="comic-subtitle text-spiderverse-blue mb-8 text-center">Digital Artist · Web Developer · Student</h2>
          
          {/* Profile Image with Comic Style Border - Centered with improved alignment */}
          <div className="flex justify-center w-full mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-monet-purple via-monet-blue to-monet-pink rounded-full blur-lg animate-pulse-light transform scale-105"></div>
              <img 
                src="/lovable-uploads/cc4a085f-8fbc-43b4-8826-cf726b0ad4cf.png" 
                alt="Oceana Viktoria" 
                className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-full comic-border relative z-10"
                style={{ objectPosition: "center 35%" }}
              />
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-spiderverse-yellow comic-border p-2 rounded-full z-20 transform rotate-12">
                <span className="text-xl font-bold">!</span>
              </div>
              <div className="absolute -bottom-2 -left-6 w-16 h-16 bg-spiderverse-pink comic-border p-2 rounded-full z-20 transform -rotate-6">
                <span className="text-xl font-bold">:)</span>
              </div>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="impressionist-card max-w-lg mx-auto mb-6 transform hover:rotate-1 w-full">
            <p className="text-lg">Welcome to my portfolio! I'm passionate about art, web development, and creative expression. Explore my work and get to know me better!</p>
          </div>
          
          {/* Call to Action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link 
              to="/profile" 
              className="comic-border bg-spiderverse-blue px-6 py-2 text-white font-bold text-lg rounded-lg transform transition-transform hover:scale-105 hover:-rotate-2"
            >
              My Profile
            </Link>
            <Link 
              to="/hobbies" 
              className="comic-border bg-spiderverse-yellow px-6 py-2 text-black font-bold text-lg rounded-lg transform transition-transform hover:scale-105 hover:rotate-2"
            >
              My Hobbies
            </Link>
          </div>
        </div>
        
        {/* Decorative Comic Elements */}
        <div className="absolute bottom-4 right-4 bg-white/60 backdrop-blur-sm p-4 rounded-full comic-border hidden md:block">
          <div className="text-sm font-bold">Portfolio 2025</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
