import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import PropertyMap from '../components/PropertyMap';
import { api } from '../services/api';

export default function ProjectsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api.getProperties({ sold: 'true' });
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error('Failed to load sold projects:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const totalVolume = properties.reduce((acc, p) => acc + (p.price || 0), 0);

  return (
    <div style={{ paddingTop: 'var(--header-height)', background: 'var(--color-bg-dark)' }}>
      {/* Header Banner */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '80px 0 50px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <span className="section-subtitle">TRANSACTION ARCHIVE</span>
          <h1 className="section-title">
            Sold Projects & Land Acquisitions
          </h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '680px', lineHeight: 1.7 }}>
            Every pin below with a <strong style={{ color: '#ef4444' }}>red marker</strong> represents an estate or development land parcel successfully brokered and closed by Archera.
          </p>
        </div>
      </section>

      {/* Metrics Row */}
      <section style={{ background: 'var(--color-bg-section)', padding: '32px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div style={{ borderLeft: '2px solid #ef4444', paddingLeft: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                CLOSED TRANSACTIONS
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--color-text)', marginTop: '4px' }}>
                {properties.length} Estates & Lands
              </div>
            </div>

            <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                AGGREGATE CLOSED VOLUME
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--color-accent)', marginTop: '4px' }}>
                ${(totalVolume / 1000000).toFixed(1)}M+
              </div>
            </div>

            <div style={{ borderLeft: '2px solid var(--color-border-accent)', paddingLeft: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                MEDIAN DAYS ON MARKET
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--color-text)', marginTop: '4px' }}>
                42 Days
              </div>
            </div>

            <div style={{ borderLeft: '2px solid #ef4444', paddingLeft: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                MAP MARKER LEGEND
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span>RED MARKER = SOLD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Interactive Map with Red Markers */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text)' }}>
                Interactive Global Sold Map
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
                Click on any red pin to inspect closing valuation, property type, and transaction details.
              </p>
            </div>
            <div className="badge-sold" style={{ padding: '6px 14px' }}>
              RED MARKER: SOLD PROPERTIES
            </div>
          </div>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
            <PropertyMap
              properties={properties}
              height="550px"
              zoom={3}
              center={[-20.0, 15.0]}
              showControls={false}
            />
          </div>
        </div>
      </section>

      {/* Grid of Sold Properties */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="archera-container with-left-rail">
          <div style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">TRANSACTED ARCHIVE</span>
            <h2 className="section-title">
              Complete Transacted Estates & Lands
            </h2>
            <div className="gold-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
            {properties.map((prop) => (
              <article key={prop.id} className="portfolio-card">
                <div className="portfolio-card-img-wrap" style={{ height: '260px' }}>
                  <img
                    src={prop.image_url || '/images/hero_bg.jpg'}
                    alt={prop.title}
                    className="portfolio-card-img"
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                    <span className="badge-type">{prop.property_type}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                    <span className="badge-sold">
                      SOLD · {prop.sold_date || 'COMPLETED'}
                    </span>
                  </div>
                </div>

                <div className="portfolio-card-body">
                  <div className="portfolio-card-meta">
                    <span style={{ color: 'var(--color-red-sold)', fontWeight: 700 }}>
                      CLOSED: {prop.sold_date}
                    </span>
                    <span>{prop.city}</span>
                  </div>

                  <h3 className="portfolio-card-title">
                    <Link to={`/properties/${prop.id}`} style={{ color: 'var(--color-text)' }}>
                      {prop.title}
                    </Link>
                  </h3>

                  <div className="portfolio-card-location" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} style={{ color: 'var(--color-red-sold)', flexShrink: 0 }} />
                    <span>{prop.location}</span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {prop.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                        RECORD SALE PRICE
                      </div>
                      <div className="portfolio-card-price">
                        {prop.price_formatted}
                      </div>
                    </div>

                    <Link
                      to={`/properties/${prop.id}`}
                      className="btn-outline-gold"
                      style={{ padding: '8px 16px', fontSize: '11px' }}
                    >
                      <span>DETAILS</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
