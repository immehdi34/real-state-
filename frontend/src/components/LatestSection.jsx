import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, TrendingUp } from 'lucide-react';

export default function LatestSection({ properties = [] }) {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' or 'expensive'

  // Filter available properties
  const availableProps = properties.filter((p) => !p.sold);

  // Latest properties (sorted by listed_at or reverse order)
  const latestList = [...availableProps].slice(0, 3);

  // Most expensive properties (sorted by price descending)
  const expensiveList = [...availableProps].sort((a, b) => b.price - a.price).slice(0, 3);

  const displayList = activeTab === 'latest' ? latestList : expensiveList;

  return (
    <section className="latest-section" id="latest-properties">
      <div className="archera-container with-left-rail">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', gap: '20px' }}>
          <div>
            <span className="section-subtitle">CURATED COLLECTIONS</span>
            <h2 className="section-title">
              From Our Portfolio
            </h2>
            <div className="gold-divider" />
          </div>

          <Link to="/latest" className="btn-outline-gold" style={{ fontSize: '11px' }}>
            VIEW FULL COLLECTION →
          </Link>
        </div>

        {/* Tab Toggle buttons */}
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab('latest')}
            className={`tab-btn ${activeTab === 'latest' ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} />
              <span>Latest Arrivals</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('expensive')}
            className={`tab-btn ${activeTab === 'expensive' ? 'active' : ''}`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} />
              <span>Highest Valuation & Trophy Estates</span>
            </span>
          </button>
        </div>

        {/* 3 Columns Cards Grid matching reference blog layout */}
        <div className="property-cards-3col">
          {displayList.map((item) => (
            <article key={item.id} className="portfolio-card">
              <div className="portfolio-card-img-wrap">
                <img
                  src={item.image_url || '/images/hero_bg.jpg'}
                  alt={item.title}
                  className="portfolio-card-img"
                  loading="lazy"
                />
                <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                  <span className="badge-type">{item.property_type}</span>
                </div>
              </div>

              <div className="portfolio-card-body">
                <div className="portfolio-card-meta">
                  <span>{item.listed_at || 'MARCH 2026'}</span>
                  <span>{item.city}</span>
                </div>

                <h3 className="portfolio-card-title">
                  <Link to={`/properties/${item.id}`} style={{ color: '#ffffff' }}>
                    {item.title}
                  </Link>
                </h3>

                <div className="portfolio-card-location" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.location}
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                      OFFERED AT
                    </div>
                    <div className="portfolio-card-price">
                      {item.price_formatted}
                    </div>
                  </div>

                  <Link
                    to={`/properties/${item.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>Read More</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
