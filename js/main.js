// Main JavaScript for Teens 4 Teens Homepage

document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
  initCarousel();
  
  // Initialize chatbot
  initChatbot();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize contact form
  initContactForm();
  
  // World Map Functionality
  const mapPins = document.querySelectorAll('.map-pin');
  
  mapPins.forEach(pin => {
    // Add click event for mobile devices
    pin.addEventListener('click', function() {
      const tooltip = this.querySelector('.pin-tooltip');
      const isVisible = tooltip.style.opacity === '1';
      
      // Hide all tooltips first
      document.querySelectorAll('.pin-tooltip').forEach(t => {
        t.style.opacity = '0';
        t.style.visibility = 'hidden';
      });
      
      // Show clicked tooltip if it wasn't visible
      if (!isVisible) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
      }
    });
    
    // Add keyboard accessibility
    pin.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
    
    // Add focus management
    pin.addEventListener('focus', function() {
      this.setAttribute('tabindex', '0');
    });
  });
  
  // Close tooltips when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.map-pin')) {
      document.querySelectorAll('.pin-tooltip').forEach(tooltip => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    }
  });
  
  // Add smooth entrance animation for pins
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const pinObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'pinEntrance 0.6s ease-out forwards';
        pinObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  mapPins.forEach((pin, index) => {
    pin.style.opacity = '0';
    pin.style.transform = 'scale(0) translateY(20px)';
    pin.style.animationDelay = `${index * 0.1}s`;
    pinObserver.observe(pin);
  });
});

// Carousel functionality
let currentIndex = 0;
let carouselInterval;

function initCarousel() {
  const slides = document.getElementById("slides");
  if (!slides) return;
  
  // Auto-advance carousel every 5 seconds
  carouselInterval = setInterval(nextSlide, 5000);
  
  // Pause auto-advance on hover
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(carouselInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      carouselInterval = setInterval(nextSlide, 5000);
    });
  }
}

function updateCarousel() {
  const slides = document.getElementById("slides");
  if (!slides) return;
  
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  const slides = document.getElementById("slides");
  if (!slides) return;
  
  currentIndex = (currentIndex + 1) % slides.children.length;
  updateCarousel();
}

function prevSlide() {
  const slides = document.getElementById("slides");
  if (!slides) return;
  
  currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
  updateCarousel();
}

// Chatbot functionality
function initChatbot() {
  const chatbot = document.getElementById("chatbot");
  const toggleBtn = document.getElementById("chatbot-toggle");
  
  if (!chatbot || !toggleBtn) return;
  
  toggleBtn.onclick = () => {
    chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
    
    // Focus on input when opened
    if (chatbot.style.display === "flex") {
      setTimeout(() => {
        const input = document.getElementById("user-input");
        if (input) input.focus();
      }, 100);
    }
  };
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const msg = input.value.trim();
  if (!msg) return;

  const messages = document.getElementById("chatbot-messages");
  
  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.innerHTML = `<strong>You:</strong> ${msg}`;
  messages.appendChild(userMsg);

  // Generate bot response
  const botReply = document.createElement("div");
  botReply.className = "bot-message";
  let response = generateBotResponse(msg);
  
  botReply.innerHTML = `<strong>Bot:</strong> ${response}`;
  messages.appendChild(botReply);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

function generateBotResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  // Keyword-based responses
  if (lowerMsg.includes("donate") || lowerMsg.includes("give") || lowerMsg.includes("money")) {
    return "You can donate through our website! Every $1 provides menstrual products that keep a girl healthy, confident, and focused on her future. Click the 'Donate Now' button in the navigation.";
  } 
  else if (lowerMsg.includes("volunteer") || lowerMsg.includes("help") || lowerMsg.includes("join")) {
    return "We'd love your help! You can volunteer with your local chapter or start one at your school. Contact us through the contact form for more information.";
  } 
  else if (lowerMsg.includes("product") || lowerMsg.includes("pad") || lowerMsg.includes("tampon") || lowerMsg.includes("supply")) {
    return "We provide free menstrual products to girls in need worldwide. Our chapters distribute products monthly and provide education. Contact us to learn more about our distribution program.";
  } 
  else if (lowerMsg.includes("school") || lowerMsg.includes("chapter") || lowerMsg.includes("start")) {
    return "We partner with schools to create chapters that distribute products and provide education. Contact us to start a chapter at your school! We'll help you get set up.";
  } 
  else if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach")) {
    return "You can reach us at info@teens4teens.net or use the contact form on this page. We typically respond within 5 business days.";
  }
  else if (lowerMsg.includes("mission") || lowerMsg.includes("purpose") || lowerMsg.includes("goal")) {
    return "Our mission is to ensure no teen has to choose between their health and education. We provide period products and menstrual education to young women worldwide.";
  }
  else if (lowerMsg.includes("statistics") || lowerMsg.includes("impact") || lowerMsg.includes("numbers")) {
    return "We've helped 2.2M teens with hygiene information, have 390 volunteers, partner with 42 schools, and are supported by 32 businesses. Every donation makes a real difference!";
  }
  else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
    return "Hello! I'm here to help you learn more about Teens 4 Teens. How can I assist you today?";
  }
  else {
    return "Thanks for your message! Someone from our team will be in touch soon. In the meantime, feel free to explore our website to learn more about our mission and how you can get involved.";
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
      firstName: formData.get('firstname') || document.getElementById('firstname').value,
      lastName: formData.get('lastname') || document.getElementById('lastname').value,
      email: formData.get('email') || document.getElementById('email').value,
      phone: formData.get('phone') || document.getElementById('phone').value,
      message: formData.get('message') || document.getElementById('message').value
    };
    
    // Validate form
    if (!validateContactForm(data)) {
      return;
    }
    
    // Submit form (mock)
    submitContactForm(data);
  });
}

function validateContactForm(data) {
  let isValid = true;
  
  if (!data.firstName.trim()) {
    showFieldError('firstname', 'First name is required');
    isValid = false;
  }
  
  if (!data.lastName.trim()) {
    showFieldError('lastname', 'Last name is required');
    isValid = false;
  }
  
  if (!data.email.trim()) {
    showFieldError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!data.message.trim()) {
    showFieldError('message', 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  if (!field) return;
  
  // Remove existing error
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error styling
  field.classList.add('error');
  
  // Create error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  
  // Insert after the field
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName);
  if (!field) return;
  
  field.classList.remove('error');
  
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
}

async function submitContactForm(data) {
  try {
    // Show loading state
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showContactSuccess();
    
    // Reset form
    document.querySelector('.contact-form form').reset();
    
  } catch (error) {
    console.error('Contact form error:', error);
    showContactError();
  } finally {
    // Reset button
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    submitBtn.textContent = 'SUBMIT';
    submitBtn.disabled = false;
  }
}

function showContactSuccess() {
  const form = document.querySelector('.contact-form form');
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = 'Thank you for your message! We\'ll get back to you within 5 business days.';
  
  form.insertBefore(successDiv, form.firstChild);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.remove();
    }
  }, 5000);
}

function showContactError() {
  const form = document.querySelector('.contact-form form');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at info@teens4teens.net';
  
  form.insertBefore(errorDiv, form.firstChild);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

// Add CSS for chatbot messages
const chatbotStyle = document.createElement('style');
chatbotStyle.textContent = `
  .user-message {
    background: #E91E63;
    color: white;
    text-align: right;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 8px;
  }
  
  .bot-message {
    background: #f0f0f0;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 8px;
  }
  
  .field-error {
    color: #c62828;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  .form-group input.error {
    border-color: #c62828;
  }
  
  .success-message {
    background: #e8f5e8;
    color: #2e7d32;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  
  @keyframes pinEntrance {
    0% {
      opacity: 0;
      transform: scale(0) translateY(20px);
    }
    50% {
      transform: scale(1.1) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;
document.head.appendChild(chatbotStyle);

// Menstrual Health Quiz - Placeholder function
function openQuiz() {
  // TODO: Implement the interactive menstrual health quiz
  // This will open a modal or navigate to a quiz page
  alert('Menstrual Health Quiz coming soon! This feature will include:\n\n• Interactive questions about menstrual health\n• Myths vs facts section\n• Educational content about puberty\n• Personalized results and recommendations\n\nStay tuned for this educational feature!');
  
  // Future implementation could include:
  // - Modal popup with quiz questions
  // - Progress tracking
  // - Score calculation
  // - Educational feedback
  // - Share results option
} 