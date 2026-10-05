import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, MapPin } from 'lucide-react';
import TypesSection from '../components/TypesSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import LatestSection from '../components/LatestSection';
import ContactSection from '../components/ContactSection';
import { api } from '../services/api';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {/* 1. HERO SECTION (Top Section - ARCHERA / REAL ESTATE / STUDIO) */}
      <section
        className="hero-section"
        style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="archera-container with-left-rail" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <span className="section-subtitle">
              WELCOME TO ARCHERA REAL ESTATE
            </span>

            <h1 className="hero-title font-heading">
              ARCHERA<br />
              <span className="highlight">REAL ESTATE</span><br />
              PORTFOLIO
            </h1>

            <div className="gold-divider" />

            <p className="hero-lead">
              A private brokerage representing architectural icons, oceanfront estates, vineyard acreage, and sky penthouses across Australia and North America.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link to="/properties" className="btn-gold">
                EXPLORE PROPERTIES
              </Link>
              <Link to="/projects" className="btn-outline-gold">
                VIEW SOLD PROJECTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION -> PROPERTY TYPES (Apartment, Land, House, Mansion + 8+ Years) */}
      <TypesSection />

      {/* 3. PROJECT SECTION -> SOLD PROPERTIES WITH RED LOCATION PINS ON MAP */}
      <ProjectsSection properties={properties} />

      {/* 4. ABOUT SECTION (Real estate heritage, 8 Years, 12 Awards, 56 Sold) */}
      <AboutSection />

      {/* 5. TESTIMONIALS SECTION -> COMPLETELY REMOVED AS REQUESTED */}

      {/* 6. LATEST SECTION (Replacing Blog/News -> Latest & Most Expensive Properties) */}
      <LatestSection properties={properties} />

      {/* 7. CONTACT SECTION (Reference Melbourne address, phone, email & functional contact form) */}
      <ContactSection />
    </div>
  );
}
