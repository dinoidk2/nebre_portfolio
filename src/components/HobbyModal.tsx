
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';

interface ImageCarouselProps {
  images: { src: string; caption?: string }[];
}

interface HobbyModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg comic-border bg-white/80 mb-4">
      <div className="relative h-64 sm:h-80">
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].caption || 'Gallery image'} 
          className="w-full h-full object-contain"
        />
      </div>
      
      {images[currentIndex].caption && (
        <div className="p-3 bg-white/90 text-center">
          <p className="text-sm">{images[currentIndex].caption}</p>
        </div>
      )}
      
      <button 
        onClick={prevSlide} 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80"
      >
        {'<'}
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80"
      >
        {'>'}
      </button>
      
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

const HobbyModal: React.FC<HobbyModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div 
          className="bg-gradient-to-br from-white to-monet-yellow/30 p-6 rounded-xl comic-border max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="comic-subtitle text-spiderverse-purple">{title}</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-spiderverse-red flex items-center justify-center text-white font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="prose max-w-none">
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HobbyModal;
