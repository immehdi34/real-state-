import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import ArcheraLogo from './ArcheraLogo';
import RightNavRail from './RightNavRail';

export default function Navbar() {
  const [rightNavOpen, setRightNavOpen] = useState(false);

  return (
    <>
      <header className="archera-header">
        <div className="archera-container header-inner">
          {/* Brand Logo with Bespoke 2D Vector Archera Logo */}
          <Link
            to="/"
            className="header-logo"
            onClick={() => setRightNavOpen(false)}
            aria-label="Archera Real Estates Home"
          >
            <ArcheraLogo size={40} />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  letterSpacing: '1.5px',
                  color: '#ffffff',
                  lineHeight: 1
                }}
              >
                ARCHERA
              </div>
              <div
                style={{
                  fontSize: '9px',
                  letterSpacing: '3px',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginTop: '3px'
                }}
              >
                REAL ESTATES
              </div>
            </div>
          </Link>

          {/* Right Header Elements: Phone, Inquire CTA, and Navigation Menu Toggle */}
          <div className="header-right-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href="tel:+7068980751"
              className="header-phone-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: 'var(--color-text-secondary)'
              }}
            >
              <Phone size={14} style={{ color: 'var(--color-accent)' }} />
              <span>(+706) 898-0751</span>
            </a>

            <Link
              to="/contact"
              className="btn-gold header-inquire-btn"
              style={{ padding: '9px 18px', fontSize: '11px' }}
            >
              INQUIRE NOW
            </Link>

            {/* Menu Trigger Button for Right-Side Vertical Navigation */}
            <button
              onClick={() => setRightNavOpen(!rightNavOpen)}
              className="right-nav-toggle-btn"
              aria-label="Toggle vertical navigation menu"
              title="Toggle Menu"
            >
              <span className="toggle-menu-label">
                {rightNavOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="toggle-menu-icon">
                {rightNavOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Right-Side Vertical Navigation with Hover Animations & Working Links */}
      <RightNavRail
        isOpen={rightNavOpen}
        onClose={() => setRightNavOpen(false)}
      />
    </>
  );
}
