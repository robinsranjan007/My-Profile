// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===========================
// CAROUSEL
// ===========================
const carouselState = {};

function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const id = carousel.id;
    const track = carousel.querySelector('.carousel-track');
    const imgs = track.querySelectorAll('img');
    const dotsContainer = document.getElementById('dots-' + id);

    carouselState[id] = { index: 0, total: imgs.length };

    imgs.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(id, i));
      dotsContainer.appendChild(dot);
    });
  });
}

function goToSlide(id, index) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector('.carousel-track');
  const dots = document.querySelectorAll('#dots-' + id + ' .dot');
  const state = carouselState[id];

  state.index = (index + state.total) % state.total;
  track.style.transform = `translateX(-${state.index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === state.index));
}

function moveCarousel(id, dir) {
  goToSlide(id, carouselState[id].index + dir);
}

// ===========================
// SCROLL REVEAL
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => {
  s.classList.add('reveal');
  observer.observe(s);
});

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ===========================
// INIT
// ===========================
initCarousels();