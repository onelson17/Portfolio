// ── HAMBURGER ──
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.toggleAttribute('inert', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('inert', '');
  });
});

// ── NAV ACTIVE STATE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar .nav-links a');

function updateActiveNav() {
  const trigger = window.scrollY + window.innerHeight * 0.35;
  let current = '';
  sections.forEach(s => { if (s.offsetTop <= trigger) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObs.observe(el));

// ── ONGLETS SKILLS ──
document.querySelectorAll('.skills-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.skill;
    document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.skill-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
    });
  });
});

// ── ONGLETS PARCOURS ──
document.querySelectorAll('.exp-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.exp-grid, .lang-grid').forEach(g => g.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById('tab-' + target).classList.remove('hidden');
  });
});

// ── OUVERTURE MODALE PROJETS ──
document.querySelectorAll('.project-card[data-project]').forEach(card => {
  const open = () => document.dispatchEvent(
    new CustomEvent('open-project-modal', { detail: { id: card.dataset.project } })
  );
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

