
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="page-container bg-gradient-to-br from-spiderverse-red/30 via-vangogh-blue/20 to-monet-purple/20">
      <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>
      
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="comic-title text-spiderverse-red mb-4">404</h1>
        <div className="impressionist-card max-w-md">
          <h2 className="comic-subtitle text-spiderverse-blue mb-4">Oops! Page not found</h2>
          <p className="mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <a 
            href="/" 
            className="comic-border inline-block bg-spiderverse-blue px-6 py-2 text-white font-bold rounded-lg transform transition-transform hover:scale-105"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
