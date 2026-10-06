import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, MapPin } from 'lucide-react';
import TypesSection from '../components/TypesSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
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
      {/* 1. HERO SECTION (THEMINEARCH REAL ESTATE / PREMIUM PROPERTIES) */}
      <section
        className="hero-section"
        style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="archera-container with-left-rail" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <span className="section-subtitle">
              WELCOME TO THEMINEARCH REAL ESTATE
            </span>

            <h1 className="hero-title font-heading">
              THEMINEARCH<br />
              <span className="highlight">REAL ESTATE</span><br />
              PREMIUM PROPERTIES
            </h1>

            <div className="gold-divider" />

            <p className="hero-lead">
              A private real estate brokerage representing architectural icons, oceanfront estates, prime development acreage, and luxury penthouses across Australia and North America.
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

      {/* 2. SERVICES SECTION -> PROPERTY MANAGEMENT & LUXURY DEVELOPMENTS (6 YEARS EXP) */}
      <TypesSection />

      {/* 3. PROJECT SECTION -> SOLD PROPERTIES WITH RED LOCATION PINS ON MAP */}
      <ProjectsSection properties={properties} />

      {/* 4. ABOUT SECTION (Real estate heritage, 6 Years, 12 Awards, 56 Sold) */}
      <AboutSection />

      {/* 5. TESTIMONIALS SECTION (Robert Smith CEO & Founder Review) */}
      <TestimonialsSection />

      {/* 6. LATEST SECTION (From Our Portfolio / Latest Properties) */}
      <LatestSection properties={properties} />

      {/* 7. CONTACT SECTION (Let's grab a coffee and start a conversation) */}
      <ContactSection />
    </div>
  );
}
