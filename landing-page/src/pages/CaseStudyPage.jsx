import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './CaseStudyPage.module.css'

const metrics = [
  {
    value: '2,100',
    label: 'Verified MQLs Delivered',
    desc: 'Qualified decision-makers handed directly to sales',
  },
  {
    value: '97%',
    label: 'Data Accuracy Rate',
    desc: 'Verified contact accuracy via 5-step protocol',
  },
  {
    value: '3×',
    label: 'Faster Lead Velocity',
    desc: 'Compared to previous incumbent vendor pace',
  },
  {
    value: '24h',
    label: 'Campaign Deployment',
    desc: 'From initial briefing to live market launch',
  },
  {
    value: '2.5 Wks',
    label: 'Total Delivery Window',
    desc: 'Entire target pipeline fulfilled ahead of quarter close',
  },
  {
    value: 'Zero',
    label: 'Compliance Flags',
    desc: '100% compliant with enterprise opt-in regulations',
  },
]

export default function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title =
      'Tax Technology Pipeline Case Study | LionReach Media'
  }, [])

  return (
    <article className={styles.page}>
      {/* ── Breadcrumb / Header ── */}
      <div className={styles.hero}>
        <div className="container">
          <Link to="/" className={styles.backLink}>
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Audit Overview
          </Link>

          <span className={`eyebrow ${styles.badge}`}>
            CASE STUDY · ENTERPRISE DEMAND GENERATION
          </span>

          <h1 className={styles.title}>
            How a Tax Technology Brand Safeguarded Its U.S. Pipeline in Record Time
          </h1>

          <p className={styles.subtitle}>
            When an incumbent lead generation vendor abruptly withdrew weeks before a
            critical quarterly launch, LionReach engineered an emergency demand
            generation engine — delivering 2,100 verified MQLs with 97% data accuracy in
            just 2.5 weeks.
          </p>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Client</span>
              <span className={styles.metaVal}>Tax & Finance Technology Brand (Anonymized)</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Target Geography</span>
              <span className={styles.metaVal}>United States Enterprise Market</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Execution Window</span>
              <span className={styles.metaVal}>2.5 Weeks from Launch</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Official Source</span>
              <span className={styles.metaVal}>
                <a
                  href="https://www.lionreach.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  Lion Reach Media Case Studies ↗
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Verified Results Grid ── */}
      <section className={styles.metricsSection} aria-label="Key campaign results">
        <div className="container">
          <div className={styles.metricsGrid}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <strong className={styles.metricLabel}>{m.label}</strong>
                <span className={styles.metricDesc}>{m.desc}</span>
              </div>
            ))}
          </div>
          <p className={styles.disclaimer}>
            * Note: These metrics represent verified historical outcomes documented for this specific
            client engagement. Individual campaign results vary depending on TAM size, ICP qualification, and
            market dynamics.
          </p>
        </div>
      </section>

      {/* ── Main Case Study Narrative ── */}
      <div className={`container ${styles.narrative}`}>
        <div className={styles.contentCol}>
          {/* Section 1: Client Context */}
          <section className={styles.storyBlock}>
            <span className="eyebrow">01 / The Context</span>
            <h2>An Enterprise Tax Technology Leader</h2>
            <p>
              The client is a prominent provider of corporate tax compliance and accounting
              automation software in North America. Their enterprise suite is engineered for Fortune
              500 tax directors, VPs of Finance, and corporate controllers managing complex
              cross-jurisdictional tax reporting.
            </p>
            <p>
              Heading into their critical fiscal quarter, the sales organization had allocated
              substantial revenue expectations to an inbound demand campaign designed to supply
              their 30-person SDR organization with qualified pipeline.
            </p>
          </section>

          {/* Section 2: The Problem */}
          <section className={styles.storyBlock}>
            <span className="eyebrow">02 / The Emergency</span>
            <h2>Abrupt Vendor Withdrawal & Impending Pipeline Starvation</h2>
            <p>
              With only weeks remaining before the scheduled campaign launch date, the client’s
              contracted demand generation agency abruptly withdrew due to capacity constraints.
              This created an immediate revenue emergency:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Critical Pipeline Deficit:</strong> Over 2,000 forecasted Marketing
                Qualified Leads (MQLs) were suddenly removed from the quarterly sales forecast.
              </li>
              <li>
                <strong>Idle Sales Capacity:</strong> The enterprise SDR team faced the prospect of
                weeks without fresh, qualified account handoffs during their peak closing cycle.
              </li>
              <li>
                <strong>Unacceptable Traditional Onboarding Times:</strong> Typical enterprise demand
                generation vendors require 4 to 6 weeks for account mapping and technical setup —
                meaning the entire quarterly window would have expired before replacement leads
                could arrive.
              </li>
            </ul>
          </section>

          {/* Section 3: What LionReach Did */}
          <section className={styles.storyBlock}>
            <span className="eyebrow">03 / The Execution</span>
            <h2>Rapid Deployment & Precision Multi-Step Verification</h2>
            <p>
              LionReach Media was brought in as the rapid-response demand generation partner. The
              mission was unequivocal: replace the entire lost volume without relaxing data quality,
              buyer seniority, or compliance standards.
            </p>

            <div className={styles.approachCards}>
              <div className={styles.approachCard}>
                <div className={styles.stepNum}>Phase 1</div>
                <h3>24-Hour Emergency Deployment</h3>
                <p>
                  Within 24 hours of receiving the brief, LionReach calibrated target ICP parameters,
                  cross-referenced exclusion lists against the client's Salesforce CRM, and pushed the
                  campaign live across our syndicated channels.
                </p>
              </div>

              <div className={styles.approachCard}>
                <div className={styles.stepNum}>Phase 2</div>
                <h3>Intent-Driven Account Sourcing</h3>
                <p>
                  We deployed behavioral intent monitoring across our 150M+ contact ecosystem to track
                  corporate finance teams actively researching corporate tax reform, nexus compliance,
                  and ERP migration solutions.
                </p>
              </div>

              <div className={styles.approachCard}>
                <div className={styles.stepNum}>Phase 3</div>
                <h3>5-Step Verification Protocol</h3>
                <p>
                  Every lead underwent LionReach's strict multi-step validation: syntax check, corporate
                  domain telemetry, job title seniority audit, phone verification, and explicit opt-in
                  verification to eliminate bounce rates.
                </p>
              </div>

              <div className={styles.approachCard}>
                <div className={styles.stepNum}>Phase 4</div>
                <h3>High-Velocity Daily Delivery</h3>
                <p>
                  Verified records were transferred directly into the client’s marketing automation
                  platform on a rolling daily schedule, enabling SDRs to engage prospects while intent
                  was at its highest peak.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Outcome */}
          <section className={styles.storyBlock}>
            <span className="eyebrow">04 / The Business Impact</span>
            <h2>Quarterly Target Rescued in Record Time</h2>
            <p>
              Over a compressed 2.5-week execution window, LionReach delivered 2,100 verified MQLs.
              The client’s sales development team reported a 3× faster lead delivery velocity compared
              to their previous vendor, with an audited data accuracy rate of 97%.
            </p>
            <p>
              Critically, zero compliance flags or opt-out complaints were recorded throughout the
              engagement, preserving the client's corporate brand reputation while keeping enterprise
              revenue targets firmly on track.
            </p>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <span className="eyebrow">Quick Summary</span>
            <ul className={styles.sidebarList}>
              <li>
                <strong>Client Sector:</strong>
                <span>Tax & Accounting Tech</span>
              </li>
              <li>
                <strong>Leads Delivered:</strong>
                <span>2,100 Verified MQLs</span>
              </li>
              <li>
                <strong>Data Accuracy:</strong>
                <span>97% Audited</span>
              </li>
              <li>
                <strong>Turnaround:</strong>
                <span>Live in 24 Hours</span>
              </li>
              <li>
                <strong>Execution Time:</strong>
                <span>2.5 Weeks</span>
              </li>
              <li>
                <strong>Compliance:</strong>
                <span>100% (Zero flags)</span>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarCtaCard}>
            <span className="eyebrow">Facing Pipeline Risk?</span>
            <h3>Audit Your B2B Demand Gen Engine</h3>
            <p>
              Whether expanding in APAC or optimizing your existing funnel, uncover where your
              pipeline is leaking before your next quarterly deadline.
            </p>
            <Link to="/#audit-form" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Claim Free Audit →
            </Link>
          </div>
        </aside>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <section className={styles.bottomBanner}>
        <div className="container">
          <div className={styles.bottomBannerInner}>
            <div>
              <span className="eyebrow">Apply This Strategy to Your APAC Pipeline</span>
              <h2 className={styles.bottomBannerTitle}>
                Ready to benchmark your B2B demand generation?
              </h2>
              <p className={styles.bottomBannerSub}>
                Get an objective diagnostic of your TAM, intent coverage, and lead qualification
                across APAC tech corridors.
              </p>
            </div>
            <Link to="/#audit-form" className="btn-primary" style={{ flexShrink: 0 }}>
              Request Your Free Audit →
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
