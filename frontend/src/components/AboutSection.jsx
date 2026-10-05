import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, CheckCircle } from 'lucide-react';

export default function AboutSection() {
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
            />
            {/* Subtle floating badge */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              background: 'rgba(20, 20, 20, 0.94)',
              border: '1px solid var(--color-border-accent)',
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
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
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
              <Link to="/about" className="btn-gold" style={{ fontSize: '11px' }}>
                LEARN MORE ABOUT US
              </Link>
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
      </div>
    </section>
  );
}
