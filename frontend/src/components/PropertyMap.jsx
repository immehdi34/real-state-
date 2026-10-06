import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Plus, X, Layers, Check, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';

// Create custom 2D Leaflet divIcons
const createPinIcon = (isSold) => {
  const pinClass = isSold ? 'pin-sold' : 'pin-available';

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

// Draft pin icon for new property being placed
const createDraftPinIcon = (isSold) => {
  return L.divIcon({
    className: 'draft-map-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; animation: bounce 0.6s infinite alternate;">
        <div style="background: #e8a849; color: #141414; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 2px; margin-bottom: 2px;">NEW LOCATION</div>
        <div style="width: 20px; height: 20px; border-radius: 50%; background: ${isSold ? '#ef4444' : '#e8a849'}; border: 3px solid #fff; box-shadow: 0 0 16px ${isSold ? '#ef4444' : '#e8a849'};"></div>
      </div>
    `,
    iconSize: [80, 50],
    iconAnchor: [40, 45]
  });
};

// Map click listener for placing marker
function MapLocationPicker({ isPicking, onPick }) {
  useMapEvents({
    click(e) {
      if (isPicking && onPick) {
        onPick(e.latlng);
      }
    }
  });
  return null;
}

export default function PropertyMap({
  properties = [],
  height = '520px',
  center = [-37.8136, 144.9631], // Default centered on Melbourne
  zoom = 3,
  showControls = true,
  activeFilter = 'all',
  onPropertyAdded
}) {
  const [filter, setFilter] = useState(activeFilter);
  const [tileMode, setTileMode] = useState('google'); // 'google', 'satellite', 'dark'
  const [localProperties, setLocalProperties] = useState(properties);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);
  const [pickedLatLng, setPickedLatLng] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Synchronize local properties with props if props change
  React.useEffect(() => {
    setLocalProperties(properties);
  }, [properties]);

  // Form state for adding property
  const [form, setForm] = useState({
    title: '',
    property_type: 'Mansion',
    price: '',
    city: 'Melbourne',
    location: '',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4500,
    image_url: '/images/hero_bg.jpg',
    sold: false,
    description: ''
  });

  const tileLayers = {
    google: {
      name: 'Google Maps',
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps'
    },
    satellite: {
      name: 'Google Satellite',
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Satellite'
    },
    dark: {
      name: 'Dark Obsidian',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO'
    }
  };

  // Filter properties according to sold status
  const displayedProperties = localProperties.filter((p) => {
    if (!p.latitude || !p.longitude) return false;
    if (filter === 'sold') return p.sold;
    if (filter === 'available') return !p.sold;
    return true;
  });

  const handleMapClick = (latlng) => {
    setPickedLatLng(latlng);
    setIsPickingLocation(false);
    setShowAddModal(true);
  };

  const handleStartAdd = () => {
    setShowAddModal(true);
    if (!pickedLatLng) {
      setPickedLatLng({ lat: center[0], lng: center[1] });
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    if (!pickedLatLng) {
      alert('Please select a location on the map!');
      return;
    }

    try {
      setSubmitting(true);
      const newPropertyData = {
        ...form,
        price: Number(form.price) || 5000000,
        latitude: pickedLatLng.lat,
        longitude: pickedLatLng.lng,
        sold_date: form.sold ? new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase() : null
      };

      const res = await api.createProperty(newPropertyData);
      const created = res.property || { ...newPropertyData, id: 'prop-' + Date.now() };

      // Update state
      setLocalProperties((prev) => [created, ...prev]);
      if (onPropertyAdded) onPropertyAdded(created);

      setShowAddModal(false);
      setPickedLatLng(null);
      setToastMsg(`Successfully placed "${created.title}" marker on the map!`);
      setTimeout(() => setToastMsg(''), 4500);

      // Reset form
      setForm({
        title: '',
        property_type: 'Mansion',
        price: '',
        city: 'Melbourne',
        location: '',
        bedrooms: 4,
        bathrooms: 4,
        sqft: 4500,
        image_url: '/images/hero_bg.jpg',
        sold: false,
        description: ''
      });
    } catch (err) {
      alert('Failed to add property: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Toast Notice */}
      {toastMsg && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid var(--color-accent)',
          padding: '10px 20px',
          borderRadius: '2px',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 600,
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          ✨ {toastMsg}
        </div>
      )}

      {showControls && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '16px'
        }}>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)',
                display: 'inline-block'
              }} />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Red Pin = Sold Property / Land</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#e8a849',
                boxShadow: '0 0 8px rgba(232, 168, 73, 0.8)',
                display: 'inline-block'
              }} />
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Gold Pin = Available Listing</span>
            </div>
          </div>

          {/* Action Buttons: Tile Layer Switcher, Filter Pills & Add Property */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {/* Tile Layer Selector (Google Maps / Satellite / Dark) */}
            <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', padding: '2px', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setTileMode('google')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '2px',
                  background: tileMode === 'google' ? 'var(--color-accent)' : 'transparent',
                  color: tileMode === 'google' ? '#141414' : 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Google Maps Streets"
              >
                Google Maps
              </button>
              <button
                onClick={() => setTileMode('satellite')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '2px',
                  background: tileMode === 'satellite' ? 'var(--color-accent)' : 'transparent',
                  color: tileMode === 'satellite' ? '#141414' : 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Google Satellite"
              >
                Satellite
              </button>
              <button
                onClick={() => setTileMode('dark')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 10px',
                  borderRadius: '2px',
                  background: tileMode === 'dark' ? 'var(--color-accent)' : 'transparent',
                  color: tileMode === 'dark' ? '#141414' : 'var(--color-text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Obsidian Dark"
              >
                Dark
              </button>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'inline-flex', gap: '6px' }}>
              <button
                onClick={() => setFilter('all')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: '2px',
                  background: filter === 'all' ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.08)',
                  color: filter === 'all' ? '#141414' : '#ffffff',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}
              >
                All ({localProperties.length})
              </button>
              <button
                onClick={() => setFilter('sold')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: '2px',
                  background: filter === 'sold' ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  cursor: 'pointer'
                }}
              >
                Sold ({localProperties.filter((p) => p.sold).length})
              </button>
              <button
                onClick={() => setFilter('available')}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: '2px',
                  background: filter === 'available' ? 'var(--color-accent)' : 'rgba(232, 168, 73, 0.12)',
                  color: filter === 'available' ? '#141414' : 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer'
                }}
              >
                Available ({localProperties.filter((p) => !p.sold).length})
              </button>
            </div>

            {/* ADD PROPERTY BUTTON */}
            <button
              onClick={handleStartAdd}
              className="btn-gold"
              style={{
                fontSize: '11px',
                padding: '7px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Add property marker to map"
            >
              <Plus size={14} />
              <span>Add Property Location</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div style={{ height: height, width: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
        {/* Banner if user is currently picking a location by clicking */}
        {isPickingLocation && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-accent)',
            color: '#141414',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '12px',
            zIndex: 1000,
            boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MapPin size={16} />
            <span>Click anywhere on the map to set the property marker!</span>
          </div>
        )}

        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', cursor: isPickingLocation ? 'crosshair' : 'grab' }}
        >
          {/* Active Tile Layer (Google Maps Streets, Satellite, or Dark) */}
          <TileLayer
            attribution={tileLayers[tileMode].attribution}
            url={tileLayers[tileMode].url}
            maxZoom={19}
          />

          <MapLocationPicker
            isPicking={isPickingLocation}
            onPick={handleMapClick}
          />

          {/* Draft marker if picked */}
          {pickedLatLng && (
            <Marker
              position={[pickedLatLng.lat, pickedLatLng.lng]}
              icon={createDraftPinIcon(form.sold)}
            />
          )}

          {/* Render All Properties Markers */}
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
                    {prop.price_formatted || `$${Number(prop.price).toLocaleString()}`}
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
                    <span>View Property Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="section-subtitle" style={{ margin: 0 }}>MAP LOCATION PLOTTER</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#ffffff', marginTop: '4px' }}>
                  Add Property Marker
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleCreateProperty}>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pacific Coast Architectural Compound"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label">Property Type</label>
                  <select
                    value={form.property_type}
                    onChange={(e) => setForm({ ...form, property_type: e.target.value })}
                    className="form-select"
                  >
                    <option value="Mansion">Mansion</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment / Penthouse</option>
                    <option value="Land">Prime Land / Acreage</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 12500000"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Melbourne, Beverly Hills, New York"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Address / Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 104 Ocean Way"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Coordinates & Click-to-Pick on Map button */}
              <div style={{
                background: 'rgba(232, 168, 73, 0.08)',
                border: '1px solid var(--color-border-accent)',
                padding: '14px',
                borderRadius: '2px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                    Pin Coordinates (Lat, Lng)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setIsPickingLocation(true);
                    }}
                    style={{
                      background: 'var(--color-accent)',
                      color: '#141414',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    📍 Click Map to Pick
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Latitude"
                    value={pickedLatLng ? pickedLatLng.lat : ''}
                    onChange={(e) => setPickedLatLng({ ...pickedLatLng, lat: parseFloat(e.target.value) })}
                    className="form-input"
                    style={{ fontSize: '12px' }}
                  />
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Longitude"
                    value={pickedLatLng ? pickedLatLng.lng : ''}
                    onChange={(e) => setPickedLatLng({ ...pickedLatLng, lng: parseFloat(e.target.value) })}
                    className="form-input"
                    style={{ fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Image Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Property Image</label>
                <select
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="form-select"
                >
                  <option value="/images/hero_bg.jpg">Mansion Exterior (/images/hero_bg.jpg)</option>
                  <option value="/images/mansion_2.jpg">Waterfront Trophy Compound (/images/mansion_2.jpg)</option>
                  <option value="/images/apartment_1.jpg">Skyline Penthouse (/images/apartment_1.jpg)</option>
                  <option value="/images/apartment_2.jpg">Duplex Residence (/images/apartment_2.jpg)</option>
                  <option value="/images/house_1.jpg">Contemporary Residence (/images/house_1.jpg)</option>
                  <option value="/images/house_2.jpg">Alpine Sanctuary (/images/house_2.jpg)</option>
                  <option value="/images/land_1.jpg">Vineyard Parcel (/images/land_1.jpg)</option>
                  <option value="/images/land_2.jpg">Oceanfront Bluff Acreage (/images/land_2.jpg)</option>
                  <option value="/images/land_3.jpg">Napa Valley Estate Land (/images/land_3.jpg)</option>
                </select>
              </div>

              {/* Sold Checkbox */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#ffffff' }}>
                  <input
                    type="checkbox"
                    checked={form.sold}
                    onChange={(e) => setForm({ ...form, sold: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#ef4444' }}
                  />
                  <span>
                    Mark as <strong>SOLD</strong> (Will display as a <strong>RED PIN</strong> on the map)
                  </span>
                </label>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px', marginLeft: '26px' }}>
                  Leave unchecked to mark as <strong>AVAILABLE (GOLD PIN)</strong>.
                </span>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-outline-gold"
                  style={{ fontSize: '11px', padding: '10px 18px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ fontSize: '11px', padding: '10px 22px' }}
                >
                  {submitting ? 'Placing Marker...' : 'Publish & Place Pin on Map'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
