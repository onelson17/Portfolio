import React from 'react'
import ReactDOM from 'react-dom/client'
import ContactForm from './ContactForm'

const root = document.getElementById('contact-root')
if (root) {
  ReactDOM.createRoot(root).render(<ContactForm />)
}
