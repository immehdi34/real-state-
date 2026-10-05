import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Compass, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'HOME', to: '/' },
    { label: 'ABOUT', to: '/about' },
    { label: 'PROPERTIES', to: '/properties' },
    { label: 'PROJECTS', to: '/projects' },
    { label: 'LATEST', to: '/latest' },
    { label: 'CONTACT', to: '/contact' },
    { label: 'ADMIN', to: '/admin' }
  ];

  return (
    <header className="archera-header">
      <div className="archera-container header-inner">
        {/* Brand Logo */}
        <Link to="/" className="header-logo" onClick={() => setMobileMenuOpen(false)}>
          <div style={{
            width: '38px',
            height: '38px',
            border: '2px solid var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(232, 168, 73, 0.08)'
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-accent)',
              fontSize: '20px',
              lineHeight: 1
            }}>A</span>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              letterSpacing: '1px',
              color: '#ffffff',
              lineHeight: 1
            }}>
              ARCHERA
            </div>
            <div style={{
              fontSize: '9px',
              letterSpacing: '3px',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginTop: '2px'
            }}>
              REAL ESTATE
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="tel:+7068980751"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: 'var(--color-text-secondary)'
            }}
            className="header-phone-link"
          >
            <Phone size={14} style={{ color: 'var(--color-accent)' }} />
            <span>(+706) 898-0751</span>
          </a>

          <Link
            to="/contact"
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: '11px', display: 'none' }}
            id="desktop-inquire-btn"
          >
            INQUIRE NOW
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: '#ffffff',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(18, 18, 18, 0.98)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 28px',
          gap: '24px',
          borderTop: '1px solid var(--color-border)'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                color: '#ffffff',
                letterSpacing: '1px'
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ color: 'var(--color-accent)', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>
              MELBOURNE HEADQUARTERS
            </div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
              69 Queen St, Melbourne, Australia<br />
              (+706) 898-0751
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold"
              style={{ width: '100%', textAlign: 'center' }}
            >
              CONTACT ARCHERA
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
