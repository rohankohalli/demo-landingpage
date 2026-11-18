import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import LeadForm from '../components/LeadForm'
import FAQ from '../components/FAQ'

/* ---------- Data Definitions ---------- */
const painPoints = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'The Vanity MQL Trap',
    body: 'Marketing teams celebrate high download counts while sales reps burn hours following up with personal email addresses, students, and contacts with zero budget or buying authority.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'APAC Regulatory Fragmentation',
    body: 'Applying a single Western playbook across Singapore, Tokyo, Sydney, and Bangalore fails to account for regional compliance nuances (such as Singapore PDPA) and localized buying committees.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Cold, Context-Free Sales Handoffs',
    body: 'SDRs reach out without knowing what software categories, cloud architectures, or infrastructure challenges the prospect was researching, turning warm interest into ignored, generic outreach.',
  },
]

const steps = [
  {
    num: '01',
    title: 'TAM & CRM Whitespace Analysis',
    body: 'We review your ideal customer profile (ICP) and identify high-value accounts across APAC that are completely absent from your current CRM — delivering net-new whitespace, not recycled lists.',
  },
  {
    num: '02',
    title: 'Intent & Telemetry Diagnostic',
    body: 'We scan for active in-market buying signals across regional tech sectors, pinpointing decision-makers currently evaluating enterprise software and cloud migrations.',
  },
  {
    num: '03',
    title: 'Executive Pipeline Action Plan',
    body: 'You receive an actionable audit report covering qualification gaps, regional intent coverage, and a prioritized Account-Based Marketing rollout plan tailored to your team.',
  },
]

// Proof metrics strictly tied to the featured Tax Technology Case Study (no client blending)
const proofStats = [
  {
    value: '2,100',
    label: 'Verified MQLs Delivered',
    note: 'Qualified decision-makers to sales',
  },
  {
    value: '97%',
    label: 'Contact Data Accuracy',
    note: 'Audited 5-step verification rate',
  },
  {
    value: '3×',
    label: 'Faster Lead Velocity',
    note: 'Compared to previous vendor pace',
  },
  {
    value: '24h',
    label: 'Rapid Market Launch',
    note: 'Emergency onboarding to live campaign',
  },
]

const faqItems = [
  {
    q: 'What is covered in the complimentary B2B Demand Gen Audit?',
    a: 'An objective diagnostic of your APAC target account profile (ICP), account whitespace across regional tech hubs, intent data coverage gaps, and lead verification hygiene — delivered as a written strategic report.',
  },
  {
    q: 'Is there any cost or commitment required?',
    a: 'No. The audit is 100% complimentary for qualifying B2B technology companies operating or expanding in the APAC region. There is no obligation to purchase any service.',
  },
  {
    q: 'How does LionReach verify lead data quality?',
    a: 'We deploy a multi-step verification protocol that combines automated domain telemetry and syntax checks with human verification, ensuring every record is active, role-confirmed, and compliant with applicable data regulations.',
  },
  {
    q: 'How do you handle APAC regional privacy regulations?',
    a: 'All campaigns are engineered to adhere to regional data protection frameworks, including Singapore\'s Personal Data Protection Act (PDPA) and Australian Privacy Principles. Compliance guidance is included in your audit report.',
  },
]

/* ---------- Component ---------- */
export default function LandingPage() {
  useEffect(() => {
    document.title =
      'Free B2B Demand Gen Audit for APAC Tech Companies | LionReach Media'
  }, [])

  return (
    <>
      {/* Accessible Skip Link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* ── Hero Section ── */}
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
            </a>
          </div>
          <p className={styles.heroTrust}>
            Global B2B Demand Generation · 150M+ Verified Enterprise Contacts · Multi-Step Lead Verification
          </p>
        </div>
      </section>

      {/* ── Pain Points Section ── */}
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
                <div className={styles.painIcon} aria-hidden="true">
                  {p.icon}
                </div>
                <h3 className={styles.painTitle}>{p.title}</h3>
                <p className={styles.painBody}>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How It Works Section ── */}
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
                <span className={styles.stepNum} aria-hidden="true">
                  {s.num}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Proof Block (Dedicated to Verified Tax Tech Case Study) ── */}
      <section
        className={`section ${styles.proofSection}`}
        aria-labelledby="proof-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Documented Client Results</span>
            <h2 id="proof-heading" className="section-title">
              Proven outcomes from LionReach enterprise campaigns
            </h2>
            <p className={styles.sectionSubhead}>
              Verified historical performance from our emergency demand generation deployment for a U.S. enterprise tax technology brand.
            </p>
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

          {/* Featured Case Study Spotlight Card */}
          <div className={styles.caseCallout}>
            <div className={styles.caseCalloutContent}>
              <span className="eyebrow">Featured Client Story</span>
              <h3 className={styles.caseCalloutTitle}>
                How a Tax Technology Brand Safeguarded Its U.S. Pipeline in Record Time
              </h3>
              <p className={styles.caseCalloutBody}>
                When an incumbent vendor abruptly withdrew weeks before launch,
                LionReach engineered an emergency demand generation engine — delivering
                2,100 verified MQLs at 97% data accuracy within 2.5 weeks, with zero
                compliance flags.
              </p>
            </div>
            <Link to="/case-study" className="btn-outline">
              Read Verified Case Study →
            </Link>
          </div>
          <p className={styles.proofDisclaimer}>
            * Metrics represent historical outcomes from this specific engagement. Individual results vary based on target market parameters.
          </p>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section
        id="faq"
        className={`section ${styles.faqSection}`}
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="eyebrow">Frequently Asked</span>
            <h2 id="faq-heading" className="section-title">
              Questions about the audit
            </h2>
          </div>
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* ── Lead Form Section ── */}
      <section
        id="audit-form"
        className={`section ${styles.formSection}`}
        aria-labelledby="form-heading"
      >
        <div className="container">
          <div className={styles.formWrapper}>
            <span className="eyebrow">Start Here</span>
            <h2
              id="form-heading"
              className="section-title"
              style={{ marginTop: 8, marginBottom: 12 }}
            >
              Request your free APAC demand gen audit
            </h2>
            <p className={styles.formSubhead}>
              Complete the form below and a LionReach APAC strategist will contact
              you within two business days to begin your diagnostic.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  )
}
