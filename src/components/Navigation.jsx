import { useState, useEffect } from 'react';
import { useSmoothScroll } from '../hooks';
import teacherData from '../data/teacher.json';
import contactData from '../data/contact.json';

/**
 * Navigation / Header Component
 * Sticky, smooth scroll, active section indicator
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  // Track scroll for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'intro', label: 'Home' },
    { id: 'achievements', label: 'Students' },
    { id: 'courses', label: 'Courses' },
    { id: 'teaching', label: 'How We Teach' },
    { id: 'testimonials', label: 'Stories' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`navigation ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="navigation__inner">
        {/* Logo */}
        <a href="#intro" className="navigation__logo" aria-label="EXL Institute of Foreign Languages - Home">
          <img 
            src="/assets/logo-placeholder.svg" 
            alt="" 
            className="navigation__logo-img"
            loading="eager"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="navigation__menu" role="navigation" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="navigation__link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact Info + CTA */}
        <div className="navigation__cta">
          <div className="navigation__contact-info" aria-hidden="true">
            <a href={`mailto:${contactData.email}`} className="navigation__link">
              {contactData.email}
            </a>
            <span aria-hidden="true">|</span>
            <a href={`tel:${contactData.phone}`} className="navigation__link">
              {contactData.phone}
            </a>
          </div>
          <a 
            href="#contact" 
            className="btn btn-primary" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Contact Us
          </a>

          {/* Mobile Hamburger */}
          <button
            className="navigation__hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" className="navigation__menu open" role="navigation" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="navigation__link btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="navigation__contact-info" style={{flexDirection: 'column', gap: 'var(--space-2)'}}>
            <a href={`mailto:${contactData.email}`} className="navigation__link">{contactData.email}</a>
            <a href={`tel:${contactData.phone}`} className="navigation__link">{contactData.phone}</a>
          </div>
        </nav>
      )}
    </header>
  );
}