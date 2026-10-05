import React from 'react';

export default function LeftRail() {
  return (
    <aside className="archera-left-rail" aria-label="Brand rail">
      <div className="rail-social">
        <a href="#instagram" title="Instagram" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>IG</a>
        <a href="#linkedin" title="LinkedIn" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>LI</a>
        <a href="#facebook" title="Facebook" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>FB</a>
      </div>

      <div className="rail-line" />

      <div className="rail-text">
        ARCHERA · LUXURY REAL ESTATE
      </div>
    </aside>
  );
}
