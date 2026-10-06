import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import ArcheraLogo from './ArcheraLogo';
import { scrollToSection } from '../utils/navigation';

export default function Footer() {
  const scrollToTop = () => {
    scrollToSection('hero');
  };

  return (
    <footer className="archera-footer">
      <div className="archera-container with-left-rail">
        <div className="footer-top">
          {/* Brand & Address */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <ArcheraLogo size={36} />
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '1px', color: 'var(--color-text)', display: 'block', lineHeight: 1 }}>
                  ARCHERA
                </span>
                <span style={{ fontSize: '9px', letterSpacing: '3px', color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 700, marginTop: '2px', display: 'block' }}>
                  REAL ESTATES
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', maxWidth: '380px', lineHeight: 1.6 }}>
              Curating architectural landmarks, coastal lands, private penthouses, and heritage mansions for the world's most discerning clientele.
            </p>
          </div>

          {/* Quick Contact & Office */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
              <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
              <span>69 Queen St, Melbourne, Australia</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
              <Phone size={16} style={{ color: 'var(--color-accent)' }} />
              <a href="tel:+7068980751" style={{ color: 'inherit' }}>(+706) 898-0751</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)' }}>
              <Mail size={16} style={{ color: 'var(--color-accent)' }} />
              <a href="mailto:contact@archera.com" style={{ color: 'inherit' }}>contact@archera.com</a>
            </div>
          </div>

          {/* Language selector & Back to top */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 700, letterSpacing: '2px' }}>
              <span style={{ color: 'var(--color-accent)' }}>ENG</span>
              <span style={{ color: 'var(--color-text-muted)' }}>FRA</span>
              <span style={{ color: 'var(--color-text-muted)' }}>GER</span>
            </div>
            <button
              onClick={scrollToTop}
              className="btn-dark"
              style={{ padding: '8px 16px', fontSize: '11px' }}
              title="Return to top"
            >
              <ArrowUp size={14} style={{ color: 'var(--color-accent)' }} />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Navigation row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '28px'
        }}>
          <div className="footer-links">
            <button type="button" onClick={() => scrollToSection('hero')} className="footer-link-btn">Home</button>
            <button type="button" onClick={() => scrollToSection('about-studio')} className="footer-link-btn">About Studio</button>
            <button type="button" onClick={() => scrollToSection('latest-properties')} className="footer-link-btn">Properties</button>
            <button type="button" onClick={() => scrollToSection('sold-projects')} className="footer-link-btn">Sold Portfolio</button>
            <button type="button" onClick={() => scrollToSection('latest-properties')} className="footer-link-btn">Latest Arrivals</button>
            <button type="button" onClick={() => scrollToSection('contact')} className="footer-link-btn">Contact</button>
            <Link to="/admin" className="footer-link-btn">Admin Portal</Link>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Melbourne · Sydney · New York · Beverly Hills
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} ARCHERA Real Estate. All rights reserved. Strict 2D architectural presentation.
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Representation</a>
            <a href="#licensing">Brokerage Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
