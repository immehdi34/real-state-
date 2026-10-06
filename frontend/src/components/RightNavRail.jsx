import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, MapPin, Award, Building2, Mail, ShieldCheck } from 'lucide-react';

export default function RightNavRail({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'HOME', icon: Home, route: '/' },
    { id: 'services', label: 'SERVICES', icon: Sparkles, route: '/#services' },
    { id: 'sold-projects', label: 'SOLD MAP', icon: MapPin, route: '/#sold-projects' },
    { id: 'about-studio', label: 'ABOUT US', icon: Award, route: '/about' },
    { id: 'latest-properties', label: 'PROPERTIES', icon: Building2, route: '/properties' },
    { id: 'contact', label: 'CONTACT', icon: Mail, route: '/contact' },
    { id: 'admin', label: 'ADMIN', icon: ShieldCheck, route: '/admin' }
  ];

  // Scrollspy: Track active section dynamically when scrolling on the homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      // If on subpage, set active by matching pathname
      const matched = navItems.find((item) => item.route === location.pathname);
      if (matched) setActiveSection(matched.id);
      return;
    }

    const sectionIds = ['hero', 'services', 'sold-projects', 'about-studio', 'latest-properties', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220; // offset for header

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
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleItemClick = (item) => {
    if (onClose) onClose();

    if (location.pathname === '/') {
      if (item.id === 'admin') {
        navigate('/admin');
        return;
      }
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(item.id);
      } else {
        navigate(item.route);
      }
    } else {
      if (item.id === 'hero' || item.id === 'services' || item.id === 'sold-projects') {
        navigate('/' + (item.id !== 'hero' ? `#${item.id}` : ''));
      } else {
        navigate(item.route);
      }
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
        aria-label="Quick Icon Navigation"
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
