# LionReach Media — APAC B2B Demand Gen Campaign Website

A high-performance, accessible two-page campaign website built for **LionReach Media**, promoting a complimentary **B2B Demand Gen Audit** for technology companies across the APAC region (Singapore, Australia, India, Japan, Malaysia), accompanied by a verified **Tax Technology Brand Case Study**.

---

## 🚀 Live Routes & Architecture

Built with **React 19**, **Vite 8**, and **React Router DOM v7** using a shared layout (header navigation and footer) and route-level code splitting:

* **`/` — B2B Demand Gen Audit Landing Page:**
  * **Hero Section:** High-converting headline, value proposition, and primary CTA directing users to the audit intake.
  * **Trust Strip:** Key LionReach capabilities (150M+ Verified Global Contacts, 5-Step Verification, 100% CRM Whitespace).
  * **Three Core Pain Points:** The Vanity MQL Trap, Stale Intent Signals, and APAC Regulatory Blindspots.
  * **Three-Step How It Works:** Data & ICP Alignment, Intent & Telemetry Scoring, and Pipeline Delivery.
  * **Proof Block:** 4 verified performance metrics from LionReach's U.S. Tax Technology campaign (2,100 MQLs, 97% accuracy, 3× velocity, 24h launch).
  * **FAQ Accordion:** Semantic definition list (`<dl>`, `<dt>`, `<dd>`) addressing audit deliverables, qualifications, and data compliance.
  * **Lead Capture Form:** Accessible 4-field intake form with real-time validation and UTM tracking.

* **`/case-study` — Tax Technology Case Study Page:**
  * Deep-dive narrative on *"How a Tax Technology Brand Safeguarded Its U.S. Pipeline in Record Time"*.
  * Documents the vendor withdrawal crisis, LionReach's 24-hour response protocol, 5-step verification process, and 6 verified metrics (2,100 MQLs, 97% data accuracy, 3× lead velocity, 24h deployment, 2.5-week delivery window, zero compliance flags).
  * Direct CTAs linking back to the audit intake form.

---

## 🛠️ Technology Stack & Design System

* **Framework:** React 19 + Vite 8
* **Routing:** React Router DOM v7 (`React.lazy` code splitting with `<Suspense>`)
* **Styling:** CSS Modules with CSS Custom Properties
* **Design Tokens:**
  * Background / Dominant: Deep Navy (`#041221`, `--navy`)
  * Surface / Cards: Dark Navy Surface (`#0A1F36`, `--navy-surface`)
  * Accent / CTAs: Electric Lime (`#C8FF00`, `--lime`)
  * Body Text: Slate White (`#C4D1DE`, `--text-body`)
  * Typography: Google Fonts `Poppins` (Weights: 400, 500, 600, 700, 800)
* **Responsive Breakpoints:** Fully tested at 375px (mobile), 768px (tablet), and 1440px (desktop).

---

## 📋 Lead Form & Analytics Features

1. **Exact 4-Field Scope:** Full Name, Work Email, Company Name, and Country dropdown (Singapore, Australia, India, Japan, Malaysia, Other APAC).
2. **Strict Work Email Validation:** Rejects free/personal email domains (`gmail.com`, `yahoo.com`, `outlook.com`, `hotmail.com`, `icloud.com`, etc.) with clear inline guidance.
3. **Automatic UTM Parameter Capture:** Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` from the URL query string and bundles them in the submission payload.
4. **Resilient Submission States:** Integrated with Formspree endpoint with a documented local mock fallback. Provides accessible visual feedback for loading, inline validation errors, server errors, and confirmed submission success.

---

## ♿ Accessibility & Standards (WCAG 2.1 AA)

* **Keyboard Navigation:** Full tab order navigation with high-visibility `:focus-visible` focus rings (`2px solid #C8FF00`).
* **Skip Links:** "Skip to main content" link for screen reader users.
* **Semantic HTML:** Native `<main>`, `<header>`, `<nav>`, `<footer>`, `<section>`, `<article>`, and `<dl>` elements.
* **Touch-Friendly:** Form inputs have minimum `48px` heights and `16px` font sizes to eliminate iOS Safari viewport auto-zooming.
* **Aspect Ratios:** Explicit `width`, `height`, and CSS `aspect-ratio: 6082 / 480; object-fit: contain;` applied to official brand logos to eliminate Cumulative Layout Shift (CLS = 0).

---

## 📦 Installation & Commands

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Starts the Vite development server at `http://localhost:5173/`.

### 3. Run Production Build
```bash
npm run build
```
Compiles and bundles the application into the `dist/` directory with production minification and code splitting.

### 4. Preview Production Build
```bash
npm run preview
```
Spins up a local server serving the optimized production bundle at `http://localhost:4173/`. Run mobile Lighthouse audits against this URL for production benchmarks.

### 5. Run Linter
```bash
npm run lint
```
Executes ESLint across all JavaScript and JSX source files.

---

## 📈 Performance & Mobile Lighthouse

* **Total Transferred JS (Production):** **~90 kB gzipped** (a 98.3% payload reduction compared to unbundled dev mode).
* **Asynchronous Font Loading:** Preconnected to Google Fonts CDN with asynchronous stylesheet swapping (`media="print" onload="this.media='all'"`) and `font-display: swap` fallback.
* **Search Engine Optimization:** Comprehensive Open Graph cards, Twitter metadata, `robots.txt`, and Agentic Resource Discovery manifests (`llms.txt`, `ai-catalog.json`).
