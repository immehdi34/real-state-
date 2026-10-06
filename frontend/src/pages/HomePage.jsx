import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, MapPin } from 'lucide-react';
import ArcheraLogo from '../components/ArcheraLogo';
import TypesSection from '../components/TypesSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import LatestSection from '../components/LatestSection';
import ContactSection from '../components/ContactSection';
import { api } from '../services/api';
import { scrollToSection } from '../utils/navigation';

export default function HomePage({ defaultSection }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await api.getProperties();
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error('Error loading properties for home page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  // Handle auto-scroll on mount or route change to section
  useEffect(() => {
    const target = defaultSection || (location.hash ? location.hash.replace('#', '') : null);
    if (target) {
      const timer = setTimeout(() => {
        scrollToSection(target);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [defaultSection, location.pathname, location.hash]);

  return (
    <div>
      {/* 1. HERO SECTION (ARCHERA REAL ESTATES / PREMIUM PROPERTIES) */}
      <section
        className="hero-section"
        id="hero"
        style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="archera-container with-left-rail" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <div className="hero-badge-row" style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <ArcheraLogo size={34} />
              <span className="section-subtitle" style={{ margin: 0 }}>
                WELCOME TO ARCHERA REAL ESTATES
              </span>
            </div>

            <h1 className="hero-title font-heading">
              ARCHERA<br />
              <span className="highlight">REAL ESTATES</span><br />
              PREMIUM PROPERTIES
            </h1>

            <div className="gold-divider" />

            <p className="hero-lead">
              A private real estate brokerage representing architectural icons, oceanfront estates, prime development acreage, and luxury penthouses across Australia and North America.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => scrollToSection('latest-properties')}
                className="btn-gold"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                EXPLORE PROPERTIES
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sold-projects')}
                className="btn-outline-gold"
                style={{ cursor: 'pointer', background: 'transparent' }}
              >
                VIEW SOLD PROJECTS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION -> PROPERTY MANAGEMENT & LUXURY DEVELOPMENTS (6 YEARS EXP) */}
      <TypesSection />

      {/* 3. PROJECT SECTION -> SOLD PROPERTIES WITH RED LOCATION PINS ON MAP */}
      <ProjectsSection properties={properties} />

      {/* 4. ABOUT SECTION (Real estate heritage, 12 Awards, 56 Sold) */}
      <AboutSection />

      {/* 5. LATEST SECTION (Our Properties / Latest Properties) */}
      <LatestSection properties={properties} />

      {/* 7. CONTACT SECTION (Let's grab a coffee and start a conversation) */}
      <ContactSection />
    </div>
  );
}
