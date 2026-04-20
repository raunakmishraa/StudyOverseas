// ============================================================
// Study Overseas — Main JavaScript
// ============================================================

// ---- Navbar scroll behaviour --------------------------------
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ---- Hamburger / mobile menu --------------------------------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Active nav link on scroll ------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

// ---- Hero particles -----------------------------------------
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * -20}s;
      opacity: ${Math.random() * 0.3 + 0.05};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- Counter animation --------------------------------------
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = 16;
  const increments = Math.ceil(duration / step);
  let current = 0;
  const increment = target / increments;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, step);
}

const counters = document.querySelectorAll('.hstat-num');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counters.forEach(c => animateCounter(c));
  }
}
window.addEventListener('scroll', startCounters, { passive: true });
setTimeout(startCounters, 500);

// ---- Intersection Observer for reveal animations ------------
const revealEls = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// ---- Testimonials slider ------------------------------------
// const tslider = document.getElementById('tslider');
// const tDotsContainer = document.getElementById('tDots');
// const tPrev = document.getElementById('tPrev');
// const tNext = document.getElementById('tNext');

// if (tslider) {
//   const cards = tslider.querySelectorAll('.tcard');
//   let visibleCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
//   let currentIndex = 0;
//   const totalSlides = Math.ceil(cards.length / visibleCount);

//   function buildDots() {
//     if (!tDotsContainer) return;
//     tDotsContainer.innerHTML = '';
//     for (let i = 0; i < totalSlides; i++) {
//       const dot = document.createElement('div');
//       dot.className = 'tdot' + (i === 0 ? ' active' : '');
//       dot.addEventListener('click', () => goTo(i));
//       tDotsContainer.appendChild(dot);
//     }
//   }

//   function goTo(index) {
//     currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
//     const cardWidth = cards[0].offsetWidth + 24;
//     tslider.style.transform = `translateX(-${currentIndex * visibleCount * cardWidth}px)`;
//     tDotsContainer.querySelectorAll('.tdot').forEach((d, i) => {
//       d.classList.toggle('active', i === currentIndex);
//     });
//   }

//   tPrev.addEventListener('click', () => goTo(currentIndex - 1));
//   tNext.addEventListener('click', () => goTo(currentIndex + 1));

//   buildDots();

//   // Auto-play
//   let autoPlay = setInterval(() => goTo((currentIndex + 1) % totalSlides), 5000);
//   tslider.addEventListener('mouseenter', () => clearInterval(autoPlay));
//   tslider.addEventListener('mouseleave', () => {
//     autoPlay = setInterval(() => goTo((currentIndex + 1) % totalSlides), 5000);
//   });

//   window.addEventListener('resize', () => {
//     const newVisible = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
//     if (newVisible !== visibleCount) {
//       visibleCount = newVisible;
//       currentIndex = 0;
//       buildDots();
//       goTo(0);
//     }
//   });
// }

// ---- Contact form -------------------------------------------
const contactForm = document.getElementById('contactForm');
const cfSuccess = document.getElementById('cfSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span>';
    setTimeout(() => {
      btn.innerHTML = 'Send My Request <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      btn.disabled = false;
      contactForm.reset();
      cfSuccess.classList.add('show');
      setTimeout(() => cfSuccess.classList.remove('show'), 5000);
    }, 1400);
  });
}

// ---- Back to top --------------------------------------------
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Smooth scroll for all anchor links ---------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
