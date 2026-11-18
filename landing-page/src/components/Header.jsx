import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAuditClick = () => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="LionReach Media — home">
          <img
            src="/assests/LRM_Logo_Neon & White.png"
            alt="LionReach Media"
            width="456"
            height="36"
            fetchPriority="high"
            decoding="async"
          />
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            onClick={() => setMenuOpen(false)}
          >
            Overview
          </NavLink>
          <a
            href="/#pain-points"
            className={styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            Why Audit?
          </a>
          <NavLink
            to="/case-study"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            onClick={() => setMenuOpen(false)}
          >
            Case Study
          </NavLink>
          <a
            href="/#faq"
            className={styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </a>
        </nav>

        <button className={`btn-primary ${styles.cta}`} onClick={handleAuditClick}>
          Claim Free Audit
        </button>

        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>
    </header>
  )
}
