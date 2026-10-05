import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Calendar, Phone, Mail, ArrowLeft, Check, Share2 } from 'lucide-react';
import { api } from '../services/api';
import ScheduleTourModal from '../components/ScheduleTourModal';
import PropertyMap from '../components/PropertyMap';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      try {
        setLoading(true);
        const data = await api.getProperty(id);
        if (data.property) {
          setProperty(data.property);
          setActiveImage(data.property.image_url || data.property.images?.[0] || '/images/hero_bg.jpg');
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError(err.message || 'Error loading property');
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: '160px', paddingBottom: '160px', textAlign: 'center', background: 'var(--color-bg-dark)' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-accent)' }}>
          Loading Archera Estate Details...
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ paddingTop: '160px', paddingBottom: '160px', textAlign: 'center', background: 'var(--color-bg-dark)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '16px' }}>{error || 'Estate Not Found'}</h2>
        <Link to="/properties" className="btn-gold">RETURN TO COLLECTION</Link>
      </div>
    );
  }

  const isLand = property.property_type?.toLowerCase() === 'land';

  return (
    <div style={{ paddingTop: 'var(--header-height)', background: 'var(--color-bg-dark)' }}>
      {/* Top Breadcrumb / Return */}
      <div style={{ background: 'var(--color-bg-section)', borderBottom: '1px solid var(--color-border)', padding: '16px 0' }}>
        <div className="archera-container with-left-rail" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/properties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--color-accent)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Properties</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge-type">{property.property_type}</span>
            {property.sold ? (
              <span className="badge-sold">SOLD {property.sold_date || ''}</span>
            ) : (
              <span className="badge-available">AVAILABLE</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Gallery Area */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          {/* Main Large Image */}
          <div style={{ width: '100%', height: '540px', overflow: 'hidden', borderRadius: '2px', position: 'relative', marginBottom: '16px' }}>
            <img
              src={activeImage}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {property.sold && (
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: '#ef4444',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '13px',
                letterSpacing: '2px',
                padding: '6px 16px',
                borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.6)'
              }}>
                SOLD TRANSACTION
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {property.images && property.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '120px',
                    height: '80px',
                    flexShrink: 0,
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: activeImage === img ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    opacity: activeImage === img ? 1 : 0.6
                  }}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Details & Booking Layout */}
      <section style={{ padding: '60px 0 100px 0' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
            {/* Left Column: Title, Specs, Description, Amenities, Map */}
            <div style={{ gridColumn: 'span 2' }}>
              <span className="section-subtitle">{property.city} · {property.country || property.state}</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 48px)', color: '#ffffff', marginBottom: '12px', lineHeight: 1.15 }}>
                {property.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
                <MapPin size={18} style={{ color: property.sold ? 'var(--color-red-sold)' : 'var(--color-accent)' }} />
                <span>{property.location}</span>
              </div>

              {/* Specs Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '16px',
                padding: '24px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                marginBottom: '40px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    VALUATION
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-accent)', marginTop: '4px' }}>
                    {property.price_formatted}
                  </div>
                </div>

                {!isLand && (
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      BEDROOMS
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                      {property.bedrooms || '—'}
                    </div>
                  </div>
                )}

                {!isLand && (
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      BATHROOMS
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                      {property.bathrooms || '—'}
                    </div>
                  </div>
                )}

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    TOTAL AREA
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                    {isLand ? `${(property.sqft / 43560).toFixed(1)} Acres` : `${property.sqft?.toLocaleString()} Sq Ft`}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    STATUS
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: property.sold ? 'var(--color-red-sold)' : 'var(--color-accent)', marginTop: '6px' }}>
                    {property.sold ? `SOLD (${property.sold_date || ''})` : 'ACTIVE LISTING'}
                  </div>
                </div>
              </div>

              {/* Narrative Description */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#ffffff', marginBottom: '16px' }}>
                  Architectural Overview
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#ffffff', marginBottom: '20px' }}>
                    Estate Features & Amenities
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    {property.amenities.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '14px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(232, 168, 73, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={12} style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Location Map with Pin */}
              {property.latitude && property.longitude && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#ffffff' }}>
                      Estate Location
                    </h3>
                    {property.sold ? (
                      <span className="badge-sold">RED PIN = SOLD LOCATION</span>
                    ) : (
                      <span className="badge-available">GOLD PIN = AVAILABLE LISTING</span>
                    )}
                  </div>
                  <PropertyMap
                    properties={[property]}
                    height="380px"
                    zoom={12}
                    center={[property.latitude, property.longitude]}
                    showControls={false}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Private Broker Card & Actions */}
            <div>
              <div style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-accent)',
                padding: '36px',
                borderRadius: '2px',
                position: 'sticky',
                top: '120px'
              }}>
                <div className="section-subtitle">PRIVATE ADVISOR</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#ffffff', marginBottom: '6px' }}>
                  Victoria Sterling
                </h4>
                <div style={{ color: 'var(--color-accent)', fontSize: '12px', fontWeight: 600, marginBottom: '20px' }}>
                  Managing Broker · Melbourne
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', fontSize: '14px' }}>
                  <a href="tel:+7068980751" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)' }}>
                    <Phone size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>(+706) 898-0751</span>
                  </a>
                  <a href="mailto:victoria@archera.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)' }}>
                    <Mail size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>victoria@archera.com</span>
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                    <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
                    <span>69 Queen St, Melbourne, Australia</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsTourModalOpen(true)}
                  className="btn-gold"
                  style={{ width: '100%', marginBottom: '14px' }}
                >
                  SCHEDULE PRIVATE VIEWING
                </button>

                <Link
                  to="/contact"
                  className="btn-outline-gold"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  REQUEST DOSSIER
                </Link>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  Representation protected under NDA & Brokerage Regulations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Tour Modal */}
      <ScheduleTourModal
        property={property}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </div>
  );
}
