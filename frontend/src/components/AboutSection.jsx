import React, { useState } from 'react';
import { Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function AboutSection() {
  const [showPartners, setShowPartners] = useState(false);

  const leadership = [
    {
      name: 'Victoria Sterling',
      title: 'Senior Partner & Managing Broker',
      bio: 'Over 14 years specializing in prime residential estates and trophy architectural listings across Melbourne and international gateway markets.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Alexander Chen',
      title: 'Director of Coastal & Land Acquisitions',
      bio: 'Recognized authority in beachfront parcels and vineyard holdings, orchestrating discreet off-market acquisitions for family offices.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Marcus Montgomery',
      title: 'Principal Architecture Advisor',
      bio: 'Combining architectural appraisal expertise with high-value property development and landmark historic preservation.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="about-section" id="about-studio">
      <div className="archera-container with-left-rail">
        <div className="about-grid">
          {/* Left image of architecture & real estate team */}
          <div className="about-image-wrapper">
            <img
              src="/images/about_bg.jpg"
              alt="Archera real estate architects reviewing blueprints and scale model"
              className="about-image"
              loading="lazy"
              decoding="async"
            />
            {/* Subtle floating badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-accent)',
              boxShadow: 'var(--shadow-card)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '2px'
            }}>
              <Award size={24} style={{ color: 'var(--color-accent)' }} />
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  RECOGNIZED EXCELLENCE
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text)' }}>
                  Top Luxury Brokerage 2025
                </div>
              </div>
            </div>
          </div>

          {/* Right narrative content */}
          <div>
            <span className="section-subtitle">ABOUT ARCHERA</span>
            <h2 className="section-title">
              We curate extraordinary living spaces
            </h2>
            <div className="gold-divider" />

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.8, marginBottom: '18px' }}>
              Founded in 2018, Archera operates at the intersection of master architecture and premier real estate representation. We serve sovereign wealth funds, private families, and discerning individuals seeking exceptional residential compounds, coastal development lands, and urban penthouses.
            </p>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
              Unlike conventional real estate agencies, our partners have deep backgrounds in architectural design, zoning valuation, and historical preservation. Every estate in our portfolio is vetted for spatial harmony, structural integrity, and enduring capital value.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <button
                type="button"
                onClick={() => setShowPartners(!showPartners)}
                className="btn-gold"
                style={{ fontSize: '11px', cursor: 'pointer', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Users size={14} />
                <span>{showPartners ? 'HIDE SENIOR ADVISORS' : 'MEET SENIOR PARTNERS'}</span>
                {showPartners ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Stats matching reference layout: 12 Awards / 8 Years / 56 Properties */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">AWARDS WON</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">8</div>
                <div className="stat-label">YEARS EXPERIENCE</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">56</div>
                <div className="stat-label">PROPERTIES SOLD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Senior Partners & Advisors Section */}
        {showPartners && (
          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: '32px' }}>
              <span className="section-subtitle">EXECUTIVE LEADERSHIP</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--color-text)' }}>
                Senior Partners & Advisory Board
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {leadership.map((person) => (
                <div key={person.name} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '22px' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', color: 'var(--color-text)', marginBottom: '4px' }}>
                      {person.name}
                    </h4>
                    <div style={{ color: 'var(--color-accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
                      {person.title}
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
                      {person.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
