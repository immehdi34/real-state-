/**
 * Navigation and smooth scrolling utilities for Archera Real Estates
 * Ensures the entire website remains a seamless full-page scroll-snapped experience.
 */

export function scrollToSection(sectionId, behavior = 'smooth') {
  const targetId = (!sectionId || sectionId === 'hero') ? 'hero' : sectionId;
  const el = document.getElementById(targetId);

  if (el) {
    el.scrollIntoView({ behavior, block: 'start' });
    return;
  }

  // Fallback for container or window
  const container = document.querySelector('.scroll-container');
  if (container) {
    if (targetId === 'hero') {
      container.scrollTo({ top: 0, behavior });
    }
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}
