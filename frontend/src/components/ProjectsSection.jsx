import React, { useState } from 'react';
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
    <section className="projects-section" id="sold-projects">
      <div className="archera-container with-left-rail">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', gap: '20px' }}>
          <div>
            <span className="section-subtitle">RECORD-BREAKING PORTFOLIO</span>
            <h2 className="section-title">
              Landmark Transactions & Sold Properties
            </h2>
            <div className="gold-divider" />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', maxWidth: '580px', lineHeight: 1.7 }}>
              Every completed transaction is mapped below. Locations with red markers represent successful acquisitions and sold private estates handled by Archera.
            </p>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('sold-projects')}
            className="btn-outline-gold"
            style={{ fontSize: '11px', cursor: 'pointer', background: 'transparent' }}
          >
            VIEW FULL SOLD PORTFOLIO →
          </button>
        </div>

        {/* Featured Sold Property Showcase (like the reference Spain Interior slider) */}
        {activeSold && (
          <div style={{
            position: 'relative',
            minHeight: '440px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${activeSold.image_url || '/images/hero_bg.jpg'})`,
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.7) 40%, rgba(14,14,14,0.2) 100%)'
            }} />

            {/* Content overlay */}
            <div style={{ position: 'relative', zIndex: 2, padding: '40px', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span className="badge-sold">
                  SOLD · {activeSold.sold_date || 'COMPLETED'}
                </span>
                <span className="badge-type">{activeSold.property_type}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#ffffff', marginBottom: '8px' }}>
                    {activeSold.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    <MapPin size={16} style={{ color: 'var(--color-red-sold)' }} />
                    <span>{activeSold.location}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--color-accent)', marginTop: '8px' }}>
                    {activeSold.price_formatted}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Slider Prev/Next Controls */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handlePrev}
                      className="btn-dark"
                      style={{ padding: '10px 14px' }}
                      aria-label="Previous sold property"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="btn-dark"
                      style={{ padding: '10px 14px' }}
                      aria-label="Next sold property"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <Link to={`/properties/${activeSold.id}`} className="btn-gold" style={{ padding: '12px 24px', fontSize: '11px' }}>
                    SEE PROJECT DETAILS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Location Map with RED MARKERS for sold items */}
        <div style={{
          background: 'var(--color-bg-dark)',
          border: '1px solid var(--color-border)',
          padding: '24px',
          borderRadius: '2px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#ffffff' }}>
                Global Location Map
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
                Red pins indicate sold lands & properties; gold pins indicate currently available listings.
              </p>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 600 }}>
              {soldProperties.length} Sold Transactions Plotted
            </span>
          </div>

          <PropertyMap
            properties={properties}
            height="460px"
            zoom={3}
            center={[-20.0, 15.0]}
          />
        </div>
      </div>
    </section>
  );
}
