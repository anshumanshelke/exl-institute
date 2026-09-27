import { useState } from 'react';
import { PageSection } from './Section';
import teachingData from '../data/teachingMethod.json';

/**
 * Page 3: How We Teach / Class Format
 * Iframe-based interactive presentation with lazy loading
 */
export default function Page3_HowWeTeach() {
  const [loadedIframes, setLoadedIframes] = useState(new Set());

  const handleIframeLoad = (sectionId) => {
    setLoadedIframes(prev => new Set(prev).add(sectionId));
  };

  return (
    <PageSection 
      id="teaching" 
      title="How We Teach" 
      subtitle="Live teaching + guided self-study. Not recorded courses — real interaction, real progress."
    >
      <div className="teaching__grid">
        {teachingData.sections.map((section, index) => (
          <article key={section.id} className="teaching-card">
            <div className="teaching-card__iframe-wrapper">
              {section.iframeUrl && section.iframeUrl !== '[PLACEHOLDER: https://...]' ? (
                <>
                  <iframe
                    className="teaching-card__iframe"
                    src={section.iframeUrl}
                    title={`${section.title} - Interactive Demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => handleIframeLoad(section.id)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                  <div 
                    className={`teaching-card__placeholder ${loadedIframes.has(section.id) ? 'hidden' : ''}`}
                    aria-hidden="true"
                  >
                    <img 
                      src={section.placeholderImage} 
                      alt="" 
                      className="teaching-card__placeholder-img"
                    />
                  </div>
                </>
              ) : (
                <div className="teaching-card__placeholder" aria-hidden="true">
                  <img 
                    src={section.placeholderImage} 
                    alt="" 
                    className="teaching-card__placeholder-img"
                  />
                </div>
              )}
            </div>
            <div className="teaching-card__content">
              <h3 className="teaching-card__title">{section.title}</h3>
              <p className="teaching-card__desc">{section.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}