import { useState } from 'react'

const rules = {
  fname:   [v => v.length < 2 ? 'Minimum 2 caractères' : ''],
  lname:   [v => v.length < 2 ? 'Minimum 2 caractères' : ''],
  email:   [v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email invalide' : ''],
  subject: [v => v.length < 3 ? 'Minimum 3 caractères' : ''],
  message: [
    v => v.length < 20  ? 'Minimum 20 caractères' : '',
    v => v.length > 500 ? 'Maximum 500 caractères' : ''
  ]
}

export default function ContactForm() {
  const [fields, setFields] = useState({ fname: '', lname: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (name, value) => {
    for (const rule of rules[name]) {
      const msg = rule(value.trim())
      if (msg) return msg
    }
    return ''
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      setErrors(err => ({ ...err, [name]: validate(name, value) }))
    }
  }

  const handleBlur = e => {
    const { name, value } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(err => ({ ...err, [name]: validate(name, value) }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const newErrors = {}
    let valid = true
    Object.keys(fields).forEach(name => {
      const msg = validate(name, fields[name])
      newErrors[name] = msg
      if (msg) valid = false
    })
    setErrors(newErrors)
    setTouched({ fname: true, lname: true, email: true, subject: true, message: true })
    if (!valid) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)
    setFields({ fname: '', lname: '', email: '', subject: '', message: '' })
    setTouched({})
    setTimeout(() => setSuccess(false), 5000)
  }

  const isValid  = name => touched[name] && !errors[name] && fields[name]
  const hasError = name => touched[name] && errors[name]

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form">
      <div className="form-row">
        <div className="field">
          <label htmlFor="fname">Prénom</label>
          <input id="fname" name="fname" type="text" placeholder="Jean"
            value={fields.fname} onChange={handleChange} onBlur={handleBlur}
            className={hasError('fname') ? 'invalid' : isValid('fname') ? 'valid' : ''} />
          {hasError('fname') && <div className="err show">{errors.fname}</div>}
        </div>
        <div className="field">
          <label htmlFor="lname">Nom</label>
          <input id="lname" name="lname" type="text" placeholder="Dupont"
            value={fields.lname} onChange={handleChange} onBlur={handleBlur}
            className={hasError('lname') ? 'invalid' : isValid('lname') ? 'valid' : ''} />
          {hasError('lname') && <div className="err show">{errors.lname}</div>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="jean.dupont@email.com"
          value={fields.email} onChange={handleChange} onBlur={handleBlur}
          className={hasError('email') ? 'invalid' : isValid('email') ? 'valid' : ''} />
        {hasError('email') && <div className="err show">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="subject">Sujet</label>
        <input id="subject" name="subject" type="text" placeholder="Opportunité, collaboration..."
          value={fields.subject} onChange={handleChange} onBlur={handleBlur}
          className={hasError('subject') ? 'invalid' : isValid('subject') ? 'valid' : ''} />
        {hasError('subject') && <div className="err show">{errors.subject}</div>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Décrivez votre projet..."
          value={fields.message} onChange={handleChange} onBlur={handleBlur}
          className={hasError('message') ? 'invalid' : isValid('message') ? 'valid' : ''} />
        <div className="char-count"
          style={{ color: fields.message.length > 480 ? '#e24b4a' : '' }}>
          {fields.message.length} / 500
        </div>
        {hasError('message') && <div className="err show">{errors.message}</div>}
      </div>

      <button type="submit" className={`submit-btn${loading ? ' loading' : ''}`} disabled={loading}>
        {loading ? <span className="spinner"></span> : 'Envoyer le message'}
      </button>

      {success && (
        <div className="success-msg show">
          ✓ Message envoyé ! Je vous répondrai bientôt.
        </div>
      )}
    </form>
  )
}
