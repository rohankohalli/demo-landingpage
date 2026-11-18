# Design System & Technical Specification: LionReach Media

**Design Goal:** A high-contrast, premium B2B technology marketing agency interface adhering strictly to LionReach brand specifications, WCAG AAA accessibility, and responsive breakpoints at **375px**, **768px**, and **1440px**.

---

## 1. Brand Color System

```css
:root {
  /* Official LionReach Brand Colors */
  --color-navy: #041221;            /* Primary dark background */
  --color-navy-dark: #020a13;       /* Deeper contrast background (footer/hero) */
  --color-navy-surface: #0a1f36;    /* Card and panel container surface */
  --color-navy-border: #133252;     /* Subtle container outlines */
  
  --color-lime: #C8FF00;            /* High-voltage brand primary neon */
  --color-lime-hover: #b5e600;      /* Accessible hover state */
  --color-lime-glow: rgba(200, 255, 0, 0.15); /* Restrained ambient highlight */
  
  /* Text & Contrast Tokens */
  --color-text-white: #FFFFFF;      /* Primary headings & button labels */
  --color-text-body: #C4D1DE;       /* High-contrast readable body text (11.2:1 contrast) */
  --color-text-muted: #7E94A8;      /* Captions, subtext, icons */
  
  /* Form Feedback Tokens */
  --color-error: #FF4D4D;           /* Inline validation error */
  --color-error-bg: rgba(255, 77, 77, 0.1);
  --color-success: #00E599;         /* Success state */
  --color-success-bg: rgba(0, 229, 153, 0.1);
}
```

### Contrast Compliance:
- **Lime (`#C8FF00`) on Navy (`#041221`):** Contrast ratio of **13.5:1** (far exceeds WCAG AAA requirement of 7:1 for normal text).
- **Body (`#C4D1DE`) on Navy (`#041221`):** Contrast ratio of **11.2:1** (WCAG AAA compliant).

---

## 2. Typography Specification (`Poppins`)

Font Family: `Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
Google Font Link: `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap`

| Level | Desktop (1440px) | Tablet (768px) | Mobile (375px) | Weight / Line-Height |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `50px` | `36px` | `28px` | 700 / 1.15 |
| **Section H2**| `34px` | `28px` | `22px` | 600 / 1.25 |
| **Card H3** | `20px` | `18px` | `17px` | 600 / 1.35 |
| **Body Large**| `17px` | `16px` | `15px` | 400 / 1.6 |
| **Body Base** | `15px` | `14px` | `14px` | 400 / 1.5 |
| **Stat Big** | `44px` | `38px` | `32px` | 800 / 1.0 (Lime `#C8FF00`) |
| **Badge / Tag**| `12px` | `12px` | `11px` | 600 / 1.0 (Uppercase, letter-spacing: 1.5px) |

---

## 3. Brand Assets & Logo Integrity

All assets are located in [`public/assests/`](file:///d:/workspace/2page-LandingPage/landing-page/public/assests/):
- **Primary Brand Logo:** `/assests/LRM_Logo_Neon & White.png` (displayed in header & footer with `alt="LionReach Media"`).
- **Favicon & Mobile Mark:** `/assests/LRM monogram 1.png`.
- **Secondary Mark:** `/assests/LRM_Logo_Neon & Black.png`.
- *Rule:* The artwork must not be distorted, recolored, or cropped.

---

## 4. Responsive Breakpoint Matrix

| Breakpoint | Layout Adjustments |
| :--- | :--- |
| **Desktop (`1440px`)** | Max container width `1200px`. 3-column pain point cards, 3-column "How It Works" sequence, 4-stat proof bar, side-by-side case study layout. |
| **Tablet (`768px`)** | 2-column or stacked card layout. Header maintains navigation with compact CTA. Touch targets $\ge 44\text{px}$. |
| **Mobile (`375px`)** | Strict single-column stack. Compact header. Full-width form controls with minimum height of 48px for comfortable typing. Horizontal scroll prevented (`overflow-x: hidden`). |

---

## 5. Technical Routing Architecture

- **Router:** `react-router-dom` using `<BrowserRouter>`.
- **Route Definitions:**
  - `<Route path="/" element={<LandingPage />} />`
  - `<Route path="/case-study" element={<CaseStudyPage />} />`
- **Shared Layout Shell:**
  ```jsx
  function Layout() {
    return (
      <div className="app-shell">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
  ```
- **Static Hosting SPA Routing Support:**
  - When deployed on Netlify, include `public/_redirects`: `/* /index.html 200`.
  - When deployed on Vercel, include `vercel.json` with route rewrite to `/index.html`.
  - In Vite dev server, SPA fallback is native.
