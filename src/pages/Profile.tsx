
import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InfoCard: React.FC<{ title: string; content: string | React.ReactNode; icon: string; color: string }> = ({ title, content, icon, color }) => {
  return (
    <div className={`impressionist-card border-l-4 ${color} mb-4 hover:-rotate-1`}>
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full ${color.replace('border', 'bg')} flex items-center justify-center text-white mr-3`}>
          {icon}
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
      <div className="relative">
        {/* Add colored gradient border matching the Spiderverse style */}
        <div className="absolute inset-y-0 left-0 w-1">
          <div className={`absolute inset-0 ${
            color.includes('pink') ? 'bg-gradient-to-b from-spiderverse-pink via-pink-400 to-spiderverse-purple' : 
            color.includes('yellow') ? 'bg-gradient-to-b from-spiderverse-yellow via-amber-400 to-vangogh-orange' :
            'bg-gradient-to-b from-spiderverse-blue via-blue-400 to-spiderverse-purple'
          }`}></div>
        </div>
        
        {typeof content === 'string' ? (
          <p className="text-left">{content}</p>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

const SkillItem: React.FC<{ name: string; percentage: number; color: string }> = ({ name, percentage, color }) => {
  return (
    <div className="mb-3">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div className={`${color} h-2.5 rounded-full`} style={{width: `${percentage}%`}}></div>
      </div>
      <div className="flex justify-between text-xs">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Add JS for skill toggles
    const handleSkillToggle = (skillName: string) => {
      setExpandedSkill(prevSkill => prevSkill === skillName ? null : skillName);
    };

    // Expose the toggle function to window for direct JS access
    (window as any).handleSkillToggle = handleSkillToggle;
    
    return () => {
      delete (window as any).handleSkillToggle;
    };
  }, []);

  const skillsInfo = {
    "Digital Art": "Proficient in drawing and painting, with experience in character design, illustration, and digital storytelling using tools like Clip Studio Paint, Photoshop, and Procreate.",
    "Web Development": "Knowledgeable in front-end web development, including HTML, CSS, JavaScript, and React. Able to create responsive, user-friendly websites with a focus on accessibility and smooth user experience.",
    "UI/UX Design": "Understanding of design principles that prioritize the user experience, with skills in wireframing, prototyping, and basic user research.",
    "Project Leadership": "Experience leading student initiatives, advocating for academic support, organizing events, and working with a team to achieve goals. Known for being detail-oriented, empathetic, and communicative.",
    "Communication": "Strong written and verbal communication skills, especially in creating clear and engaging content. Skilled at explaining complex ideas in a simple, understandable way.",
    "Creative Writing & Storytelling": "Ability to craft engaging narratives, whether through visual media or written content. Passion for exploring character-driven, emotionally rich stories in manga, literature, and other media.",
    "Problem Solving": "Practical, solution-oriented thinker. Adept at finding innovative ways to address challenges in both creative and technical spaces.",
    "Time Management": "Able to balance multiple responsibilities effectively, from leadership roles to creative projects, ensuring tasks are completed on time with attention to detail."
  };
  
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
            <div className="relative mb-6 mx-auto text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-vangogh-yellow via-vangogh-orange to-vangogh-teal rounded-lg blur-lg animate-pulse-light transform scale-105"></div>
              <img 
                src="/lovable-uploads/e19a45aa-9e40-412c-bb19-55d218ffbbe0.png" 
                alt="Oceana Viktoria" 
                className="w-full max-w-md h-auto object-cover object-center rounded-lg comic-border relative z-10 mx-auto"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-spiderverse-blue comic-border p-2 rounded-full z-20 transform rotate-12 flex items-center justify-center text-white font-bold">
                15
              </div>
            </div>
            
            <div className="impressionist-card w-full max-w-lg mx-auto mb-6 text-left">
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
                  {['SEVENTEEN', 'Cup Of Joe', 'My Bloody Valentine', 'Paramore'].map((artist, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-3 transform transition-transform hover:scale-105 hover:shadow-md">
                      <p className="font-medium">{artist}</p>
                    </div>
                  ))}
                </div>
              }
            />

            {/* Interactive Cards Section - Changed to Dialog/Popover for popups */}
            <InfoCard 
              title="More About Me" 
              icon="💡" 
              color="border-spiderverse-blue"
              content={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform duration-200">
                        <span className="text-3xl mb-2">🧠</span>
                        <h3 className="font-bold text-lg">MBTI</h3>
                        <div className="mt-2 text-spiderverse-purple">
                          <span className="text-xs">Click to open</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-md">
                      <DialogHeader>
                        <DialogTitle>INFP</DialogTitle>
                      </DialogHeader>
                      <div className="mt-2">
                        <p>As an INFP, I'm introspective, creative, and empathetic. I value authenticity and often look for the deeper meaning in experiences.</p>
                        <p className="mt-2">Traits: Creative, empathetic, idealistic, curious, and thoughtful.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform duration-200">
                        <span className="text-3xl mb-2">🎮</span>
                        <h3 className="font-bold text-lg">Favorite Game</h3>
                        <div className="mt-2 text-spiderverse-purple">
                          <span className="text-xs">Click to open</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-md">
                      <DialogHeader>
                        <DialogTitle>OMORI</DialogTitle>
                      </DialogHeader>
                      <div className="mt-2">
                        <p>A psychological horror RPG that explores themes of anxiety, depression, and friendship through a surreal, dreamlike world.</p>
                        <p className="mt-2">I appreciate how it uses unique art and storytelling to explore complex emotions.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transition-transform duration-200">
                        <span className="text-3xl mb-2">✨</span>
                        <h3 className="font-bold text-lg">Things I Value</h3>
                        <div className="mt-2 text-spiderverse-purple">
                          <span className="text-xs">Click to open</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 backdrop-blur-md">
                      <DialogHeader>
                        <DialogTitle>Things I Value</DialogTitle>
                      </DialogHeader>
                      <div className="mt-2">
                        <ul className="list-disc list-inside">
                          <li><span className="font-bold">Authenticity</span> - Being true to oneself</li>
                          <li><span className="font-bold">Creativity</span> - Finding new perspectives</li>
                          <li><span className="font-bold">Personal Growth</span> - Continuous learning</li>
                          <li><span className="font-bold">Empathy</span> - Understanding others</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
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
            
            <div className="grid grid-cols-1 gap-4">
              <InfoCard 
                title="Skills" 
                icon="✦" 
                color="border-spiderverse-blue"
                content={
                  <div className="mt-2 space-y-2">
                    <SkillItem name="Digital Art" percentage={90} color="bg-spiderverse-blue" />
                    <SkillItem name="Web Development" percentage={80} color="bg-spiderverse-purple" />
                    <SkillItem name="Leadership" percentage={85} color="bg-spiderverse-pink" />
                    
                    <div className="mt-6 skill-details">
                      {Object.entries(skillsInfo).map(([skill, description], index) => (
                        <div key={index} className="mb-3 skill-item">
                          <button
                            onClick={() => setExpandedSkill(expandedSkill === skill ? null : skill)}
                            className="font-bold text-left w-full flex justify-between items-center py-2 hover:bg-white/30 px-2 rounded-md transition-all duration-200"
                            data-skill-name={skill}
                          >
                            <span>{skill}</span>
                            <span className="skill-toggle-icon text-lg transition-transform duration-300" style={{
                              transform: expandedSkill === skill ? 'rotate(45deg)' : 'rotate(0deg)'
                            }}>
                              {expandedSkill === skill ? '×' : '+'}
                            </span>
                          </button>
                          <div 
                            className="skill-description overflow-hidden transition-all duration-300" 
                            style={{ 
                              maxHeight: expandedSkill === skill ? '500px' : '0', 
                              opacity: expandedSkill === skill ? 1 : 0,
                              padding: expandedSkill === skill ? '8px' : '0',
                              marginTop: expandedSkill === skill ? '8px' : '0'
                            }}
                          >
                            <p className="text-sm text-gray-700 p-2 bg-white/20 rounded-md">{description}</p>
                          </div>
                        </div>
                      ))}
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
