import { PageSection } from './Section';
import { useCarousel } from '../hooks';
import testimonialsData from '../data/testimonials.json';

/**
 * Page 4: Testimonials / Student Stories
 * Featured testimonial carousel with photo, name, language, review, achievement
 */
export default function Page4_Testimonials() {
  const testimonials = testimonialsData.testimonials;
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
  } = useCarousel(testimonials.length, {
    autoRotate: true,
    interval: 6000,
    pauseOnHover: true
  });

  return (
    <PageSection 
      id="testimonials" 
      title="Student Stories" 
      subtitle="Hear directly from our students about their learning journey and achievements."
      variant="alt"
    >
      <div 
        className="carousel testimonials__carousel" 
        role="region" 
        aria-roledescription="carousel"
        aria-label="Student testimonials"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.id} className="carousel__slide">
              <div className="testimonial-slide">
                <img
                  src={testimonial.photo}
                  alt={`${testimonial.name} - ${testimonial.language} student`}
                  className="testimonial-slide__photo"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <div className="testimonial-slide__content">
                  <blockquote className="testimonial-slide__quote">
                    {testimonial.review}
                  </blockquote>
                  <div className="testimonial-slide__author">
                    <cite className="testimonial-slide__name">{testimonial.name}</cite>
                    <div className="testimonial-slide__meta">
                      <span>{testimonial.language}</span>
                      <span aria-hidden="true">•</span>
                      <span>{testimonial.level}</span>
                    </div>
                  </div>
                  {testimonial.achievement && (
                    <p className="testimonial-slide__achievement">
                      {testimonial.achievement}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className="carousel__btn carousel__btn--prev"
          onClick={prev}
          aria-label="Previous testimonial"
          disabled={testimonials.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={next}
          aria-label="Next testimonial"
          disabled={testimonials.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {testimonials.length > 1 && (
          <div className="carousel__pagination" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Read testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </PageSection>
  );
}