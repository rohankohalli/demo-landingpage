import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import LeadForm from '../components/LeadForm'
import FAQ from '../components/FAQ'

/* ---------- Data ---------- */
const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'The Vanity MQL Trap',
    body: 'Marketing reports strong download numbers while sales reps burn hours chasing personal email signups, non-decision-makers, and contacts with no active budget or buying authority.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'APAC Regulatory Fragmentation',
    body: 'Applying a single Western playbook across Singapore, Tokyo, Sydney, and Bangalore ignores regional compliance requirements, distinct buying committee structures, and localised channel preferences.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Cold, Context-Free Handoffs',
    body: 'Sales teams reach out without knowing what infrastructure challenges or software categories the prospect was researching, turning warm intent into ignored, generic outreach.',
  },
]

const steps = [
  {
    num: '01',
    title: 'TAM & CRM Whitespace Analysis',
    body: 'We review your target account profile and identify net-new accounts across APAC that are completely absent from your existing CRM — genuine growth whitespace, not recycled lists.',
  },
  {
    num: '02',
    title: 'Intent & Telemetry Diagnostic',
    body: 'We scan for active in-market buying signals across regional tech sectors, surfacing accounts currently researching cloud, infrastructure, and software migrations — right now.',
  },
  {
    num: '03',
    title: 'Executive Pipeline Action Plan',
    body: 'You receive a strategic audit report covering qualification gaps, intent whitespace by geography, and an actionable Account-Based Marketing roadmap tailored to your APAC ICP.',
  },
]

const proofStats = [
  { value: '100%', label: 'Net-New CRM Whitespace', note: 'Nutanix Singapore campaign' },
  { value: '$1.2M+', label: 'Verified Pipeline Generated', note: 'APAC B2B SaaS case study' },
  { value: '150M+', label: 'Verified Global B2B Contacts', note: 'Proprietary contact network' },
  { value: '5-Step', label: 'Human & Telemetry Verification', note: 'Multi-layer quality protocol' },
]

const faqItems = [
  {
    q: 'What is covered in the complimentary B2B Demand Gen Audit?',
    a: 'An objective assessment of your APAC ideal customer profile (ICP), account whitespace analysis across key APAC markets, intent data coverage gaps, and lead verification hygiene — delivered as a written report.',
  },
  {
    q: 'Is there any cost or commitment required?',
    a: 'No. The audit is 100% complimentary for qualifying B2B technology companies operating or expanding in the APAC region. There is no obligation to purchase any service.',
  },
  {
    q: 'How does LionReach verify lead quality?',
    a: 'We deploy a multi-step verification protocol that combines automated domain and syntax telemetry with human verification, ensuring every contact record is active, role-confirmed, and compliant with applicable data regulations.',
  },
  {
    q: 'How do you handle APAC regional privacy regulations?',
    a: 'All campaigns are built to follow established regional data standards, including Singapore\'s Personal Data Protection Act (PDPA) and Australian Privacy Principles. Specific compliance guidance is part of your audit report.',
  },
]

/* ---------- Component ---------- */
export default function LandingPage() {
  useEffect(() => {
    document.title = 'Free B2B Demand Gen Audit for APAC Tech Companies | LionReach Media'
  }, [])

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>Skip to main content</a>

      {/* ── Hero ── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className="container">
          <span className={`eyebrow ${styles.heroBadge}`} aria-hidden="true">
            APAC B2B DEMAND GEN AUDIT · COMPLIMENTARY FOR TECH LEADERS
          </span>
          <h1 id="hero-heading" className={styles.heroHeading}>
            Stop Burning Budget on<br className={styles.br} />
            <span className={styles.accent}>Cold APAC Leads.</span>
          </h1>
          <p className={styles.heroSub}>
            Discover where your APAC pipeline is losing high-intent buyers.
            Benchmark your targeting, intent data coverage, and account
            whitespace against proven enterprise tech standards.
          </p>
          <div className={styles.heroActions}>
            <a href="#audit-form" className="btn-primary">
              Request Your Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
          <p className={styles.heroTrust}>
            Trusted by enterprise tech leaders including <strong>Nutanix</strong> ·
            150M+ Verified B2B Contacts · Multi-Step Lead Verification
          </p>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section
        id="pain-points"
        className={`section ${styles.painSection}`}
        aria-labelledby="pain-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Why APAC Demand Gen Fails</span>
            <h2 id="pain-heading" className="section-title">
              Three bottlenecks draining your APAC pipeline
            </h2>
          </div>
          <ul className={styles.painGrid} role="list">
            {painPoints.map((p) => (
              <li key={p.title} className={styles.painCard}>
                <div className={styles.painIcon} aria-hidden="true">{p.icon}</div>
                <h3 className={styles.painTitle}>{p.title}</h3>
                <p className={styles.painBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        className={`section ${styles.howSection}`}
        aria-labelledby="how-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">The Audit Process</span>
            <h2 id="how-heading" className="section-title">
              How your free audit works
            </h2>
          </div>
          <ol className={styles.stepsList} role="list">
            {steps.map((s) => (
              <li key={s.num} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">{s.num}</span>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Proof Block ── */}
      <section
        className={`section ${styles.proofSection}`}
        aria-labelledby="proof-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Verified Campaign Results</span>
            <h2 id="proof-heading" className="section-title">
              Outcomes from LionReach APAC campaigns
            </h2>
          </div>
          <ul className={styles.statsGrid} role="list">
            {proofStats.map((s) => (
              <li key={s.value} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statNote}>{s.note}</span>
              </li>
            ))}
          </ul>

          {/* Case study callout */}
          <div className={styles.caseCallout}>
            <div className={styles.caseCalloutContent}>
              <span className="eyebrow">Featured Case Study</span>
              <h3 className={styles.caseCalloutTitle}>
                How a Tax Technology Brand Safeguarded Its U.S. Pipeline in Record Time
              </h3>
              <p className={styles.caseCalloutBody}>
                When a campaign vendor withdrew weeks before launch, LionReach deployed
                a fully verified demand generation programme — delivering 2,100 qualified
                MQLs at 97% data accuracy within 2.5 weeks, with zero compliance flags.
              </p>
            </div>
            <Link to="/case-study" className="btn-outline">
              Read Case Study →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className={`section ${styles.faqSection}`}
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Frequently Asked</span>
            <h2 id="faq-heading" className="section-title">Questions about the audit</h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* ── Lead Form ── */}
      <section
        id="audit-form"
        className={`section ${styles.formSection}`}
        aria-labelledby="form-heading"
      >
        <div className="container">
          <div className={styles.formWrapper}>
            <span className="eyebrow">Start Here</span>
            <h2 id="form-heading" className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>
              Request your free APAC demand gen audit
            </h2>
            <p className={styles.formSubhead}>
              Complete the form below and a LionReach strategist will contact you within two business days to begin your diagnostic.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  )
}
