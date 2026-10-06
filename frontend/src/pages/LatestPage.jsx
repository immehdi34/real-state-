import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight, MapPin } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { api } from '../services/api';

export default function LatestPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api.getProperties({ sold: 'false' });
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error('Failed to load latest properties:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const latestProperties = [...properties].slice(0, 4);
  const expensiveProperties = [...properties].sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <div style={{ paddingTop: 'var(--header-height)', background: 'var(--color-bg-dark)' }}>
      {/* Header Banner */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '80px 0 50px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <span className="section-subtitle">NEW ARRIVALS & TROPHY LISTINGS</span>
          <h1 className="section-title">
            Latest & Highest Valuation Estates
          </h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '680px', lineHeight: 1.7 }}>
            Fresh off-market additions alongside the most valuable and iconic properties currently represented by Archera.
          </p>
        </div>
      </section>

      {/* Part 1: Latest Arrivals */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Sparkles size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="section-subtitle" style={{ margin: 0 }}>NEW TO MARKET</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: 'var(--color-text)', marginBottom: '32px' }}>
            Latest Real Estate Acquisitions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {latestProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Highest Valuation Trophy Estates */}
      <section style={{ padding: '80px 0 120px 0', background: 'var(--color-bg-section)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <TrendingUp size={20} style={{ color: 'var(--color-accent)' }} />
            <span className="section-subtitle" style={{ margin: 0 }}>PINNACLE ASSETS</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: 'var(--color-text)', marginBottom: '32px' }}>
            Highest Valuation & Trophy Properties
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {expensiveProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
