import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LeftRail from './components/LeftRail';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Code splitting / Lazy-loaded subpages for fast initial load
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const LatestPage = lazy(() => import('./pages/LatestPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Helper component to scroll to top only for isolated subpages like /admin or /properties/:id
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/properties/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg-dark)', color: 'var(--color-text)' }}>
        {/* Fixed Header Navbar */}
        <Navbar />

        {/* 60px Left Vertical Fixed Rail for Desktop */}
        <LeftRail />

        {/* Main Routed Page Content */}
        <main style={{ flex: 1 }}>
          <Suspense fallback={
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '32px', height: '32px', border: '2px solid rgba(232,168,73,0.2)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          }>
            <Routes>
              {/* All section routes render the full HomePage with auto-scroll so the entire website is always scrollable */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage defaultSection="about-studio" />} />
              <Route path="/services" element={<HomePage defaultSection="services" />} />
              <Route path="/properties" element={<HomePage defaultSection="latest-properties" />} />
              <Route path="/projects" element={<HomePage defaultSection="sold-projects" />} />
              <Route path="/latest" element={<HomePage defaultSection="latest-properties" />} />
              <Route path="/contact" element={<HomePage defaultSection="contact" />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Catch-all redirect to full Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
