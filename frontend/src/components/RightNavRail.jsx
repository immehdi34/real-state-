import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, Building2, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function RightNavRail({ isOpen, onClose }) {
  const navItems = [
    { num: '01', label: 'HOME', to: '/' },
    { num: '02', label: 'ABOUT', to: '/about' },
    { num: '03', label: 'PROPERTIES', to: '/properties' },
    { num: '04', label: 'PROJECTS', to: '/projects' },
    { num: '05', label: 'LATEST', to: '/latest' },
    { num: '06', label: 'CONTACT', to: '/contact' },
    { num: '07', label: 'ADMIN', to: '/admin' }
  ];

  return (
    <>
      {/* Mobile / Tablet Overlay Backdrop when drawer is open */}
      <div
        className={`right-nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Vertical Navigation Bar on the Right Side */}
      <aside
        className={`archera-right-nav ${isOpen ? 'mobile-open' : ''}`}
        aria-label="Vertical Site Navigation"
      >
        {/* Top Header inside Right Nav */}
        <div className="right-nav-header">
          <span className="right-nav-tag">NAVIGATION</span>
          <div className="right-nav-tag-line" />
        </div>

        {/* Vertically Stacked Links */}
        <nav className="right-nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `right-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <div className="right-nav-link-content">
                <span className="right-nav-num">{item.num}</span>
                <span className="right-nav-label">{item.label}</span>
              </div>
              <ArrowUpRight size={13} className="right-nav-arrow" />
              <div className="right-nav-gold-indicator" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom Status Section */}
        <div className="right-nav-footer">
          <div className="right-nav-status">
            <span className="status-dot-pulse" />
            <span className="status-text">OFF-MARKET OPEN</span>
          </div>
          <div className="right-nav-location">
            MELBOURNE · BEVERLY HILLS
          </div>
        </div>
      </aside>
    </>
  );
}
