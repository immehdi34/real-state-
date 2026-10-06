import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, MapPin, Award, Building2, Mail, ShieldCheck } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

export default function RightNavRail({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'HOME', icon: Home },
    { id: 'services', label: 'SERVICES', icon: Sparkles },
    { id: 'sold-projects', label: 'SOLD MAP', icon: MapPin },
    { id: 'about-studio', label: 'ABOUT US', icon: Award },
    { id: 'latest-properties', label: 'PROPERTIES', icon: Building2 },
    { id: 'contact', label: 'CONTACT', icon: Mail },
    { id: 'admin', label: 'ADMIN', icon: ShieldCheck, isRoute: true, route: '/admin' }
  ];

  // Dynamic Scrollspy: Tracks which section is currently on screen
  useEffect(() => {
    const mainPaths = ['/', '/about', '/contact', '/services', '/properties', '/projects', '/latest'];
    if (!mainPaths.includes(location.pathname)) {
      if (location.pathname === '/admin') setActiveSection('admin');
      return;
    }

    const sectionIds = ['hero', 'services', 'sold-projects', 'about-studio', 'latest-properties', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // offset for fixed header

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleItemClick = (item) => {
    if (onClose) onClose();

    if (item.isRoute) {
      navigate(item.route);
      return;
    }

    const mainPaths = ['/', '/about', '/contact', '/services', '/properties', '/projects', '/latest'];
    if (mainPaths.includes(location.pathname)) {
      scrollToSection(item.id);
      setActiveSection(item.id);
    } else {
      // If currently on a subpage (e.g. /admin), navigate back to main scrollable page and smooth scroll
      navigate('/');
      setTimeout(() => {
        scrollToSection(item.id);
      }, 150);
    }
  };

  return (
    <>
      {/* Mobile / Tablet Overlay Backdrop */}
      <div
        className={`right-nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sleek Floating 2D Luxury Icon Dock on the Right Side */}
      <aside
        className={`archera-right-icon-dock ${isOpen ? 'mobile-open' : ''}`}
        aria-label="Quick Section Navigation"
      >
        <div className="icon-dock-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`icon-dock-btn ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                title={item.label}
              >
                <Icon size={17} className="dock-icon" />

                {/* Animated Luxury Tooltip Pill sliding to the left on hover */}
                <span className="dock-tooltip">
                  <span className="dock-tooltip-arrow" />
                  <span className="dock-tooltip-text">{item.label}</span>
                </span>

                {/* Active Indicator Pip */}
                {isActive && <span className="dock-active-indicator" />}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
