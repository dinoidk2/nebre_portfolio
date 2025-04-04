
import React, { useState, useEffect } from 'react';

const InfoCard: React.FC<{ title: string; content: string | React.ReactNode; icon: string; color: string }> = ({ title, content, icon, color }) => {
  return (
    <div className={`impressionist-card border-l-4 ${color} mb-4 hover:-rotate-1`}>
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full ${color.replace('border', 'bg')} flex items-center justify-center text-white mr-3`}>
          {icon}
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      {typeof content === 'string' ? (
        <p className="text-left">{content}</p>
      ) : (
        content
      )}
    </div>
  );
};

const Profile: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="page-container bg-gradient-to-bl from-monet-yellow/30 via-vangogh-teal/30 to-monet-purple/20">
      <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto py-20 md:py-28 px-4">
        <h1 className={`comic-title text-spiderverse-blue mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          My Profile
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Profile Image and Basic Info */}
          <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 bg-gradient-to-tr from-vangogh-yellow via-vangogh-orange to-vangogh-teal rounded-lg blur-lg animate-pulse-light transform scale-105"></div>
              <img 
                src="/lovable-uploads/e19a45aa-9e40-412c-bb19-55d218ffbbe0.png" 
                alt="Oceana Viktoria" 
                className="w-full max-w-md h-auto object-cover object-center rounded-lg comic-border relative z-10"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-spiderverse-blue comic-border p-2 rounded-full z-20 transform rotate-12 flex items-center justify-center text-white font-bold">
                15
              </div>
            </div>
            
            <div className="impressionist-card max-w-md mx-auto mb-6 text-left">
              <h2 className="font-bold text-2xl mb-2">Oceana Viktoria S. Nebre</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-spiderverse-purple">Age</h3>
                  <p>15</p>
                </div>
                <div>
                  <h3 className="font-bold text-spiderverse-purple">Occupation</h3>
                  <p>Student/Digital Artist/Web Developer</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-bold text-spiderverse-purple">Education</h3>
                  <p>San Beda College Alabang</p>
                </div>
              </div>
            </div>
            
            <InfoCard 
              title="Favorite Artists" 
              icon="♫" 
              color="border-spiderverse-pink"
              content={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  {['SEVENTEEN', 'Cup Of Joe', 'My Bloody Valentine'].map((artist, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-3 transform transition-transform hover:scale-105 hover:shadow-md">
                      <p className="font-medium">{artist}</p>
                    </div>
                  ))}
                </div>
              }
            />
          </div>
          
          {/* About Me Section */}
          <div className={`transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="impressionist-card mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-monet-purple via-monet-blue to-monet-green"></div>
              
              <h2 className="comic-subtitle text-spiderverse-purple mb-4 text-left">About Me</h2>
              
              <div className="prose prose-lg max-w-none text-left">
                <p className="mb-4">
                  I'm a student leader focused on practical solutions, creative thinking, and student well-being. 
                  I'm passionate about improving academic systems, creating meaningful initiatives, and building 
                  spaces where people feel supported and heard.
                </p>
                <p className="mb-4">
                  Outside of leadership, I'm deeply engaged in the arts. Drawing is my primary creative outlet, 
                  and I also enjoy painting, reading manga, manhwa, manhua, novels, and binge watching tv series 
                  and animated shows.
                </p>
                <p>
                  Art plays a central role in how I understand and engage with the world.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                title="Skills" 
                icon="✦" 
                color="border-spiderverse-blue"
                content={
                  <div className="mt-2 space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-spiderverse-blue h-2.5 rounded-full" style={{width: '90%'}}></div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Digital Art</span>
                        <span>90%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-spiderverse-purple h-2.5 rounded-full" style={{width: '85%'}}></div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Leadership</span>
                        <span>85%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-spiderverse-pink h-2.5 rounded-full" style={{width: '80%'}}></div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Web Development</span>
                        <span>80%</span>
                      </div>
                    </div>
                  </div>
                }
              />
              
              <InfoCard 
                title="Interests" 
                icon="★" 
                color="border-spiderverse-yellow"
                content={
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      'Art', 'Web Design', 'Reading', 'Anime', 'Leadership', 
                      'Creative Solutions', 'Student Advocacy'
                    ].map((interest, index) => (
                      <span 
                        key={index} 
                        className="bg-white/50 px-3 py-1 rounded-full text-sm transform transition-transform hover:scale-105"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
