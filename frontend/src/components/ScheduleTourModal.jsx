import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export default function ScheduleTourModal({ property, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '11:00 AM',
    type: 'Private Showing',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please provide your name and email address.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.submitInquiry({
        property_id: property?.id || null,
        property_title: property?.title || 'General Property Inquiry',
        ...formData
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Unable to schedule viewing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div
        style={{
          background: '#181818',
          border: '1px solid var(--color-border-accent)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          borderRadius: '2px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-text-muted)',
            padding: '6px'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(232, 168, 73, 0.15)',
              border: '2px solid var(--color-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto'
            }}>
              <CheckCircle size={32} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#ffffff', marginBottom: '12px' }}>
              Private Viewing Requested
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. An Archera private acquisitions advisor will contact you within 24 hours to confirm credentials and schedule access.
            </p>
            <button
              onClick={() => { setSuccess(false); onClose(); }}
              className="btn-gold"
              style={{ width: '100%' }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="section-subtitle">CONFIDENTIAL CONSULTATION</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: '#ffffff', marginBottom: '6px' }}>
              Schedule Private Viewing
            </h3>
            {property && (
              <div style={{
                color: 'var(--color-accent)',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '24px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)'
              }}>
                {property.title} · {property.price_formatted}
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '10px 14px',
                fontSize: '13px',
                marginBottom: '20px',
                borderRadius: '2px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Lord Harrington / Eleanor Vance"
                  />
                </div>
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
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Window</label>
                  <select
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    className="form-select"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Twilight / Sunset (4 PM - 7 PM)">Twilight / Sunset (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Inquiries or Accompaniment</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="Inquire regarding private airstrip, security clearance, or NDA..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold"
                style={{ width: '100%', marginTop: '12px' }}
              >
                {submitting ? 'CONFIRMING...' : 'REQUEST CONFIDENTIAL SHOWING'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
