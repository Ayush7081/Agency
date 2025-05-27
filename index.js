// Changing text effect for hero headline
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
      // Typing
      if (charIndex < currentPhrase.length) {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Pause before deleting
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, deletingSpeed);
      } else {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      }
    }
  }

  // Start typing effect
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
});

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Reveal animations
const style = document.createElement('style');
style.innerHTML = `
  .hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
