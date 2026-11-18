import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import CaseStudyPage from './pages/CaseStudyPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/case-study" element={<CaseStudyPage />} />
      </Route>
    </Routes>
  )
}
