/* ===========================
   LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(99,102,241,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(99,102,241,0.5)';
  });
});

/* ===========================
   SCROLL PROGRESS
=========================== */
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

/* ===========================
   NAVBAR
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===========================
   HAMBURGER
=========================== */
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

/* ===========================
   TYPED TEXT
=========================== */
const roles = [
 'Full-Stack Engineer',
  'MERN Stack Developer',
  'Backend Engineer',
  'React Developer',
  'Node.js Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(type, speed);
}

type();

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===========================
   CAROUSEL
=========================== */
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

/* ===========================
   CONTACT FORM
=========================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.style.opacity = '1';
    }, 1000);
  });
}

/* ===========================
   INIT
=========================== */
initCarousels();