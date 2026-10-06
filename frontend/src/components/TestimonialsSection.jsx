import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="archera-container with-left-rail">
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          <span className="testimonial-quote-icon">“</span>
          
          <span className="section-subtitle" style={{ marginBottom: '20px' }}>
            CLIENT TESTIMONIAL
          </span>

          <blockquote className="testimonial-quote-text">
            "TheMineArch helped us find the perfect commercial space with absolute transparency and professionalism. Highly recommended for real estate investments and property consulting."
          </blockquote>

          <div className="gold-divider" style={{ margin: '0 auto 28px auto' }} />

          <div className="testimonial-author-name">
            Robert Smith
          </div>
          <div className="testimonial-author-title">
            CEO &amp; Founder
          </div>
        </div>
      </div>
    </section>
  );
}
