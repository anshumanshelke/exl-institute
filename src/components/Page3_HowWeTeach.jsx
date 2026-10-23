import { PageSection } from './Section';
import YouTubeVideo from './YouTubeVideo';
import teachingData from '../data/teachingMethod.json';

const featureIcons = {
  'live-classes': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="13" height="14" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  ),
  'self-study': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5v16M8 7h8M8 11h8" />
    </svg>
  ),
  'practice-revision': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h14v16H5z" />
      <path d="m8 9 1.5 1.5L12 8M8 14l1.5 1.5L12 13M14 9h2M14 14h2" />
    </svg>
  ),
  'exam-preparation': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5 12 3l8 3.5L12 10zM6 8.5V14c0 1.7 2.7 3 6 3s6-1.3 6-3V8.5" />
      <path d="M20 7v6M12 21v-4M9 21h6" />
    </svg>
  )
};

/**
 * Page 3: How We Teach
 * One lazy YouTube player followed by four text-only feature boxes.
 */
export default function Page3_HowWeTeach() {
  return (
    <PageSection
      id="teaching"
      title="How We Teach"
      subtitle="Live teaching + guided self-study. Not recorded courses — real interaction, real progress."
    >
      <div className="teaching__video">
        <YouTubeVideo />
      </div>

      <ul className="teaching__grid">
        {teachingData.sections.map((section) => (
          <li key={section.id} className="teaching-card">
            <div className="teaching-card__icon" aria-hidden="true">
              {featureIcons[section.id]}
            </div>
              <h3 className="teaching-card__title">{section.title}</h3>
              <p className="teaching-card__desc">{section.description}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
