import { SOCIAL_LINKS } from '../data/socialLinks';
import { NAV_LINKS } from '../data/navigation';
import { useSmoothScroll } from '../hooks';

/**
 * Footer Component
 * Brand, quick links, social links, and copyright
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollToSection } = useSmoothScroll();

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">EXL Institute</p>
          <p className="footer__tagline">Institute of Foreign Languages</p>
        </div>

        <nav className="footer__quick-links" aria-label="Footer navigation">
          <h2 className="footer__heading">Quick Links</h2>
          <div className="footer__quick-links-grid">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="footer__quick-link"
                onClick={event => handleNavClick(event, id)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="footer__social" role="list" aria-label="Social media links">
          {SOCIAL_LINKS.map(({ platform, url, label }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={label}
            >
              {platform === 'facebook' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              )}
              {platform === 'instagram' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              )}
              {platform === 'linkedin' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              )}
              {platform === 'youtube' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} EXL Institute. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
