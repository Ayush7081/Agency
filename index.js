const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const phrases = [
    'We Make Brands Go Viral 🚀',
    'Elevate Your Brand 🌟',
    'Drive Measurable Results 🔥',
    'Transform Your Digital Presence 💥'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseDelay = 1500;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseDelay);
      }
    } else {
      if (charIndex > 0) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, deleteSpeed);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typeSpeed);
      }
    }
  }

  type();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, footer').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

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

  document.addEventListener('mousedown', (evt) => {
    if (!navMenu.contains(evt.target) && !hamburger.contains(evt.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  hamburger.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      hamburger.click();
    }
  });
}

let lastTiltTime = 0;
const throttleDelay = 16;

document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (evt) => {
    const now = Date.now();
    if (now - lastTiltTime < throttleDelay) return;
    lastTiltTime = now;

    const rect = card.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / centerY * 10;
    const tiltY = (centerX - x) / centerX * 10;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

  card.addEventListener('touchmove', (evt) => {
    evt.preventDefault();
    const touch = evt.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / centerY * 10;
    const tiltY = (centerX - x) / centerX * 10;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('touchend', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    formMessage.textContent = 'Sending message...';
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      formMessage.textContent = 'Message sent successfully!';
      formMessage.style.color = '#26a69a';
      contactForm.reset();
    } catch (err) {
      formMessage.textContent = 'Error sending message. Please try again.';
      formMessage.style.color = '#ff4d4d';
    }
  });
}

const footerText = document.getElementById('footer-text');
if (footerText) {
  footerText.textContent = 'ViralVibe Media';
}
