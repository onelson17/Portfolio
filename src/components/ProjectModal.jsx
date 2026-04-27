import { useState, useEffect, useCallback, useRef } from 'react'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const PROJECTS = {
  kasa: {
    title: 'Kasa',
    cover: 'assets/images/Kasa-1.webp',
    coverBg: '#2d1212',
    logos: [
      { name: 'React',        icon: `${DEVICON}/react/react-original.svg` },
      { name: 'React Router', icon: `${DEVICON}/reactrouter/reactrouter-original.svg` },
      { name: 'Sass',         icon: `${DEVICON}/sass/sass-original.svg` }
    ],
    demo:   'https://onelson17.github.io/Kasa/#/',
    github: 'https://github.com/onelson17/Kasa',
    contexte:     "Refonte complète du site Kasa, leader de la location entre particuliers en France, avec migration d'une stack ASP.NET vers React.",
    objectifs:    "Développer une SPA avec React Router, créer des composants réutilisables (carousel, collapse, cards) et alimenter l'interface via un fichier JSON.",
    competences:  "Architecture React, routing dynamique, animations CSS, intégration Figma pixel-perfect, gestion de l'état avec useState et useEffect.",
    resultats:    "Application 100 % responsive avec 20+ logements dynamiques, carousel et accordion entièrement fonctionnels, rendu conforme aux maquettes.",
    perspectives: "Connexion à une API REST, système de filtres avancés et back-end avec authentification utilisateur."
  },
  sophie: {
    title: 'Sophie Bluel',
    cover: 'assets/images/SophieB-1.webp',
    coverBg: '#14141c',
    logos: [
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'HTML5',      icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS3',       icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'Fetch API',  icon: null }
    ],
    demo:   null,
    github: null,
    contexte:     "Création d'une page web dynamique pour Sophie Bluel, architecte d'intérieur, permettant d'afficher et de gérer son portfolio depuis une interface admin.",
    objectifs:    "Manipulation du DOM en JavaScript vanilla, appels à une API REST avec Fetch, modale de login et modale d'ajout de médias.",
    competences:  "Fetch API, gestion des événements, authentification JWT, manipulation DOM avancée, validation de formulaires côté client.",
    resultats:    "Interface dynamique sans rechargement de page, filtres fonctionnels par catégorie, formulaires de login et d'ajout d'œuvres entièrement validés.",
    perspectives: "Refactoring en React, ajout de tests unitaires avec Jest, déploiement avec hébergement du back-end."
  },
  booki: {
    title: 'Booki',
    cover: 'assets/images/Booki-2.webp',
    coverBg: '#0a1528',
    logos: [
      { name: 'HTML5',   icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS3',    icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'Flexbox', icon: null }
    ],
    demo:   'https://onelson17.github.io/onelson17-P3_Re-servation_Logement_HTML_CSS/',
    github: 'https://github.com/onelson17/onelson17-P3_Re-servation_Logement_HTML_CSS',
    contexte:     "Intégration de la maquette d'un site de réservation d'hébergements et d'activités à partir de fichiers Figma fournis.",
    objectifs:    "Intégration pixel-perfect desktop / tablette / mobile depuis la maquette Figma, en respectant les bonnes pratiques HTML et CSS.",
    competences:  "HTML sémantique, Flexbox, media queries, bonnes pratiques CSS, lecture et transposition fidèle de maquette.",
    resultats:    "Site 100 % responsive sur 3 breakpoints (320px / 768px / 1440px), code valide W3C, conforme aux maquettes.",
    perspectives: "Migration vers React, ajout d'un moteur de recherche fonctionnel, intégration d'une vraie API d'hébergements."
  }
}

const SECTIONS = [
  { key: 'contexte',    label: 'Contexte' },
  { key: 'objectifs',   label: 'Objectifs' },
  { key: 'competences', label: 'Compétences développées' },
  { key: 'resultats',   label: 'Résultats' },
  { key: 'perspectives',label: 'Perspectives' }
]

export default function ProjectModal() {
  const [project, setProject] = useState(null)
  const [isOpen,  setIsOpen]  = useState(false)
  const closeRef = useRef(null)

  // Écoute l'événement dispatché depuis main.js
  useEffect(() => {
    const handler = e => {
      const data = PROJECTS[e.detail.id]
      if (!data) return
      setProject(data)
      setIsOpen(true)
    }
    document.addEventListener('open-project-modal', handler)
    return () => document.removeEventListener('open-project-modal', handler)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => setProject(null), 350)
  }, [])

  // Scroll lock + Escape + focus
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  if (!project && !isOpen) return null

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="modal-close" onClick={close} aria-label="Fermer">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {project && (
          <>
            <div className="modal-cover" style={{ background: project.coverBg }}>
              <img src={project.cover} alt={project.title} />
            </div>

            <div className="modal-body">
              <div className="modal-header">
                <h2 id="modal-title">{project.title}</h2>

                <div className="modal-stack">
                  {project.logos.map(l => (
                    <div key={l.name} className="stack-logo">
                      {l.icon && <img src={l.icon} alt={l.name} loading="lazy" />}
                      <span>{l.name}</span>
                    </div>
                  ))}
                </div>

                <div className="modal-actions">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener" className="btn-demo">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="6" cy="6" r="2.2" fill="currentColor"/>
                      </svg>
                      Voir la démo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="btn-gh">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="modal-sections">
                {SECTIONS.map(({ key, label }) => (
                  <div key={key} className="modal-section">
                    <h3>{label}</h3>
                    <p>{project[key]}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
