
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success('Message sent! (This is a demo)', {
      description: 'In a real application, your message would be sent.',
    });
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  
  return (
    <div className="page-container bg-gradient-to-bl from-spiderverse-pink/20 via-monet-blue/20 to-vangogh-teal/20">
      <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto py-20 md:py-28 px-4">
        <h1 className={`comic-title text-spiderverse-pink mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          Get In Touch
        </h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="impressionist-card mb-6 text-left h-full overflow-hidden">
              <h2 className="comic-subtitle text-spiderverse-purple mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div>
                  <div 
                    className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer"
                    onClick={() => copyToClipboard("oceanaviktorial@gmail.com")}
                  >
                    <div className="flex items-center flex-grow">
                      <div className="min-w-10 w-10 h-10 rounded-full bg-spiderverse-blue flex items-center justify-center text-white mr-3">
                        @
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-sm truncate">oceanaviktorial@gmail.com</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-spiderverse-purple whitespace-nowrap ml-2">
                      {copied ? 'Copied!' : 'Click to copy'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div 
                    className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer"
                    onClick={() => copyToClipboard("@oceanaviktoria.nebre")}
                  >
                    <div className="flex items-center flex-grow">
                      <div className="min-w-10 w-10 h-10 rounded-full bg-spiderverse-pink flex items-center justify-center text-white mr-3">
                        #
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-semibold">Social</h3>
                        <p className="text-sm truncate">@oceanaviktoria.nebre</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-spiderverse-purple whitespace-nowrap ml-2">
                      {copied ? 'Copied!' : 'Click to copy'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-monet-purple/30 to-monet-pink/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Looking forward to connecting!</h3>
                  <p>Feel free to reach out for collaborations, questions, or just to say hi!</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="hidden lg:block mt-10">
                <div className="relative h-40">
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-spiderverse-yellow rounded-full opacity-20"></div>
                  <div className="absolute bottom-10 right-20 w-16 h-16 bg-spiderverse-purple rounded-full opacity-20"></div>
                  <div className="absolute bottom-5 right-10 w-10 h-10 bg-spiderverse-blue rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="impressionist-card">
              <h2 className="comic-subtitle text-spiderverse-blue mb-6 text-left">Send a Message</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="block font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-monet-blue/30 rounded-lg focus:border-spiderverse-blue focus:ring-1 focus:ring-spiderverse-blue outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="block font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-monet-blue/30 rounded-lg focus:border-spiderverse-blue focus:ring-1 focus:ring-spiderverse-blue outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <label htmlFor="message" className="block font-medium">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-monet-blue/30 rounded-lg focus:border-spiderverse-blue focus:ring-1 focus:ring-spiderverse-blue outline-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="comic-border bg-spiderverse-pink w-full py-3 text-white font-bold text-lg rounded-lg transform transition-transform hover:scale-105"
                  >
                    Send Message
                  </button>
                  <p className="text-sm mt-2 text-gray-500">
                    (This is a demo form - no actual emails will be sent)
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
