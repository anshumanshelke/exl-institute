import { useState, useRef, useEffect } from 'react';
import { PageSection } from './Section';

/**
 * Page 2: Courses Offered - Merged Single Section
 * Language-wise expandable accordions with program cards
 */
export default function Page2_Courses() {
  const [openLanguages, setOpenLanguages] = useState({});
  const contentRefs = useRef({});

  const toggleLanguage = (langId) => {
    setOpenLanguages(prev => ({ ...prev, [langId]: !prev[langId] }));
  };

  // Structured per-language content makes future course additions straightforward.
  const languages = [
    {
      id: 'german',
      name: 'German',
      flag: '🇩🇪',
      tagline: 'Build your future in Germany.',
      programs: [
        {
          title: 'Goethe Exam',
          levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        },
        {
          title: 'EXL Certification'
        },
        {
          title: 'Professional Batches'
        },
        {
          title: "Kids' Special Batches"
        }
      ]
    },
    {
      id: 'french',
      name: 'French',
      flag: '🇫🇷',
      tagline: 'Speak the language of global opportunities.',
      programs: [
        {
          title: 'DELF Exam',
          levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        },
        {
          title: 'EXL Certification'
        },
        {
          title: 'Professional Batches'
        },
        {
          title: "Kids' Special Batches"
        }
      ]
    },
    {
      id: 'chinese',
      name: 'Chinese',
      flag: '🇨🇳',
      tagline: 'Connect with one of the world\'s biggest markets.',
      programs: [
        {
          title: 'EXL Certification'
        },
        {
          title: 'Professional Batches'
        },
        {
          title: "Kids' Special Batches"
        }
      ]
    },
    {
      id: 'spoken-english',
      name: 'Spoken English',
      flag: '🇬🇧',
      tagline: 'Communicate with confidence. Lead with impact.',
      programs: [
        {
          title: 'EXL Certification'
        },
        {
          title: 'Professional Batches'
        },
        {
          title: "Kids' Special Batches"
        },
        {
          title: 'Personality Development'
        }
      ]
    }
  ];

  // Handle max-height animation for smooth expand/collapse.
  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([langId, ref]) => {
      if (!ref) return;

      if (openLanguages[langId]) {
        ref.style.maxHeight = ref.scrollHeight + 'px';
      } else {
        ref.style.maxHeight = '0px';
      }
    });
  }, [openLanguages]);

  return (
    <PageSection 
      id="courses" 
      title="Your Next Language. Your Next Level."
      subtitle="Learn languages that open doors to global careers, international education, and new opportunities."
      variant="alt"
    >
      <header className="courses__header">
        <h2 className="courses__section-heading">Choose Your Language</h2>
      </header>
      
      <div className="courses__grid">
        {languages.map(language => {
          const isOpen = !!openLanguages[language.id];
          const languageHeader = (
            <div className="language-accordion__header-inner">
              <span className="language-accordion__icon" aria-hidden="true">{language.flag}</span>
              <div className="language-accordion__info">
                <h3 className="language-accordion__name">{language.name}</h3>
                <p className="language-accordion__tagline">{language.tagline}</p>
              </div>
              <svg
                className="language-accordion__chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          );

          return (
            <article 
              key={language.id} 
              className={`language-accordion ${isOpen ? 'is-open' : ''}`}
            >
              <header className="language-accordion__header">
                <button
                  type="button"
                  className="language-accordion__trigger"
                  onClick={() => toggleLanguage(language.id)}
                  aria-expanded={isOpen}
                  aria-controls={`language-content-${language.id}`}
                  id={`language-trigger-${language.id}`}
                >
                  {languageHeader}
                </button>
              </header>
              <div
                id={`language-content-${language.id}`}
                className="language-accordion__content-wrapper"
                role="region"
                aria-labelledby={`language-trigger-${language.id}`}
                aria-hidden={!isOpen}
              >
                <div
                  ref={el => contentRefs.current[language.id] = el}
                  className="language-accordion__content"
                >
                  <ol className="program-list program-list--numbered">
                    {language.programs.map((program, index) => (
                      <li key={`${language.id}-${index}`} className="program-card">
                        <h4 className="program-card__title">{program.title}</h4>
                        {program.levels && (
                          <div className="course-levels" aria-label={`${program.title} levels`}>
                            {program.levels.map(level => (
                              <span key={level} className="course-level">{level}</span>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}
