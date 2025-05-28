// Typewriter effect for hero headline
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const phrases = [
    'We Make Brands Go Viral 🚀',
    'Skyrocketing Your Reach 🌟',
    'Ignite Your Digital Success 🔥',
    'Transform Clicks to Conversions 💥'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1500;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, deletingSpeed);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      }
    }
  }

  type();
}

// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Accessibility: Handle keyboard navigation
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    formMessage.textContent = 'Sending message...';

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      formMessage.textContent = 'Message sent successfully!';
      formMessage.style.color = '#00fff7';
      contactForm.reset();
    } catch (error) {
      formMessage.textContent = 'Error sending message. Please try again.';
      formMessage.style.color = '#ff4d4d';
    }
  });
}
