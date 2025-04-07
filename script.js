
document.addEventListener('DOMContentLoaded', function() {
  // Initialize loading portal
  initializeLoadingPortal();
  
  // Initialize mobile menu
  initializeMobileMenu();
  
  // Initialize cursor effects
  if (window.innerWidth > 768) {
    initializeCursorEffects();
  }
  
  // Initialize name animation
  addRandomRotation();
  
  // Initialize skill toggles
  initializeSkillToggles();
  
  // Initialize hobby modals
  initializeHobbyModals();

  // Initialize interactive cards
  initializeInteractiveCards();

  // Ensure images load correctly
  fixImagePaths();
});

// Initialize loading portal
function initializeLoadingPortal() {
  setTimeout(function() {
    const loadingPortal = document.getElementById('loading-portal');
    if (loadingPortal) {
      loadingPortal.classList.add('hidden');
      
      // Remove loading portal after animation completes
      setTimeout(function() {
        loadingPortal.style.display = 'none';
      }, 500);
    }
  }, 2000);
}

// Fix image paths
function fixImagePaths() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.src.includes('lovable-uploads') && !img.src.includes('http')) {
      // If it's a relative path, make sure it's correct
      if (img.src.startsWith('/')) {
        img.src = img.src.substring(1); // Remove leading slash if it exists
      }
    }
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

// Add random rotation to name letters
function addRandomRotation() {
  const nameContainer = document.getElementById('name-container');
  
  if (!nameContainer) return;
  
  const letters = nameContainer.querySelectorAll('.letter');
  
  letters.forEach(letter => {
    const rotation = (Math.random() * 12) - 6;
    letter.style.transform = `rotate(${rotation}deg)`;
    
    // Add hover effect
    letter.addEventListener('mouseenter', () => {
      letter.style.transform = 'scale(1.25) rotate(-6deg)';
    });
    
    letter.addEventListener('mouseleave', () => {
      letter.style.transform = `rotate(${rotation}deg)`;
    });
  });
}

// Initialize skill toggles
function initializeSkillToggles() {
  const skillHeaders = document.querySelectorAll('.skill-header');
  
  skillHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const skillId = this.getAttribute('data-skill-id');
      const content = document.getElementById(`skill-content-${skillId}`);
      const toggle = this.querySelector('.skill-toggle');
      
      // Toggle the content
      content.classList.toggle('open');
      toggle.classList.toggle('open');
      
      // Update the toggle icon
      if (content.classList.contains('open')) {
        toggle.textContent = '×'; // Multiplication sign as close button
      } else {
        toggle.textContent = '+'; // Plus sign as open button
      }
    });
  });
}

// Initialize interactive cards
function initializeInteractiveCards() {
  // For about-me cards with modals
  const aboutMeCards = document.querySelectorAll('.about-me-card');
  
  aboutMeCards.forEach(card => {
    card.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      if (modalId) openModal(modalId);
    });
  });
  
  // For traditional flip cards
  const flipCards = document.querySelectorAll('.interactive-card');
  
  flipCards.forEach(card => {
    // For click events
    card.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('flipped');
    });
    
    // For touch events on mobile
    card.addEventListener('touchstart', function(e) {
      // Prevent scrolling when touching the card
      e.preventDefault();
    }, { passive: false });
    
    card.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('flipped');
    }, { passive: false });
  });
}

// Initialize hobby modals
function initializeHobbyModals() {
  // Setup modal interactions for different pages
}

// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
    
    // Update the copy text elements
    if (text.includes('@gmail.com')) {
      document.getElementById('email-copy-text').textContent = 'Copied!';
      setTimeout(() => {
        document.getElementById('email-copy-text').textContent = 'Click to copy';
      }, 2000);
    } else if (text.includes('@oceanaviktoria')) {
      document.getElementById('social-copy-text').textContent = 'Copied!';
      setTimeout(() => {
        document.getElementById('social-copy-text').textContent = 'Click to copy';
      }, 2000);
    }
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (!toast || !toastMessage) return;
  
  toastMessage.textContent = message;
  
  // Show the toast
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  
  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Log the form data (in a real application, this would be sent to a server)
  console.log('Form submitted:', { name, email, message });
  
  // Show success message
  showToast('Message sent! (This is a demo)');
  
  // Reset form
  event.target.reset();
}
