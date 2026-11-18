import { useState, useEffect, useRef } from 'react'
import styles from './LeadForm.module.css'

const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
  'icloud.com', 'aol.com', 'live.com', 'mail.com', 'protonmail.com',
  'ymail.com', 'msn.com',
])

const COUNTRIES = [
  'Singapore', 'Australia', 'India', 'Japan', 'Malaysia',
  'Indonesia', 'New Zealand', 'Philippines', 'Vietnam', 'Thailand',
  'Other APAC',
]

function readUtm() {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   || '',
    utm_medium:   p.get('utm_medium')   || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_term:     p.get('utm_term')     || '',
    utm_content:  p.get('utm_content')  || '',
  }
}

function validateEmail(email) {
  if (!email) return 'Work email is required.'
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!basic) return 'Please enter a valid email address.'
  const domain = email.split('@')[1]?.toLowerCase()
  if (PERSONAL_DOMAINS.has(domain))
    return 'Personal email domains are not accepted. Please use your work email.'
  return null
}

export default function LeadForm() {
  const [fields, setFields] = useState({ name: '', email: '', company: '', country: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')
  const successRef = useRef(null)

  // Focus success message when it appears
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const validate = () => {
    const e = {}
    if (!fields.name.trim()) e.name = 'Full name is required.'
    const emailErr = validateEmail(fields.email.trim())
    if (emailErr) e.email = emailErr
    if (!fields.company.trim()) e.company = 'Company name is required.'
    if (!fields.country) e.country = 'Please select your country.'
    return e
  }

  const handleChange = (key, value) => {
    setFields(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Focus first error field
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`field-${firstKey}`)?.focus()
      return
    }

    setStatus('submitting')
    setServerError('')

    const utm = readUtm()
    const payload = {
      name:         fields.name.trim(),
      email:        fields.email.trim().toLowerCase(),
      company:      fields.company.trim(),
      country:      fields.country,
      submitted_at: new Date().toISOString(),
      ...utm,
    }

    try {
      // Using Formspree as the free public endpoint.
      // Replace 'xvgzqnwl' with your own Formspree form ID before deploying.
      const res = await fetch('https://formspree.io/f/xvgzqnwl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setStatus('success')
    } catch (err) {
      console.error('Form submission error:', err)
      setStatus('error')
      setServerError('Something went wrong. Please try again or email us directly.')
    }
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div
        className={styles.success}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={successRef}
      >
        <svg className={styles.successIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
        </svg>
        <h3 className={styles.successTitle}>Audit request received!</h3>
        <p className={styles.successBody}>
          Thank you, <strong>{fields.name}</strong>. A LionReach strategist will
          review your request and contact <strong>{fields.email}</strong> within
          two business days.
        </p>
        <p className={styles.successBody}>
          While you wait, explore how LionReach helped a tax technology brand
          protect its U.S. pipeline in record time.
        </p>
        <a href="/case-study" className="btn-outline" style={{ marginTop: 20, display: 'inline-flex' }}>
          Read Case Study →
        </a>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
      aria-label="Request a free demand gen audit"
    >
      {/* Name */}
      <div className={styles.field}>
        <label htmlFor="field-name" className={styles.label}>
          Full Name <span aria-hidden="true" className={styles.req}>*</span>
        </label>
        <input
          id="field-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="e.g. Sarah Tan"
          value={fields.name}
          onChange={e => handleChange('name', e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-describedby={errors.name ? 'err-name' : undefined}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && (
          <span id="err-name" className={styles.error} role="alert">{errors.name}</span>
        )}
      </div>

      {/* Work Email */}
      <div className={styles.field}>
        <label htmlFor="field-email" className={styles.label}>
          Work Email <span aria-hidden="true" className={styles.req}>*</span>
        </label>
        <input
          id="field-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={fields.email}
          onChange={e => handleChange('email', e.target.value)}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-describedby={errors.email ? 'err-email' : 'hint-email'}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email ? (
          <span id="err-email" className={styles.error} role="alert">{errors.email}</span>
        ) : (
          <span id="hint-email" className={styles.hint}>Personal email domains are not accepted.</span>
        )}
      </div>

      {/* Company */}
      <div className={styles.field}>
        <label htmlFor="field-company" className={styles.label}>
          Company Name <span aria-hidden="true" className={styles.req}>*</span>
        </label>
        <input
          id="field-company"
          type="text"
          name="company"
          autoComplete="organization"
          placeholder="e.g. CloudTech Systems"
          value={fields.company}
          onChange={e => handleChange('company', e.target.value)}
          className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
          aria-describedby={errors.company ? 'err-company' : undefined}
          aria-invalid={!!errors.company}
          required
        />
        {errors.company && (
          <span id="err-company" className={styles.error} role="alert">{errors.company}</span>
        )}
      </div>

      {/* Country */}
      <div className={styles.field}>
        <label htmlFor="field-country" className={styles.label}>
          Country <span aria-hidden="true" className={styles.req}>*</span>
        </label>
        <select
          id="field-country"
          name="country"
          value={fields.country}
          onChange={e => handleChange('country', e.target.value)}
          className={`${styles.input} ${styles.select} ${errors.country ? styles.inputError : ''}`}
          aria-describedby={errors.country ? 'err-country' : undefined}
          aria-invalid={!!errors.country}
          required
        >
          <option value="">Select your country</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.country && (
          <span id="err-country" className={styles.error} role="alert">{errors.country}</span>
        )}
      </div>

      {/* Server error */}
      {status === 'error' && (
        <p className={styles.serverError} role="alert">{serverError}</p>
      )}

      <button
        type="submit"
        className={`btn-primary ${styles.submit}`}
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            Generate My Audit Report
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </>
        )}
      </button>

      <p className={styles.privacy}>
        No spam. No commitment. We handle your data in accordance with our privacy policy and Singapore PDPA guidelines.
      </p>
    </form>
  )
}
