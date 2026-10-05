import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Globe } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { api } from '../services/api';

const melbourneIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div style="background: #e8a849; color: #141414; font-size: 9px; font-weight: 800; letter-spacing: 1px; padding: 2px 6px; border-radius: 2px; margin-bottom: 2px; box-shadow: 0 2px 8px rgba(232, 168, 73, 0.6); text-transform: uppercase;">HQ</div>
      <div class="pin-marker pin-available">
        <div class="pin-inner-dot"></div>
      </div>
    </div>
  `,
  iconSize: [36, 48],
  iconAnchor: [18, 44],
  popupAnchor: [0, -46]
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Acquisition Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide your name, email, and message.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Acquisition Inquiry', message: '' });
    } catch (err) {
      setError(err.message || 'Error transmitting message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)', background: 'var(--color-bg-dark)' }}>
      {/* Header Banner */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '80px 0 50px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <span className="section-subtitle">HEADQUARTERS & GLOBAL DESKS</span>
          <h1 className="section-title">
            Contact Archera Real Estate
          </h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '680px', lineHeight: 1.7 }}>
            Headquartered at 69 Queen St, Melbourne, with advisory desks serving Sydney, New York, and Beverly Hills.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px' }}>
            {/* Left Info Column */}
            <div>
              <span className="section-subtitle">MELBOURNE HEADQUARTERS</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#ffffff', marginBottom: '20px' }}>
                Private Advisory Office
              </h2>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <MapPin size={22} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                      PHYSICAL ADDRESS
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                      69 Queen St, Melbourne<br />Australia
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <Phone size={22} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                      DIRECT TELEPHONE
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>
                      <a href="tel:+7068980751" style={{ color: 'inherit' }}>(+706) 898-0751</a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <Mail size={22} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                      CONFIDENTIAL EMAIL
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-accent)', marginTop: '4px' }}>
                      <a href="mailto:contact@archera.com" style={{ color: 'inherit' }}>contact@archera.com</a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <Clock size={22} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                      OPERATING HOURS
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      Monday – Friday: 8:00 AM – 7:00 PM AEST<br />
                      Weekends: By private appointment only
                    </div>
                  </div>
                </div>
              </div>

              {/* International Desks */}
              <div style={{ padding: '24px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  <Globe size={16} />
                  <span>Affiliate Desks</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Sydney:</strong> Barangaroo Tower 1</div>
                  <div><strong>New York:</strong> 432 Park Ave</div>
                  <div><strong>Beverly Hills:</strong> Rodeo Drive</div>
                  <div><strong>London:</strong> Mayfair W1K</div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="contact-form-block">
              <h3 className="contact-form-title font-heading">
                Let's grab a coffee and <span className="highlight">chat with us.</span>
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Whether seeking an off-market estate or exploring developmental land valuation, our partners are ready to assist.
              </p>

              {submitted ? (
                <div style={{
                  background: 'rgba(232, 168, 73, 0.12)',
                  border: '1px solid var(--color-border-accent)',
                  padding: '30px',
                  textAlign: 'center',
                  borderRadius: '2px'
                }}>
                  <CheckCircle size={36} style={{ color: 'var(--color-accent)', margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
                    Inquiry Dispatched
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                    Thank you. An Archera partner from our Melbourne office will follow up shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-gold"
                    style={{ fontSize: '11px' }}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      padding: '10px 14px',
                      fontSize: '13px',
                      marginBottom: '16px',
                      borderRadius: '2px'
                    }}>
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Julian Sterling"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        placeholder="name@domain.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        placeholder="+61 400 000 000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-select"
                    >
                      <option value="General Acquisition Inquiry">General Acquisition Inquiry</option>
                      <option value="Private Off-Market Listing">Private Off-Market Listing</option>
                      <option value="Land / Vineyard Valuation">Land / Vineyard Valuation</option>
                      <option value="Media & Press Inquiries">Media & Press Inquiries</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                      placeholder="Specify your requirements, target region, and acquisition timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold"
                    style={{ width: '100%' }}
                  >
                    {submitting ? 'TRANSMITTING...' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Location Map */}
      <section style={{ padding: '60px 0 100px 0' }}>
        <div className="archera-container with-left-rail">
          <div style={{ marginBottom: '20px' }}>
            <span className="section-subtitle">FIND US IN MELBOURNE</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: '#ffffff' }}>
              69 Queen St, Melbourne, VIC 3000
            </h3>
          </div>

          <div style={{ height: '420px', width: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <MapContainer
              center={[-37.8174, 144.9620]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                maxZoom={19}
              />
              <Marker position={[-37.8174, 144.9620]} icon={melbourneIcon}>
                <Popup>
                  <div style={{ color: '#fff', padding: '6px' }}>
                    <strong style={{ color: 'var(--color-accent)', fontSize: '13px' }}>ARCHERA HQ</strong><br />
                    69 Queen St, Melbourne, Australia<br />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>(+706) 898-0751</span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
