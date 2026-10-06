import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Shield, Users, MapPin, ArrowRight } from 'lucide-react';
import ContactSection from '../components/ContactSection';

export default function AboutPage() {
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
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Page Header */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '80px 0 60px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <span className="section-subtitle">THE FIRM</span>
          <h1 className="section-title">
            About Archera Real Estate
          </h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', maxWidth: '680px', lineHeight: 1.7 }}>
            Curating rare architectural estates, coastal lands, and sky residences for ultra-high-net-worth individuals and family offices worldwide.
          </p>
        </div>
      </section>

      {/* Main Narrative with Blueprint Image */}
      <section style={{ padding: '80px 0', background: 'var(--color-bg-section)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/images/about_bg.jpg"
                alt="Archera Team"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '460px', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--color-border)' }}
              />
            </div>

            <div>
              <span className="section-subtitle">OUR PHILOSOPHY</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', color: 'var(--color-text)', marginBottom: '20px' }}>
                Architecture As Lasting Capital
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
                Established in 2018 with headquarters in Melbourne, Archera was founded on a singular conviction: extraordinary architecture represents the safest and most transcendent store of generational wealth.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
                We reject transactional volume in favor of rigorous curation. Whether acquiring a 20-acre Napa Valley vineyard or selling an oceanfront compound in Palm Beach, our advisors bring architectural literacy, discrete negotiation, and institutional underwriting to every deal.
              </p>

              {/* Stats Bar */}
              <div className="stats-grid" style={{ marginTop: '20px' }}>
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

      {/* Leadership Partners */}
      <section style={{ padding: '80px 0', background: 'var(--color-bg-dark)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ marginBottom: '48px' }}>
            <span className="section-subtitle">LEADERSHIP</span>
            <h2 className="section-title">Senior Partners & Advisors</h2>
            <div className="gold-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {leadership.map((person) => (
              <div key={person.name} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text)', marginBottom: '6px' }}>
                    {person.name}
                  </h3>
                  <div style={{ color: 'var(--color-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
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
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
