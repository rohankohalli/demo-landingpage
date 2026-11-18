import { useState } from 'react'
import styles from './FAQ.module.css'

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <dl className={styles.list}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const id = `faq-answer-${i}`
        const btnId = `faq-btn-${i}`
        return (
          <div
            key={i}
            className={`${styles.item} ${isOpen ? styles.open : ''}`}
          >
            <dt>
              <button
                id={btnId}
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <svg
                  className={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </dt>
            <dd
              id={id}
              role="region"
              aria-labelledby={btnId}
              className={styles.answer}
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
