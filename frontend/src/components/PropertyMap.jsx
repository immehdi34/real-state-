import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';

// Create custom 2D Leaflet divIcons
const createPinIcon = (isSold) => {
  const pinClass = isSold ? 'pin-sold' : 'pin-available';
  const label = isSold ? 'SOLD' : '';

  const html = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      ${isSold ? `<div style="background: #ef4444; color: #fff; font-size: 9px; font-weight: 800; letter-spacing: 1px; padding: 2px 6px; border-radius: 2px; margin-bottom: 2px; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.6); text-transform: uppercase;">SOLD</div>` : ''}
      <div class="pin-marker ${pinClass}">
        <div class="pin-inner-dot"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-map-pin',
    html: html,
    iconSize: [36, isSold ? 50 : 36],
    iconAnchor: [18, isSold ? 46 : 32],
    popupAnchor: [0, isSold ? -48 : -34]
  });
};

export default function PropertyMap({
  properties = [],
  height = '520px',
  center = [-37.8136, 144.9631], // Default centered on Melbourne / international
  zoom = 3,
  showControls = true,
  activeFilter = 'all' // 'all', 'sold', 'available'
}) {
  const [filter, setFilter] = useState(activeFilter);

  // Filter properties according to sold status
  const displayedProperties = properties.filter((p) => {
    if (!p.latitude || !p.longitude) return false;
    if (filter === 'sold') return p.sold;
    if (filter === 'available') return !p.sold;
    return true;
  });

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {showControls && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)',
                display: 'inline-block'
              }} />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Red Marker = Sold Property / Land</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#e8a849',
                boxShadow: '0 0 8px rgba(232, 168, 73, 0.8)',
                display: 'inline-block'
              }} />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Gold Marker = Available Listing</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '2px',
                background: filter === 'all' ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.08)',
                color: filter === 'all' ? '#141414' : '#ffffff',
                border: '1px solid var(--color-border)'
              }}
            >
              All ({properties.length})
            </button>
            <button
              onClick={() => setFilter('sold')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '2px',
                background: filter === 'sold' ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(239, 68, 68, 0.4)'
              }}
            >
              Sold Only ({properties.filter((p) => p.sold).length})
            </button>
            <button
              onClick={() => setFilter('available')}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '2px',
                background: filter === 'available' ? 'var(--color-accent)' : 'rgba(232, 168, 73, 0.12)',
                color: filter === 'available' ? '#141414' : 'var(--color-accent)',
                border: '1px solid var(--color-border)'
              }}
            >
              Available ({properties.filter((p) => !p.sold).length})
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div style={{ height: height, width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Dark CARTO Basemap Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />

          {displayedProperties.map((prop) => (
            <Marker
              key={prop.id}
              position={[prop.latitude, prop.longitude]}
              icon={createPinIcon(prop.sold)}
            >
              <Popup>
                <div style={{ width: '220px', fontFamily: 'var(--font-body)' }}>
                  <img
                    src={prop.image_url || '/images/hero_bg.jpg'}
                    alt={prop.title}
                    style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '2px', marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge-type" style={{ fontSize: '10px' }}>{prop.property_type}</span>
                    {prop.sold ? (
                      <span className="badge-sold" style={{ fontSize: '10px', padding: '2px 6px' }}>
                        SOLD {prop.sold_date || ''}
                      </span>
                    ) : (
                      <span className="badge-available" style={{ fontSize: '10px', padding: '2px 6px' }}>
                        AVAILABLE
                      </span>
                    )}
                  </div>
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '15px',
                    color: '#ffffff',
                    marginTop: '6px',
                    marginBottom: '4px'
                  }}>
                    {prop.title}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '6px' }}>
                    {prop.location}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '16px',
                    color: 'var(--color-accent)',
                    marginBottom: '10px'
                  }}>
                    {prop.price_formatted}
                  </div>
                  <Link
                    to={`/properties/${prop.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent)'
                    }}
                  >
                    <span>View Property</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
