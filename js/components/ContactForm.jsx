const { useState } = React;

const RULES = {
  fname:   [v => v.length < 2   ? 'Minimum 2 caractères'   : ''],
  lname:   [v => v.length < 2   ? 'Minimum 2 caractères'   : ''],
  email:   [v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email invalide' : ''],
  subject: [v => v.length < 3   ? 'Minimum 3 caractères'   : ''],
  message: [
    v => v.length < 20  ? 'Minimum 20 caractères'  : '',
    v => v.length > 500 ? 'Maximum 500 caractères' : ''
  ]
};

function getError(field, value) {
  for (const rule of RULES[field]) {
    const msg = rule(value.trim());
    if (msg) return msg;
  }
  return '';
}

function Field({ label, id, type = 'text', value, error, touched, onChange, onBlur, placeholder }) {
  const cls = touched ? (error ? 'invalid' : 'valid') : '';
  return (
    <div className="field">
      <label htmlFor={`c-${id}`}>{label}</label>
      <input
        type={type}
        id={`c-${id}`}
        className={cls}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
      />
      <div className={`err${touched && error ? ' show' : ''}`}>{error}</div>
    </div>
  );
}

function ContactForm() {
  const empty = { fname: '', lname: '', email: '', subject: '', message: '' };
  const [values,  setValues]  = useState(empty);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (field, value) => {
    setValues(v => ({ ...v, [field]: value }));
    if (touched[field]) setErrors(e => ({ ...e, [field]: getError(field, value) }));
  };

  const blur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(e => ({ ...e, [field]: getError(field, values[field]) }));
  };

  const submit = () => {
    const allTouched = Object.keys(RULES).reduce((a, k) => ({ ...a, [k]: true }), {});
    const newErrors  = Object.keys(RULES).reduce((a, k) => ({ ...a, [k]: getError(k, values[k]) }), {});
    setTouched(allTouched);
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setValues(empty);
      setErrors({});
      setTouched({});
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-form">
      <div className="form-row">
        <Field label="Prénom"  id="fname"   value={values.fname}   error={errors.fname}   touched={touched.fname}
          onChange={v => change('fname', v)}   onBlur={() => blur('fname')}   placeholder="Jean" />
        <Field label="Nom"     id="lname"   value={values.lname}   error={errors.lname}   touched={touched.lname}
          onChange={v => change('lname', v)}   onBlur={() => blur('lname')}   placeholder="Dupont" />
      </div>

      <Field label="Email"  id="email"   type="email" value={values.email}   error={errors.email}   touched={touched.email}
        onChange={v => change('email', v)}   onBlur={() => blur('email')}   placeholder="jean.dupont@email.com" />

      <Field label="Sujet"  id="subject" value={values.subject} error={errors.subject} touched={touched.subject}
        onChange={v => change('subject', v)} onBlur={() => blur('subject')} placeholder="Opportunité, collaboration..." />

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          className={touched.message ? (errors.message ? 'invalid' : 'valid') : ''}
          value={values.message}
          placeholder="Décrivez votre projet..."
          onChange={e => change('message', e.target.value)}
          onBlur={() => blur('message')}
        />
        <div className="char-count" style={{ color: values.message.length > 480 ? '#e24b4a' : '' }}>
          {values.message.length} / 500
        </div>
        <div className={`err${touched.message && errors.message ? ' show' : ''}`}>{errors.message}</div>
      </div>

      <button
        className={`submit-btn${loading ? ' loading' : ''}`}
        onClick={submit}
        disabled={loading}
      >
        <span className="btn-text">Envoyer le message</span>
        <div className="spinner"></div>
      </button>

      {success && (
        <div className="success-msg show">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7.5" stroke="currentColor"/>
            <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Message envoyé ! Je vous répondrai bientôt.
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('contact-form-root')).render(<ContactForm />);
