import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Key, Sparkles, Mountain, Building2 } from 'lucide-react';

export default function TypesSection() {
  const realEstateSolutions = [
    {
      num: '01',
      title: 'Property Management',
      icon: Key,
      desc: 'Comprehensive management services for your premium properties ensuring high returns and peace of mind.',
      link: '/properties'
    },
    {
      num: '02',
      title: 'Luxury Developments',
      icon: Sparkles,
      desc: 'Discover our exclusive portfolio of luxury homes and commercial spaces tailored to your premium lifestyle.',
      link: '/properties'
    },
    {
      num: '03',
      title: 'Prime Lands & Acreage',
      icon: Mountain,
      desc: 'Strategic acquisition and disposition of prime developmental parcels, coastal bluffs, and vineyard estates.',
      link: '/properties?type=Land'
    },
    {
      num: '04',
      title: 'Penthouses & Mansions',
      icon: Building2,
      desc: 'Curated architectural sky penthouses, waterfront trophy estates, and private gated compounds in global gateway markets.',
      link: '/properties?type=Mansion'
    }
  ];

  return (
    <section className="types-section" id="services">
      <div className="archera-container with-left-rail">
        <div className="types-grid-wrapper">
          {/* Left Showcase Box: 50+ PROPERTIES SOLD */}
          <div className="types-experience-box">
            <div className="giant-number-row">
              <span className="giant-number">
                50<span style={{ fontSize: '0.65em', color: 'var(--color-accent)', marginLeft: '2px' }}>+</span>
              </span>
            </div>
            
            <div className="experience-caption">
              PROPERTIES<br />
              SOLD &amp;<br />
              ACQUIRED
            </div>

            <p className="experience-desc">
              Over 50+ luxury estates and landmark architectural properties successfully sold to global buyers with proven confidentiality and record returns.
            </p>

            <div>
              <Link to="/projects" className="btn-outline-gold" style={{ fontSize: '11px' }}>
                VIEW SOLD PROPERTIES
              </Link>
            </div>
          </div>

          {/* Right Heading + Solutions Cards */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span className="section-subtitle">SERVICES</span>
              <h2 className="section-title">
                We Provide Top-Tier Real Estate Designs
              </h2>
              <div className="gold-divider" />
            </div>

            <div className="types-cards-grid">
              {realEstateSolutions.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="type-card">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="type-card-number">{item.num}</span>
                        <Icon size={20} style={{ color: 'var(--color-accent)', opacity: 0.85 }} />
                      </div>
                      <h3 className="type-card-title font-heading">{item.title}</h3>
                      <p className="type-card-desc">{item.desc}</p>
                    </div>

                    <Link to={item.link} className="type-card-link">
                      <span>Explore Services</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
