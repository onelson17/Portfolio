import React from 'react'
import ReactDOM from 'react-dom/client'
import ContactForm from './components/ContactForm'
import ProjectModal from './components/ProjectModal'

const contactRoot = document.getElementById('contact-root')
if (contactRoot) ReactDOM.createRoot(contactRoot).render(<ContactForm />)

const modalRoot = document.getElementById('project-modal-root')
if (modalRoot) ReactDOM.createRoot(modalRoot).render(<ProjectModal />)
