import { useState, useEffect, useRef } from 'react'
import {
  APAC_COUNTRIES,
  readUtm,
  validateEmail,
} from '../utils/formValidation'
import styles from './LeadForm.module.css'

const SUBMISSION_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xkjrbeja'
export default function LeadForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [serverError, setServerError] = useState('')
  const [submittedData, setSubmittedData] = useState(null)
  const successRef = useRef(null)

  // Shift focus to success confirmation for screen readers & keyboard users
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus()
    }
  }, [status])

  const validate = () => {
    const newErrors = {}
    if (!fields.name.trim()) {
      newErrors.name = 'Full name is required.'
    }
    const emailError = validateEmail(fields.email)
    if (emailError) {
      newErrors.email = emailError
    }
    if (!fields.company.trim()) {
      newErrors.company = 'Company name is required.'
    }
    if (!fields.country) {
      newErrors.country = 'Please select your country from the dropdown.'
    }
    return newErrors
  }

  const handleChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear field-specific error as user types
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first erroneous input field
      const firstErrorField = Object.keys(validationErrors)[0]
      document.getElementById(`field-${firstErrorField}`)?.focus()
      return
    }

    setStatus('submitting')
    setServerError('')

    const utmParams = readUtm()
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim().toLowerCase(),
      company: fields.company.trim(),
      country: fields.country,
      submitted_at: new Date().toISOString(),
      ...utmParams,
    }

    try {
      const response = await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      setSubmittedData(payload)
      setStatus('success')
    } catch (err) {
      console.error('Lead submission failure:', err)
      setStatus('error')
      setServerError(
        'Submission was unsuccessful. Please verify your internet connection or email us directly at audit@lionreach.com.'
      )
    }
  }

  /* ── Success State ── */
  if (status === 'success') {
    return (
      <div
        className={styles.success}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={successRef}
      >
        <svg
          className={styles.successIcon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
        <h3 className={styles.successTitle}>Audit Request Received</h3>
        <p className={styles.successBody}>
          Thank you, <strong>{submittedData?.name || fields.name}</strong>. Your
          diagnostic request for <strong>{submittedData?.company || fields.company}</strong> has
          been queued.
        </p>
        <p className={styles.successBody}>
          A LionReach APAC demand gen strategist will review your domain and reach
          out to <strong>{submittedData?.email || fields.email}</strong> within two
          business days with your benchmark audit.
        </p>

        {submittedData?.utm_source && (
          <div className={styles.utmBadge}>
            Referral Channel: <code>{submittedData.utm_source}</code>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/case-study" className="btn-outline">
            Read Verified Case Study →
          </a>
          <button
            type="button"
            className="btn-primary"
            style={{ fontSize: 13, padding: '10px 18px' }}
            onClick={() => {
              setFields({ name: '', email: '', company: '', country: '' })
              setSubmittedData(null)
              setStatus('idle')
            }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  /* ── Default Form State ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
      aria-label="Complimentary APAC B2B Demand Gen Audit Form"
    >
      {/* 1. Full Name */}
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
          onChange={(e) => handleChange('name', e.target.value)}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-describedby={errors.name ? 'err-name' : undefined}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && (
          <span id="err-name" className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* 2. Work Email */}
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
          onChange={(e) => handleChange('email', e.target.value)}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-describedby={errors.email ? 'err-email' : 'hint-email'}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email ? (
          <span id="err-email" className={styles.error} role="alert">
            {errors.email}
          </span>
        ) : (
          <span id="hint-email" className={styles.hint}>
            Please use your corporate work email (personal domains are not accepted).
          </span>
        )}
      </div>

      {/* 3. Company Name */}
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
          onChange={(e) => handleChange('company', e.target.value)}
          className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
          aria-describedby={errors.company ? 'err-company' : undefined}
          aria-invalid={!!errors.company}
          required
        />
        {errors.company && (
          <span id="err-company" className={styles.error} role="alert">
            {errors.company}
          </span>
        )}
      </div>

      {/* 4. Country Dropdown */}
      <div className={styles.field}>
        <label htmlFor="field-country" className={styles.label}>
          Country <span aria-hidden="true" className={styles.req}>*</span>
        </label>
        <select
          id="field-country"
          name="country"
          value={fields.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className={`${styles.input} ${styles.select} ${errors.country ? styles.inputError : ''
            }`}
          aria-describedby={errors.country ? 'err-country' : undefined}
          aria-invalid={!!errors.country}
          required
        >
          <option value="">Select your APAC country</option>
          {APAC_COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <span id="err-country" className={styles.error} role="alert">
            {errors.country}
          </span>
        )}
      </div>

      {/* Inline Server / Network Error */}
      {status === 'error' && (
        <div className={styles.serverError} role="alert">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{serverError}</span>
        </div>
      )}

      {/* Submit CTA */}
      <button
        type="submit"
        className={`btn-primary ${styles.submit}`}
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <svg
              className={styles.spinner}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Generating Audit Request…
          </>
        ) : (
          <>
            Request My Free Audit Report
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>

      <p className={styles.privacy}>
        Strict privacy guaranteed. Handled in accordance with Singapore PDPA standards.
      </p>
    </form>
  )
}
