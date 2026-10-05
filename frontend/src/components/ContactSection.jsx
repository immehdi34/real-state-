import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" style={{ backgroundImage: "url('/images/contact_bg.jpg')" }}>
      <div className="contact-overlay" />
      <div className="archera-container with-left-rail" style={{ position: 'relative', zIndex: 2 }}>
        <div className="contact-inner">
          {/* Left info column matching reference */}
          <div className="contact-info-block">
            <span className="section-subtitle">GET IN TOUCH</span>
            <h2 className="contact-title font-heading">
              Contact
            </h2>
            <div className="gold-divider" />

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.7, maxWidth: '440px', marginBottom: '24px' }}>
              Connect with our Melbourne headquarters or request a confidential discussion regarding private acquisitions, off-market estates, or land valuation.
            </p>

            <div className="contact-address">
              69 Queen St, Melbourne<br />Australia
            </div>

            <div className="contact-phone">
              <a href="tel:+7068980751" style={{ color: '#ffffff', fontWeight: 600 }}>
                (+706) 898-0751
              </a>
            </div>

            <div className="contact-email">
              <a href="mailto:contact@archera.com" style={{ color: 'var(--color-accent)' }}>
                contact@archera.com
              </a>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', gap: '24px', color: 'var(--color-text-muted)', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              <div>MON - FRI: 8:00 AM - 7:00 PM</div>
              <div>SAT - SUN: BY APPOINTMENT</div>
            </div>
          </div>

          {/* Right form column matching reference */}
          <div className="contact-form-block">
            <h3 className="contact-form-title font-heading">
              Let's grab a coffee and <span className="highlight">chat with us.</span>
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
              Leave your inquiry below. Our private brokerage division guarantees strict confidentiality.
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
                  Message Received
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                  Thank you. An Archera partner will respond directly within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold"
                  style={{ fontSize: '11px' }}
                >
                  SEND ANOTHER INQUIRY
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
                  <label className="form-label">Your Name *</label>
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
                      placeholder="name@company.com"
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
                  <label className="form-label">Inquiry Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="Tell us about the property, land or acquisition you're interested in..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  {submitting ? 'SENDING INQUIRY...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
