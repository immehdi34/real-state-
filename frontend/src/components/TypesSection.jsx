import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Mountain, Home, Landmark } from 'lucide-react';

export default function TypesSection() {
  const propertyCategories = [
    {
      num: '01',
      title: 'Apartment',
      icon: Building,
      desc: 'High-elevation penthouses, boutique duplexes, and skyline architectural sanctuaries in premier global metropolitan centers.',
      typeQuery: 'Apartment'
    },
    {
      num: '02',
      title: 'Land',
      icon: Mountain,
      desc: 'Prime developmental parcels, oceanfront coastal bluffs, vineyard acreage, and private gated estate land ready for custom builds.',
      typeQuery: 'Land'
    },
    {
      num: '03',
      title: 'House',
      icon: Home,
      desc: 'Bespoke modern residences, mid-century restorations, and coastal family compounds crafted by celebrated architectural masters.',
      typeQuery: 'House'
    },
    {
      num: '04',
      title: 'Mansion',
      icon: Landmark,
      desc: 'Historic heritage estates, expansive gated country compounds, and deepwater waterfront mansions accommodating superyachts.',
      typeQuery: 'Mansion'
    }
  ];

  return (
    <section className="types-section" id="property-types">
      <div className="archera-container with-left-rail">
        <div className="types-grid-wrapper">
          {/* Left Experience Box matching reference */}
          <div className="types-experience-box">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span className="giant-number">8</span>
              <span style={{ fontSize: '48px', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', marginTop: '16px' }}>+</span>
            </div>
            <div className="experience-caption">
              YEARS OF EXCELLENCE IN LUXURY REAL ESTATE
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '18px', lineHeight: 1.7 }}>
              Since 2018, Archera has represented benchmark residential acquisitions, development lands, and private estates across Australia and North America.
            </p>
            <div style={{ marginTop: '28px' }}>
              <Link to="/properties" className="btn-outline-gold" style={{ fontSize: '11px' }}>
                VIEW ALL PROPERTIES
              </Link>
            </div>
          </div>

          {/* Right Heading + 4 Cards Grid */}
          <div>
            <div style={{ marginBottom: '36px' }}>
              <span className="section-subtitle">PORTFOLIO CATEGORIES</span>
              <h2 className="section-title">
                We offer top leading properties
              </h2>
              <div className="gold-divider" />
            </div>

            <div className="types-cards-grid">
              {propertyCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.title} className="type-card">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="type-card-number">{cat.num}</span>
                        <Icon size={20} style={{ color: 'var(--color-accent)', opacity: 0.8 }} />
                      </div>
                      <h3 className="type-card-title font-heading">{cat.title}</h3>
                      <p className="type-card-desc">{cat.desc}</p>
                    </div>

                    <Link to={`/properties?type=${cat.typeQuery}`} className="type-card-link">
                      <span>Explore {cat.title}s</span>
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
