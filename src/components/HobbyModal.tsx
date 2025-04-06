
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HobbyModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface Image {
  src: string;
  caption?: string;
}

export const ImageCarousel: React.FC<{ images: Image[] }> = ({ images }) => {
  return (
    <div className="mt-4">
      <div className="flex overflow-x-auto space-x-4 py-2 carousel-images pb-4">
        {images.map((image, idx) => (
          <div key={idx} className="min-w-[200px] w-[200px] flex-shrink-0">
            <div className="bg-white/70 rounded-lg p-2 h-full">
              <img 
                src={image.src} 
                alt={image.caption || `Slide ${idx + 1}`} 
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              {image.caption && (
                <p className="text-sm text-center">{image.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HobbyModal: React.FC<HobbyModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      
      <div 
        className="bg-white/90 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[85vh] shadow-xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - made more obvious and larger for mobile */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-spiderverse-pink text-white hover:bg-spiderverse-purple transition-colors z-10"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="comic-subtitle mb-4">{title}</h2>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="pr-2">
              {children}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default HobbyModal;
