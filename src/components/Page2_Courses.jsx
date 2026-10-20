import { useState, useRef, useEffect } from 'react';
import { PageSection } from './Section';

/**
 * Page 2: Courses Offered - Merged Single Section
 * Language-wise expandable accordions with program cards
 */
export default function Page2_Courses() {
  const [openLanguage, setOpenLanguage] = useState(null);
  const contentRefs = useRef({});

  const toggleLanguage = (langId) => {
    setOpenLanguage(prev => prev === langId ? null : langId);
  };

  // Single source of truth for all language data
  const languages = [
    {
      id: 'german',
      name: 'German',
      flag: '🇩🇪',
      tagline: 'Build your future in Germany.',
      programs: [
        {
          title: 'Goethe-Zertifikat Preparation',
          description: 'A1–C2 certification preparation.'
        },
        {
          title: 'EXL Professional Program',
          description: 'German language training tailored for working professionals.'
        },
        {
          title: 'EXL Kids Program',
          description: 'Specially designed German batches for children. Parents can ',
          contactLink: true
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
          title: 'DELF/DALF Certification Preparation',
          description: 'DELF A1–B2 and DALF C1–C2 preparation.'
        },
        {
          title: 'EXL Professional Program',
          description: 'French language training tailored for working professionals.'
        },
        {
          title: 'EXL Kids Program',
          description: 'Specially designed French batches for children. Parents can ',
          contactLink: true
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
          title: 'Spoken Chinese',
          description: 'Learn practical Chinese for everyday conversations, communication, and real-world interactions.'
        },
        {
          title: 'Specialised Chinese Programs',
          description: 'Customised batches based on your requirements, including Mandarin, standard Chinese language training, and EXL certification options.'
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
          title: 'Spoken English & Communication',
          description: 'Improve your fluency, vocabulary, pronunciation, and everyday communication skills.'
        },
        {
          title: 'Personality Development & Etiquette',
          description: 'Build confidence, strengthen interpersonal skills, and develop professional communication and social etiquette.'
        },
        {
          title: 'Kids Special Batches',
          description: 'Fun, engaging English learning designed to help children express themselves confidently from an early age.'
        }
      ]
    }
  ];

  // Handle max-height animation for smooth expand/collapse
  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([langId, ref]) => {
      if (!ref) return;
      const content = ref.current;
      if (!content) return;

      if (openLanguage === langId) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  }, [openLanguage]);

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
          const isOpen = openLanguage === language.id;
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
                </button>
              </header>
              <div
                id={`language-content-${language.id}`}
                className="language-accordion__content-wrapper"
                role="region"
                aria-labelledby={`language-trigger-${language.id}`}
                hidden={!isOpen}
              >
                <div 
                  ref={el => contentRefs.current[language.id] = el}
                  className="language-accordion__content"
                >
                  <div className="program-list">
                    {language.programs.map((program, index) => (
                      <article key={`${language.id}-${index}`} className="program-card">
                        <h4 className="program-card__title">{program.title}</h4>
                        <p className="program-card__description">
                          {program.description}
                          {program.contactLink && (
                            <a 
                              href="tel:+919421299637" 
                              className="program-card__contact-link"
                            >
                              call us
                            </a>
                          )}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}