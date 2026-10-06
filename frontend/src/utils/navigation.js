/**
 * Navigation and smooth scrolling utilities for Archera Real Estates
 * Ensures the entire website remains a seamless, fully scrollable single-page experience.
 */

export function scrollToSection(sectionId, behavior = 'smooth') {
  if (!sectionId || sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(sectionId);
  if (el) {
    const headerHeight = 75;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior
    });
  }
}
