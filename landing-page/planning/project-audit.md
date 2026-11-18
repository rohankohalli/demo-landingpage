# Project Audit: LionReach Media 2-Page Campaign Website

**Project:** LionReach Media B2B Demand Gen Audit Take-Home Assessment  
**Repository:** `https://github.com/rohankohalli/demo-landingpage`  
**Current Working Directory:** `d:\workspace\2page-LandingPage\landing-page`  
**Audit Date:** 18 November 2026 (Updated & Verified)  
**Auditor:** Web Developer Candidate  

---

## 1. Verified Repository State (`git ls-tree -r HEAD`)

The repository is a clean, minimal React 19 + Vite scaffold. Below is the complete and verified list of files tracked in the repository:

```
landing-page/
├── public/
│   ├── assests/                      # [NOTE: Folder name spelled 'assests' in upstream repo]
│   │   ├── LRM monogram 1.png        # Monogram mark (73 KB)
│   │   ├── LRM_Logo_Neon & Black.png # Horizontal logo with black text (157 KB)
│   │   └── LRM_Logo_Neon & White.png # Horizontal logo with white text for dark canvas (150 KB)
│   ├── favicon.svg                   # Default Vite favicon
│   └── icons.svg                     # Default Vite SVG icon sheet
├── src/
│   ├── assets/
│   │   ├── hero.png                  # Vite starter graphic
│   │   ├── react.svg                 # React logo
│   │   └── vite.svg                  # Vite logo
│   ├── App.css                       # Default Vite starter CSS
│   ├── App.jsx                       # Default Vite counter component
│   ├── index.css                     # Default Vite starter typography & purple theme
│   ├── main.jsx                      # React 19 root mount point (createRoot)
│   └── Page.jsx                      # Empty 0-byte file
├── .gitignore
├── eslint.config.js
├── index.html                        # HTML entry point with `<title>landing-page</title>`
├── package-lock.json
├── package.json                      # React 19.3.1, React-DOM 19.3.1, Vite 8.3.6
├── README.md                         # Default Vite starter readme
└── vite.config.js                    # Standard Vite React plugin configuration
```

---

## 2. Clarification on Automation & Future Files

> [!IMPORTANT]
> **Existing Repository vs. Proposed Deliverables:**
> - **Automation Directory (`automation/`):** Does **NOT** exist in the repository. Section 2 automation files (`clean_leads.py`, `leads_clean.csv`, `leads_sample.csv`, `slack_message.txt`, etc.) are future deliverables to be cleanly introduced when implementing Section 2.
> - **GitHub Actions (`.github/workflows/`):** Does **NOT** exist in the upstream repository. It is a proposed bonus deliverable for Section 2 (scheduling the Monday automation).
> - **Planning Directory (`planning/`):** Added locally to store verified research, content architecture, and design specifications for Stage 1 review.

---

## 3. Package & Dependency Analysis

- **`dependencies`:**
  - `react`: `^19.3.1`
  - `react-dom`: `^19.3.1`
- **`devDependencies`:**
  - `@eslint/js`: `^10.0.1`
  - `@types/react`: `^19.3.0`
  - `@types/react-dom`: `^19.3.0`
  - `@vitejs/plugin-react`: `^6.1.2`
  - `eslint`: `^10.14.0`
  - `eslint-plugin-react-hooks`: `^7.1.1`
  - `eslint-plugin-react-refresh`: `^0.5.7`
  - `globals`: `^17.13.0`
  - `vite`: `^8.3.6`
- **Routing Dependency Needed for Stage 2:** `react-router-dom` is currently absent. To fulfill the requirement of direct routing between `/` and `/case-study`, `react-router-dom` will be installed during Stage 2 implementation.
- **Icons:** The brief permits Lucide, Heroicons, or Phosphor. For maximum performance and zero dependency bloat, crisp inline SVGs or `lucide-react` can be leveraged.

---

## 4. Public Assets & Logo Inspection

The three brand assets supplied with the brief are stored under `public/assests/`:
1. **`LRM_Logo_Neon & White.png`**: High-resolution wordmark designed for dark backgrounds. Primary logo for header and footer.
2. **`LRM_Logo_Neon & Black.png`**: High-resolution wordmark for lighter surfaces.
3. **`LRM monogram 1.png`**: Compact brand monogram icon. Can serve as the favicon and mobile mark.

*Constraint:* The logo artwork must be used as-is, without modifications or re-coloring. Asset paths in code must reference `/assests/...` to match the directory name.

---

## 5. Technical Requirements for Stage 2

1. **Routing:** Implement React Router (`createBrowserRouter` or `<BrowserRouter>`) with routes:
   - `/`: Campaign Landing Page
   - `/case-study`: Nutanix APAC Case Study Page
   - Direct navigation to `/case-study` must be supported. For static hosting deployment (Netlify/Vercel/GitHub Pages), an SPA redirect/rewrite rule (`_redirects` or `vercel.json`) must be included.
2. **Shared Shell:** Both `/` and `/case-study` will share a unified Header and Footer layout component.
3. **Typography & Styling:** Replace default Vite CSS with Poppins font and the `#041221` / `#C8FF00` design system.
4. **Form Scope:** Exactly 4 input fields: Name, Work Email, Company, Country (dropdown), plus hidden UTM extraction and success state.
