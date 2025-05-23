// Typing effect for hero headline
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = '';
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      typewriter.textContent += text[i];
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
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
