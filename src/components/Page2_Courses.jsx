import { PageSection } from './Section';
import coursesData from '../data/courses.json';

/**
 * Page 2: Courses Offered
 * Language-wise expandable accordions → Levels → Modules
 */
export default function Page2_Courses() {
  return (
    <PageSection 
      id="courses" 
      title="Languages Courses Offered" 
      subtitle="Structured, certification-aligned programs for every goal — from beginner to mastery."
      variant="alt"
    >
      <div className="courses__grid">
        {coursesData.languages.map(language => (
          <details key={language.id} className="language-accordion">
            <summary className="language-accordion__header">
              <div className="language-accordion__header">
                <span className="language-accordion__icon" aria-hidden="true">{language.icon}</span>
                <div className="language-accordion__info">
                  <h3 className="language-accordion__name">{language.name}</h3>
                  <p className="language-accordion__desc">{language.description}</p>
                </div>
              </div>
              <svg className="language-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div className="language-accordion__content">
              {language.levels.map(level => (
                <details key={level.id} className="level-accordion">
                  <summary className="level-accordion__header">
                    <div className="level-accordion__header">
                      <span className="level-accordion__badge">{level.id}</span>
                      <div>
                        <h4 className="level-accordion__name">{level.name}</h4>
                        <p className="level-accordion__desc">{level.description}</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
                      <span className="level-accordion__module-count">
                        {level.modules.length} modules
                      </span>
                      <svg className="level-accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="level-accordion__content">
                    <div className="module-list">
                      {level.modules.map((module, index) => (
                        <div key={`${level.id}-${index}`} className="module-item">
                          <svg className="module-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span className="module-item__text">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </PageSection>
  );
}