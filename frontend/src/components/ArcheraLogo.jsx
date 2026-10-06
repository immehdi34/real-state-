import React from 'react';

/**
 * ArcheraLogo: Bespoke 2D Vector Architectural Monogram
 * Perfectly themed with obsidian (#141414) and warm architectural gold (#e8a849).
 */
export default function ArcheraLogo({ size = 38, className = '', style = {} }) {
  return (
    <div
      className={`archera-logo-mark ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        ...style
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Subtle backdrop that merges seamlessly with page */}
        <rect
          x="1"
          y="1"
          width="42"
          height="42"
          fill="var(--color-bg-card, #FFFFFF)"
          fillOpacity="0.95"
          stroke="var(--color-accent, #C5A059)"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          rx="2"
        />

        {/* Architectural drafting corner tick marks */}
        <path d="M1 7V1H7" stroke="var(--color-accent, #C5A059)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M43 7V1H37" stroke="var(--color-accent, #C5A059)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M1 37V43H7" stroke="var(--color-accent, #C5A059)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M43 37V43H37" stroke="var(--color-accent, #C5A059)" strokeWidth="1.8" strokeLinecap="square" />

        {/* Architectural 'A' Chevron Apex (Pure 2D vectors) */}
        <path
          d="M22 8L11 34H16L18.8 27H25.2L28 34H33L22 8Z"
          fill="none"
          stroke="var(--color-accent, #C5A059)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner clean architectural lintel */}
        <line
          x1="19.5"
          y1="24.5"
          x2="24.5"
          y2="24.5"
          stroke="var(--color-text, #2C1E16)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Central architectural keystone / apex dot */}
        <circle cx="22" cy="16" r="1.5" fill="var(--color-accent, #C5A059)" />

        {/* Minimal baseline architectural line */}
        <line
          x1="9"
          y1="38"
          x2="35"
          y2="38"
          stroke="var(--color-accent, #C5A059)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </svg>
    </div>
  );
}
