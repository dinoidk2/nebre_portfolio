
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page routing
  initializeRouting();
  
  // Initialize name animation
  initializeNameAnimation();
  
  // Initialize mobile menu
  initializeMobileMenu();
  
  // Initialize cursor effects
  if (window.innerWidth > 768) {
    initializeCursorEffects();
  }
  
  // Initialize skills
  initializeSkills();
  
  // Initialize hobbies
  initializeHobbies();
  
  // Initialize contact form
  initializeContactForm();
});

// Page Routing
function initializeRouting() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Get all pages
  const pages = document.querySelectorAll('.page');
  
  // Check if there's a hash in the URL
  const hash = window.location.hash || '#home';
  const pageId = hash.substring(1);
  
  // Show the initial page
  showPage(pageId);
  
  // Add click event listeners to all navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const pageId = this.getAttribute('data-page');
      showPage(pageId);
    });
  });
  
  // Listen for hash changes
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash || '#home';
    const pageId = hash.substring(1);
    showPage(pageId);
  });
  
  function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active');
      page.classList.add('hidden');
    });
    
    // Show the selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.remove('hidden');
      activePage.classList.add('active');
      
      // Update active state in navigation
      navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // If page doesn't exist, show home
      document.getElementById('home').classList.remove('hidden');
      document.getElementById('home').classList.add('active');
    }
  }
}

// Name Animation
function initializeNameAnimation() {
  const nameContainer = document.getElementById('name-container');
  const name = 'Oceana Viktoria';
  
  if (!nameContainer) return;
  
  // Clear existing content
  nameContainer.innerHTML = '';
  
  // Add each letter as a span
  for (let i = 0; i < name.length; i++) {
    const letter = document.createElement('span');
    letter.className = 'letter inline-block transform transition-transform duration-300 hover:scale-125 hover:-rotate-6';
    letter.textContent = name[i] === ' ' ? '\u00A0' : name[i];
    nameContainer.appendChild(letter);
  }
  
  // Add random rotation to each letter
  const letters = nameContainer.querySelectorAll('.letter');
  letters.forEach(letter => {
    const rotation = (Math.random() * 12) - 6;
    letter.style.transform = `rotate(${rotation}deg)`;
  });
}

// Mobile Menu
function initializeMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return;
  
  let isMenuOpen = false;
  
  menuButton.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      menuButton.classList.add('rotate-90');
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-95');
    } else {
      menuButton.classList.remove('rotate-90');
      mobileMenu.classList.remove('opacity-95');
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    }
  });
}

// Cursor Effects
function initializeCursorEffects() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorTrailsContainer = document.getElementById('cursor-trails-container');
  const explosionContainer = document.getElementById('explosion-container');
  
  if (!cursorDot || !cursorTrailsContainer || !explosionContainer) return;
  
  const MAX_TRAIL_LENGTH = 20;
  let trailDots = [];
  let nextExplosionId = 0;
  
  const TRAIL_COLORS = [
    'bg-spiderverse-purple', 'bg-spiderverse-blue', 
    'bg-spiderverse-pink', 'bg-spiderverse-yellow',
    'bg-monet-blue', 'bg-monet-purple',
    'bg-monet-green', 'bg-vangogh-yellow',
    'bg-vangogh-orange'
  ];
  
  document.addEventListener('mousemove', function(e) {
    // Update cursor dot position
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    // Create a new trail dot
    const trailDot = document.createElement('div');
    const randomColorClass = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
    trailDot.className = `cursor-trail ${randomColorClass}`;
    trailDot.style.left = `${e.clientX}px`;
    trailDot.style.top = `${e.clientY}px`;
    
    // Add the trail dot to the container
    cursorTrailsContainer.appendChild(trailDot);
    
    // Add to our trail dots array
    trailDots.push(trailDot);
    
    // If we have too many trail dots, remove the oldest one
    if (trailDots.length > MAX_TRAIL_LENGTH) {
      if (trailDots[0].parentNode) {
        trailDots[0].parentNode.removeChild(trailDots[0]);
      }
      trailDots.shift();
    }
    
    // Fade out trail dots based on their position in the array
    trailDots.forEach((dot, index) => {
      const opacity = 1 - (index / MAX_TRAIL_LENGTH);
      const scale = 1 - (index / MAX_TRAIL_LENGTH);
      dot.style.opacity = opacity;
      dot.style.transform = `translate(-50%, -50%) scale(${scale})`;
    });
  });
  
  document.addEventListener('click', function(e) {
    // Create explosion effect
    const explosion = document.createElement('div');
    const randomColorClass = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
    explosion.className = `explosion ${randomColorClass}`;
    explosion.style.left = `${e.clientX}px`;
    explosion.style.top = `${e.clientY}px`;
    explosion.id = `explosion-${nextExplosionId++}`;
    
    // Add the explosion to the container
    explosionContainer.appendChild(explosion);
    
    // Remove the explosion after animation ends
    explosion.addEventListener('animationend', function() {
      if (explosion.parentNode) {
        explosion.parentNode.removeChild(explosion);
      }
    });
  });
}

// Skills Section
function initializeSkills() {
  const skillsContainer = document.getElementById('skills-container');
  
  if (!skillsContainer) return;
  
  // Define skills
  const skills = [
    {
      title: "Digital Art",
      description: "Proficient in drawing and painting, with experience in character design, illustration, and digital storytelling using tools like Clip Studio Paint, Photoshop, and Procreate."
    },
    {
      title: "Web Development",
      description: "Knowledgeable in front-end web development, including HTML, CSS, JavaScript, and React. Able to create responsive, user-friendly websites with a focus on accessibility and smooth user experience."
    },
    {
      title: "UI/UX Design",
      description: "Understanding of design principles that prioritize the user experience, with skills in wireframing, prototyping, and basic user research."
    },
    {
      title: "Project Leadership",
      description: "Experience leading student initiatives, advocating for academic support, organizing events, and working with a team to achieve goals. Known for being detail-oriented, empathetic, and communicative."
    },
    {
      title: "Communication",
      description: "Strong written and verbal communication skills, especially in creating clear and engaging content. Skilled at explaining complex ideas in a simple, understandable way."
    },
    {
      title: "Creative Writing & Storytelling",
      description: "Ability to craft engaging narratives, whether through visual media or written content. Passion for exploring character-driven, emotionally rich stories in manga, literature, and other media."
    },
    {
      title: "Problem Solving",
      description: "Practical, solution-oriented thinker. Adept at finding innovative ways to address challenges in both creative and technical spaces."
    },
    {
      title: "Time Management",
      description: "Able to balance multiple responsibilities effectively, from leadership roles to creative projects, ensuring tasks are completed on time with attention to detail."
    }
  ];
  
  // Create skill items
  skills.forEach((skill, index) => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    skillItem.innerHTML = `
      <div class="skill-header" data-skill-id="${index}">
        <div class="skill-title">${skill.title}</div>
        <div class="skill-toggle">▼</div>
      </div>
      <div class="skill-content" id="skill-content-${index}">
        <p>${skill.description}</p>
      </div>
    `;
    
    skillsContainer.appendChild(skillItem);
  });
  
  // Add event listeners to toggle skill descriptions
  const skillHeaders = document.querySelectorAll('.skill-header');
  skillHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const skillId = this.getAttribute('data-skill-id');
      const content = document.getElementById(`skill-content-${skillId}`);
      const toggle = this.querySelector('.skill-toggle');
      
      // Toggle the content
      content.classList.toggle('open');
      toggle.classList.toggle('open');
      
      // Set explicit height for animation
      if (content.classList.contains('open')) {
        content.style.height = content.scrollHeight + 'px';
      } else {
        content.style.height = '0';
      }
    });
  });
  
  // Open the first skill by default
  if (skillHeaders.length > 0) {
    skillHeaders[0].click();
  }
}

// Hobbies Section
function initializeHobbies() {
  const hobbiesGrid = document.getElementById('hobbies-grid');
  const modalContainer = document.getElementById('modal-container');
  
  if (!hobbiesGrid || !modalContainer) return;
  
  // Define hobbies
  const hobbies = [
    {
      title: "Painting",
      description: "I dabble in gouache, watercolor, and digital painting. It's where I explore color, mood, and silence.",
      color: "bg-monet-blue",
      icon: "🎨",
      details: {
        description: `
          <div class="mb-4">
            <p>I express myself through various painting techniques, including:</p>
            <ul class="list-disc list-inside my-3">
              <li>Gouache painting</li>
              <li>Watercolor</li>
              <li>Digital painting</li>
            </ul>
            <p>Painting allows me to create worlds through color and texture, capturing moods and atmospheres.</p>
          </div>
        `,
        images: [
          { src: "placeholder.svg", caption: "Add your painting here" },
          { src: "placeholder.svg", caption: "Add your painting here" },
          { src: "placeholder.svg", caption: "Add your painting here" }
        ]
      }
    },
    {
      title: "Drawing",
      description: "Drawing allows me to express my ideas and emotions visually. I enjoy creating original characters and illustrations.",
      color: "bg-monet-purple",
      icon: "✏️",
      details: {
        description: `
          <div class="mb-4">
            <p>
              Drawing has always been my primary creative outlet. Through sketches and illustrations, 
              I bring my ideas to life and develop my artistic skills.
            </p>
            <p class="mt-3">
              I enjoy experimenting with different styles and techniques, from detailed portraits 
              to quick character sketches.
            </p>
          </div>
        `,
        images: [
          { src: "placeholder.svg", caption: "Add your drawing here" },
          { src: "placeholder.svg", caption: "Add your drawing here" },
          { src: "placeholder.svg", caption: "Add your drawing here" }
        ]
      }
    },
    {
      title: "Reading",
      description: "Reading offers me comfort, inspiration, and a fresh perspective. I'm especially drawn to stories with emotionally rich characters and thought-provoking themes.",
      color: "bg-vangogh-yellow",
      icon: "📚",
      details: {
        description: `
          <div>
            <p>
              Reading offers me comfort, inspiration, and a fresh perspective. I'm especially drawn to 
              stories with emotionally rich characters and thought-provoking themes.
            </p>
            
            <h3 class="font-bold text-xl mt-4 mb-2">My Favorite Genres</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              ${['Manga', 'Manhwa', 'Manhua', 'Web Novels', 'Novels'].map(genre => 
                `<div class="bg-white/50 p-2 rounded-md text-center">${genre}</div>`
              ).join('')}
            </div>
            
            <h3 class="font-bold text-xl mt-4 mb-2">Favorite Reads</h3>
            <ul class="list-disc list-inside">
              <li>Schoolgirl by Osamu Dazai</li>
              <li>No Longer Human by Osamu Dazai</li>
              <li>Omniscient Reader's Viewpoint</li>
              <li>The Guy She Was Interested in Was Not a Guy At All</li>
            </ul>
          </div>
        `
      }
    },
    {
      title: "Watching",
      description: "I enjoy watching anime, animated series, and shows that are emotionally or visually impactful.",
      color: "bg-vangogh-orange",
      icon: "📺",
      details: {
        description: `
          <div>
            <p>
              I enjoy watching anime, animated series, and shows that are emotionally or visually impactful.
              Visual storytelling through animation allows creators to push boundaries in ways that inspire me.
            </p>
            
            <h3 class="font-bold text-xl mt-4 mb-2">My Favorites</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              ${[
                { title: "Arcane", desc: "Stunning visuals and complex characters" },
                { title: "Haikyuu!!", desc: "Inspiring sports drama" },
                { title: "Alien Stage", desc: "Unique and emotionally resonant" },
              ].map(show => 
                `<div class="bg-white/70 p-4 rounded-lg">
                  <h4 class="font-bold">${show.title}</h4>
                  <p class="text-sm mt-1">${show.desc}</p>
                </div>`
              ).join('')}
            </div>
          </div>
        `
      }
    }
  ];
  
  // Create hobby cards
  hobbies.forEach((hobby, index) => {
    const hobbyCard = document.createElement('div');
    hobbyCard.className = 'transition-all duration-500 opacity-0 translate-y-10';
    hobbyCard.style.transitionDelay = `${100 + index * 100}ms`;
    
    hobbyCard.innerHTML = `
      <div class="impressionist-card hover:shadow-xl cursor-pointer group relative overflow-hidden" data-hobby-index="${index}">
        <div class="absolute top-0 left-0 w-2 h-full ${hobby.color}"></div>
        
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full ${hobby.color} flex items-center justify-center text-2xl mr-4 transform group-hover:rotate-12 transition-transform">
            ${hobby.icon}
          </div>
          <h2 class="text-2xl font-bold">${hobby.title}</h2>
        </div>
        
        <p class="text-left">${hobby.description}</p>
        
        <div class="mt-4 text-spiderverse-purple font-semibold flex items-center group-hover:translate-x-2 transition-transform">
          <span class="mr-2">Learn more</span>
          <span>→</span>
        </div>
      </div>
    `;
    
    hobbiesGrid.appendChild(hobbyCard);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      hobbyCard.classList.remove('opacity-0', 'translate-y-10');
    }, 10);
  });
  
  // Add event listeners to hobby cards
  const hobbyCards = document.querySelectorAll('[data-hobby-index]');
  hobbyCards.forEach(card => {
    card.addEventListener('click', function() {
      const hobbyIndex = parseInt(this.getAttribute('data-hobby-index'));
      const hobby = hobbies[hobbyIndex];
      
      // Create modal content
      let modalContent = `
        <div class="bg-gradient-to-br from-white to-monet-yellow/30 p-6 rounded-xl comic-border max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="comic-subtitle text-spiderverse-purple">${hobby.title}</h2>
            <button 
              id="close-modal-button"
              class="w-8 h-8 rounded-full bg-spiderverse-red flex items-center justify-center text-white font-bold"
            >
              ×
            </button>
          </div>
          
          <div class="prose max-w-none">
            ${hobby.details.description}
          </div>
      `;
      
      // Add image carousel if images exist
      if (hobby.details.images && hobby.details.images.length > 0) {
        modalContent += `
          <div class="relative w-full overflow-hidden rounded-lg comic-border bg-white/80 mb-4">
            <div class="relative h-64 sm:h-80">
              <img 
                src="${hobby.details.images[0].src}" 
                alt="${hobby.details.images[0].caption || 'Gallery image'}" 
                class="w-full h-full object-contain"
                id="carousel-image"
              />
            </div>
            
            <div class="p-3 bg-white/90 text-center" id="carousel-caption">
              <p class="text-sm">${hobby.details.images[0].caption || ''}</p>
            </div>
            
            <button 
              id="carousel-prev"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              &lt;
            </button>
            
            <button 
              id="carousel-next"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              &gt;
            </button>
            
            <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-2" id="carousel-dots">
              ${hobby.details.images.map((_, i) => 
                `<button 
                  class="w-3 h-3 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}" 
                  data-index="${i}"
                ></button>`
              ).join('')}
            </div>
          </div>
        `;
      }
      
      modalContent += `</div>`;
      
      // Show modal
      modalContainer.innerHTML = modalContent;
      modalContainer.classList.remove('hidden');
      
      // Add event listeners for modal controls
      document.getElementById('close-modal-button').addEventListener('click', function() {
        modalContainer.classList.add('hidden');
        modalContainer.innerHTML = '';
      });
      
      // Set up carousel functionality if exists
      if (hobby.details.images && hobby.details.images.length > 0) {
        const carouselImage = document.getElementById('carousel-image');
        const carouselCaption = document.getElementById('carousel-caption');
        const carouselDots = document.querySelectorAll('#carousel-dots button');
        let currentIndex = 0;
        
        document.getElementById('carousel-prev').addEventListener('click', function() {
          currentIndex = (currentIndex - 1 + hobby.details.images.length) % hobby.details.images.length;
          updateCarousel();
        });
        
        document.getElementById('carousel-next').addEventListener('click', function() {
          currentIndex = (currentIndex + 1) % hobby.details.images.length;
          updateCarousel();
        });
        
        carouselDots.forEach(dot => {
          dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
          });
        });
        
        function updateCarousel() {
          const image = hobby.details.images[currentIndex];
          carouselImage.src = image.src;
          carouselImage.alt = image.caption || 'Gallery image';
          carouselCaption.querySelector('p').textContent = image.caption || '';
          
          carouselDots.forEach((dot, i) => {
            if (i === currentIndex) {
              dot.classList.replace('bg-white/50', 'bg-white');
            } else {
              dot.classList.replace('bg-white', 'bg-white/50');
            }
          });
        }
      }
    });
  });
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Simulate form submission
      console.log('Form submitted:', formData);
      
      // Show toast message
      showToast('Message sent! (This is a demo)');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Copy to clipboard functionality
  window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      showToast('Failed to copy to clipboard!');
    });
  };
  
  function showToast(message) {
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
  }
}
