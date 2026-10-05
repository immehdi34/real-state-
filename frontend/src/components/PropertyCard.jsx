import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';

export default function PropertyCard({ property }) {
  if (!property) return null;

  const isLand = property.property_type?.toLowerCase() === 'land';

  return (
    <article className="portfolio-card">
      <div className="portfolio-card-img-wrap">
        <img
          src={property.image_url || '/images/hero_bg.jpg'}
          alt={property.title}
          className="portfolio-card-img"
          loading="lazy"
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <span className="badge-type">{property.property_type}</span>
          {property.sold ? (
            <span className="badge-sold">
              SOLD {property.sold_date || ''}
            </span>
          ) : (
            <span className="badge-available">
              AVAILABLE
            </span>
          )}
        </div>
      </div>

      <div className="portfolio-card-body">
        <div className="portfolio-card-meta">
          <span>{property.city}, {property.country || property.state}</span>
          <span>{property.listed_at || 'EXCLUSIVE'}</span>
        </div>

        <h3 className="portfolio-card-title">
          <Link to={`/properties/${property.id}`} style={{ color: '#ffffff' }}>
            {property.title}
          </Link>
        </h3>

        <div className="portfolio-card-location" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={14} style={{ color: property.sold ? 'var(--color-red-sold)' : 'var(--color-accent)', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {property.location}
          </span>
        </div>

        {/* Specs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          margin: '14px 0 20px 0',
          padding: '12px 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '12px',
          color: 'var(--color-text-secondary)'
        }}>
          {!isLand && property.bedrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bed size={15} style={{ color: 'var(--color-accent)' }} />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {!isLand && property.bathrooms > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bath size={15} style={{ color: 'var(--color-accent)' }} />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.sqft && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Maximize2 size={15} style={{ color: 'var(--color-accent)' }} />
              <span>{isLand ? `${(property.sqft / 43560).toFixed(1)} Acres` : `${property.sqft.toLocaleString()} Sq Ft`}</span>
            </div>
          )}
        </div>

        {/* Footer: Price + Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-text-muted)' }}>
              {property.sold ? 'FINAL TRANSACTION' : 'OFFERING PRICE'}
            </div>
            <div className="portfolio-card-price">
              {property.price_formatted}
            </div>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="btn-outline-gold"
            style={{ padding: '8px 16px', fontSize: '11px', letterSpacing: '1px' }}
          >
            <span>VIEW</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
