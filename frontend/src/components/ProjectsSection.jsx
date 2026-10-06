import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import PropertyMap from './PropertyMap';
import { scrollToSection } from '../utils/navigation';

export default function ProjectsSection({ properties = [] }) {
  const soldProperties = properties.filter((p) => p.sold);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSold = soldProperties[currentIndex] || soldProperties[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? soldProperties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === soldProperties.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="projects-section snap-section h-screen w-full flex-shrink-0 snap-start snap-always" id="sold-projects">
      <div className="archera-container with-left-rail">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', gap: '16px' }}>
          <div>
            <span className="section-subtitle" style={{ marginBottom: '6px' }}>RECORD-BREAKING PORTFOLIO</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 3.2vw, 38px)', marginBottom: '8px' }}>
              Landmark Transactions &amp; Sold Properties
            </h2>
            <div className="gold-divider" style={{ margin: '8px 0 10px 0' }} />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', maxWidth: '640px', lineHeight: 1.5, margin: 0 }}>
              Every completed transaction is mapped below. Red markers indicate landmark acquisitions and sold private estates handled by Archera.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('sold-projects')}
            className="btn-outline-gold"
            style={{ fontSize: '11px', cursor: 'pointer', background: 'transparent', padding: '9px 18px' }}
          >
            VIEW FULL SOLD PORTFOLIO →
          </button>
        </div>

        {/* Side-by-Side: Featured Sold Property Showcase (Left) + Interactive Map (Right) */}
        <div className="projects-split-layout">
          {/* Left: Featured Sold Property Showcase */}
          {activeSold && (
            <div
              className="projects-sold-showcase"
              style={{ backgroundImage: `url(${activeSold.image_url || '/images/hero_bg.jpg'})` }}
            >
              <div className="sold-card-overlay" />
              <div className="sold-card-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span className="badge-sold">
                    SOLD · {activeSold.sold_date || 'COMPLETED'}
                  </span>
                  <span className="badge-type" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                    {activeSold.property_type}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2.2vw, 28px)', color: '#FFFFFF', marginBottom: '6px' }}>
                  {activeSold.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontSize: '13px', marginBottom: '8px' }}>
                  <MapPin size={15} style={{ color: 'var(--color-red-sold)' }} />
                  <span>{activeSold.location}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: 'var(--color-accent)', marginBottom: '14px' }}>
                  {activeSold.price_formatted}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handlePrev}
                      className="btn-dark"
                      style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)', color: '#FFF' }}
                      aria-label="Previous sold property"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="btn-dark"
                      style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)', color: '#FFF' }}
                      aria-label="Next sold property"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <Link to={`/properties/${activeSold.id}`} className="btn-gold" style={{ padding: '9px 18px', fontSize: '11px' }}>
                    SEE PROJECT DETAILS
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right: Interactive Location Map */}
          <div className="projects-map-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--color-text)', fontWeight: 600 }}>
                  Global Location Map
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {soldProperties.length} Sold Transactions Plotted
              </span>
            </div>

            <div style={{ height: 'calc(100% - 45px)', minHeight: '340px' }}>
              <PropertyMap
                properties={properties}
                height="100%"
                zoom={3}
                center={[-20.0, 15.0]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
