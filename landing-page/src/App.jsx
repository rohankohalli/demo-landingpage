import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import './App.css'

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/case-study"
          element={
            <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading case study...</div>}>
              <CaseStudyPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
