
import React, { useState, useEffect } from 'react';
import HobbyModal, { ImageCarousel } from '@/components/HobbyModal';

interface Hobby {
  title: string;
  description: string;
  color: string;
  icon: string;
}

const hobbies: Hobby[] = [
  {
    title: "Painting",
    description: "I dabble in gouache, watercolor, and digital painting. It's where I explore color, mood, and silence.",
    color: "bg-monet-blue",
    icon: "🎨"
  },
  {
    title: "Drawing",
    description: "Drawing allows me to express my ideas and emotions visually. I enjoy creating original characters and illustrations.",
    color: "bg-monet-purple",
    icon: "✏️"
  },
  {
    title: "Reading",
    description: "Reading offers me comfort, inspiration, and a fresh perspective. I'm especially drawn to stories with emotionally rich characters and thought-provoking themes.",
    color: "bg-vangogh-yellow",
    icon: "📚"
  },
  {
    title: "Watching",
    description: "I enjoy watching anime, animated series, and shows that are emotionally or visually impactful.",
    color: "bg-vangogh-orange",
    icon: "📺"
  }
];

// Placeholder arrays for the image carousels
// These will be replaced with actual images by the user
const paintingImages = [
  { src: "/placeholder.svg", caption: "Add your painting here" },
  { src: "/placeholder.svg", caption: "Add your painting here" },
  { src: "/placeholder.svg", caption: "Add your painting here" }
];

const drawingImages = [
  { src: "/placeholder.svg", caption: "Add your drawing here" },
  { src: "/placeholder.svg", caption: "Add your drawing here" },
  { src: "/placeholder.svg", caption: "Add your drawing here" }
];

const Hobbies: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="page-container bg-gradient-to-tr from-monet-green/20 via-vangogh-yellow/20 to-monet-blue/20">
      <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto py-20 md:py-28 px-4">
        <h1 className={`comic-title text-spiderverse-yellow mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          My Hobbies
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hobbies.map((hobby, index) => (
              <div 
                key={hobby.title}
                className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                <div 
                  className={`impressionist-card border-l-4 border-spiderverse-${hobby.title === "Painting" || hobby.title === "Drawing" ? "pink" : "yellow"} hover:shadow-xl cursor-pointer group relative overflow-hidden`}
                  onClick={() => setActiveHobby(hobby.title)}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full ${hobby.color}`}></div>
                  
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${hobby.color} flex items-center justify-center text-2xl mr-4 transform group-hover:rotate-12 transition-transform`}>
                      {hobby.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{hobby.title}</h2>
                  </div>
                  
                  <p className="text-left">{hobby.description}</p>
                  
                  <div className="mt-4 text-spiderverse-purple font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                    <span className="mr-2">Learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hobby Modals */}
        <HobbyModal 
          open={activeHobby === "Painting"} 
          onClose={() => setActiveHobby(null)}
          title="Painting"
        >
          <div className="mb-4">
            <p>I express myself through various painting techniques, including:</p>
            <ul className="list-disc list-inside my-3">
              <li>Gouache painting</li>
              <li>Watercolor</li>
              <li>Digital painting</li>
            </ul>
            <p>Painting allows me to create worlds through color and texture, capturing moods and atmospheres.</p>
          </div>
          
          <ImageCarousel images={paintingImages} />
        </HobbyModal>
        
        <HobbyModal 
          open={activeHobby === "Drawing"} 
          onClose={() => setActiveHobby(null)}
          title="Drawing"
        >
          <div className="mb-4">
            <p>
              Drawing has always been my primary creative outlet. Through sketches and illustrations, 
              I bring my ideas to life and develop my artistic skills.
            </p>
            <p className="mt-3">
              I enjoy experimenting with different styles and techniques, from detailed portraits 
              to quick character sketches.
            </p>
          </div>
          
          <ImageCarousel images={drawingImages} />
        </HobbyModal>
        
        <HobbyModal 
          open={activeHobby === "Reading"} 
          onClose={() => setActiveHobby(null)}
          title="Reading"
        >
          <div>
            <p>
              Reading offers me comfort, inspiration, and a fresh perspective. I'm especially drawn to 
              stories with emotionally rich characters and thought-provoking themes.
            </p>
            
            <h3 className="font-bold text-xl mt-4 mb-2">Genres I Enjoy</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                'Psychological Fiction', 
                'Existential Fiction', 
                'Philosophical Fiction', 
                'Drama', 
                'Romance', 
                'Fantasy / Supernatural',
                'Slice of Life',
                'Coming-of-Age',
                'Psychological Drama',
                'Philosophical Sci-Fi / Speculative Fiction'
              ].map((genre) => (
                <div key={genre} className="bg-white/50 px-3 py-1 rounded-full text-sm">
                  {genre}
                </div>
              ))}
            </div>
            
            <h3 className="font-bold text-xl mt-4 mb-2">Favorite Reads</h3>
            <ul className="list-disc list-inside">
              <li>Schoolgirl by Osamu Dazai</li>
              <li>No Longer Human by Osamu Dazai</li>
              <li>Omniscient Reader's Viewpoint</li>
              <li>The Guy She Was Interested in Was Not a Guy At All</li>
            </ul>
          </div>
        </HobbyModal>
        
        <HobbyModal 
          open={activeHobby === "Watching"} 
          onClose={() => setActiveHobby(null)}
          title="Watching"
        >
          <div>
            <p>
              I enjoy watching anime, animated series, and shows that are emotionally or visually impactful.
              Visual storytelling through animation allows creators to push boundaries in ways that inspire me.
            </p>
            
            <h3 className="font-bold text-xl mt-4 mb-2">My Favorites</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              {[
                { title: "Arcane", desc: "Stunning visuals and complex characters" },
                { title: "Haikyuu!!", desc: "Inspiring sports drama" },
                { title: "Alien Stage", desc: "Unique and emotionally resonant" },
              ].map((show) => (
                <div key={show.title} className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-bold">{show.title}</h4>
                  <p className="text-sm mt-1">{show.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </HobbyModal>
      </div>
    </div>
  );
};

export default Hobbies;
