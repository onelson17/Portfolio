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

// ── MODALES PROJETS ──
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const PROJECT_DATA = {
  kasa: {
    title: 'Kasa',
    cover: 'assets/images/Kasa-1.png',
    coverBg: '#2d1212',
    logos: [
      { name: 'React',        icon: `${DEVICON}/react/react-original.svg` },
      { name: 'React Router', icon: `${DEVICON}/reactrouter/reactrouter-original.svg` },
      { name: 'Sass',         icon: `${DEVICON}/sass/sass-original.svg` }
    ],
    demo:   'https://onelson17.github.io/Kasa/#/',
    github: 'https://github.com/onelson17/Kasa',
    contexte:    "Refonte complète du site Kasa, leader de la location entre particuliers en France, avec migration d'une stack ASP.NET vers React.",
    objectifs:   "Développer une SPA avec React Router, créer des composants réutilisables (carousel, collapse, cards) et alimenter l'interface via un fichier JSON.",
    competences: "Architecture React, routing dynamique, animations CSS, intégration Figma pixel-perfect, gestion de l'état avec useState et useEffect.",
    resultats:   "Application 100 % responsive avec 20+ logements dynamiques, carousel et accordion entièrement fonctionnels, rendu conforme aux maquettes.",
    perspectives:"Connexion à une API REST, système de filtres avancés et back-end avec authentification utilisateur."
  },
  sophie: {
    title: 'Sophie Bluel',
    cover: 'assets/images/SophieB-1.png',
    coverBg: '#14141c',
    logos: [
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'HTML5',      icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS3',       icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'Fetch API',  icon: null }
    ],
    demo:   null,
    github: null,
    contexte:    "Création d'une page web dynamique pour Sophie Bluel, architecte d'intérieur, permettant d'afficher et de gérer son portfolio depuis une interface admin.",
    objectifs:   "Manipulation du DOM en JavaScript vanilla, appels à une API REST avec Fetch, modale de login et modale d'ajout de médias.",
    competences: "Fetch API, gestion des événements, authentification JWT, manipulation DOM avancée, validation de formulaires côté client.",
    resultats:   "Interface dynamique sans rechargement de page, filtres fonctionnels par catégorie, formulaires de login et d'ajout d'œuvres entièrement validés.",
    perspectives:"Refactoring en React, ajout de tests unitaires avec Jest, déploiement avec hébergement du back-end."
  },
  booki: {
    title: 'Booki',
    cover: 'assets/images/Booki-2.png',
    coverBg: '#0a1528',
    logos: [
      { name: 'HTML5',   icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS3',    icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'Flexbox', icon: null }
    ],
    demo:   'https://onelson17.github.io/onelson17-P3_Re-servation_Logement_HTML_CSS/',
    github: 'https://github.com/onelson17/onelson17-P3_Re-servation_Logement_HTML_CSS',
    contexte:    "Intégration de la maquette d'un site de réservation d'hébergements et d'activités à partir de fichiers Figma fournis.",
    objectifs:   "Intégration pixel-perfect desktop / tablette / mobile depuis la maquette Figma, en respectant les bonnes pratiques HTML et CSS.",
    competences: "HTML sémantique, Flexbox, media queries, bonnes pratiques CSS, lecture et transposition fidèle de maquette.",
    resultats:   "Site 100 % responsive sur 3 breakpoints (320px / 768px / 1440px), code valide W3C, conforme aux maquettes.",
    perspectives:"Migration vers React, ajout d'un moteur de recherche fonctionnel, intégration d'une vraie API d'hébergements."
  }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalEl = modalOverlay.querySelector('.modal');

function openModal(id) {
  const data = PROJECT_DATA[id];
  if (!data) return;

  const coverEl = document.querySelector('.modal-cover');
  coverEl.style.background = data.coverBg || '#0d0c08';

  const coverImg = document.getElementById('modal-cover-img');
  coverImg.src = data.cover;
  coverImg.alt = data.title;

  document.getElementById('modal-title').textContent = data.title;

  document.getElementById('modal-stack-logos').innerHTML = data.logos.map(l =>
    `<div class="stack-logo">
      ${l.icon ? `<img src="${l.icon}" alt="${l.name}" loading="lazy" />` : ''}
      <span>${l.name}</span>
    </div>`
  ).join('');

  let actionsHTML = '';
  if (data.demo) {
    actionsHTML += `<a href="${data.demo}" target="_blank" rel="noopener" class="btn-demo">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="6" r="2.2" fill="currentColor"/></svg>
      Voir la démo
    </a>`;
  }
  if (data.github) {
    actionsHTML += `<a href="${data.github}" target="_blank" rel="noopener" class="btn-gh">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      GitHub
    </a>`;
  }
  document.getElementById('modal-actions').innerHTML = actionsHTML;

  document.getElementById('modal-contexte').textContent    = data.contexte;
  document.getElementById('modal-objectifs').textContent   = data.objectifs;
  document.getElementById('modal-competences').textContent = data.competences;
  document.getElementById('modal-resultats').textContent   = data.resultats;
  document.getElementById('modal-perspectives').textContent= data.perspectives;

  modalOverlay.classList.add('open');
  modalOverlay.removeAttribute('inert');
  document.body.style.overflow = 'hidden';
  modalEl.querySelector('.modal-body').scrollTop = 0;
  modalEl.querySelector('.modal-close').focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('inert', '');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.project); }
  });
});

