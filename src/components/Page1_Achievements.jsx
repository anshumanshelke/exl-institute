import { PageSection } from './Section';
import { useCarousel } from '../hooks';
import achievementsData from '../data/achievements.json';

/**
 * Page 1: Student Achievements
 * Image-driven carousel with student photos, names, achievements, courses
 */
export default function Page1_Achievements() {
  const students = achievementsData.students;
  const {
    currentIndex,
    next,
    prev,
    goTo,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd
  } = useCarousel(students.length, {
    autoRotate: true,
    interval: 5000,
    pauseOnHover: true
  });

  return (
    <PageSection 
      id="achievements" 
      title="Student Achievements" 
      subtitle="Real students. Real results. See what our learners have accomplished."
    >
      <div 
        className="carousel achievements__carousel" 
        role="region" 
        aria-roledescription="carousel"
        aria-label="Student achievements"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {students.map((student, index) => (
            <article key={student.id} className="carousel__slide">
              <div className="achievement-slide">
                <img
                  src={student.photo}
                  alt={`${student.name} - ${student.achievement}`}
                  className="achievement-slide__photo"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <h3 className="achievement-slide__name">{student.name}</h3>
                <span className="achievement-slide__course">{student.course}</span>
                <p className="achievement-slide__achievement">{student.achievement}</p>
                {student.description && (
                  <p className="achievement-slide__description">{student.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <button
          className="carousel__btn carousel__btn--prev"
          onClick={prev}
          aria-label="Previous student"
          disabled={students.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={next}
          aria-label="Next student"
          disabled={students.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {students.length > 1 && (
          <div className="carousel__pagination" role="tablist" aria-label="Student slides">
            {students.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to student ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </PageSection>
  );
}