import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <img
            src="/assests/LRM_Logo_Neon & White.png"
            alt="LionReach Media"
            width="405"
            height="32"
            loading="lazy"
            decoding="async"
            className={styles.logo}
          />
          <p className={styles.tagline}>
            Engineering verified, high-intent B2B sales pipelines across APAC.
          </p>
        </div>

        <nav aria-label="Footer navigation" className={styles.nav}>
          <Link to="/" className={styles.link}>
            Overview
          </Link>
          <Link to="/case-study" className={styles.link}>
            Case Study
          </Link>
          <a href="/#faq" className={styles.link}>
            FAQ
          </a>
        </nav>

        <div className={styles.offices}>
          <span className={styles.officeLabel}>Offices</span>
          <ul className={styles.officeList}>
            <li>Singapore — SGX Centre 1</li>
            <li>Melbourne, Australia</li>
            <li>Houston, USA (HQ)</li>
            <li>London, UK</li>
            <li>Pune, India</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© 2026 LionReach Media. All rights reserved.</span>
          <span className={styles.badges}>
            <span className={styles.badge}>Singapore PDPA Compliant</span>
            <span className={styles.badge}>Multi-Step Lead Verification</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
