import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Vite keeps this list in sync with the folder at build time. Adding or
// removing a supported image therefore never requires editing this component.
const photoModules = import.meta.glob(
  '../../slide_show_photos/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
);

const initialPhotos = Object.entries(photoModules)
  .map(([path, src]) => ({
    path,
    src,
    filename: path.split('/').pop() || ''
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

function photoAlt(filename, index) {
  const name = filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  return name
    ? `EXL Institute student achievement photo — ${name}`
    : `EXL Institute student achievement photo ${index + 1}`;
}

export default function StudentAchievementSlideshow() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [photoModes, setPhotoModes] = useState({});
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const activeIndex = photos.length ? Math.min(currentIndex, photos.length - 1) : 0;
  const nextIndex = photos.length ? (activeIndex + 1) % photos.length : 0;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((index) => photos.length ? (index + 1) % photos.length : 0);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrentIndex((index) => photos.length ? (index - 1 + photos.length) % photos.length : 0);
  }, [photos.length]);

  const handleImageError = useCallback((path) => {
    setPhotos((available) => available.filter((photo) => photo.path !== path));
  }, []);

  const handleImageLoad = useCallback((path, event) => {
    const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
    // Keep unusually tall or wide photos intact; normal landscape photos can
    // use the frame fully without an overly aggressive crop.
    setPhotoModes((modes) => ({
      ...modes,
      [path]: ratio < 1.45 || ratio > 2.1 ? 'contain' : 'cover'
    }));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  // Keep the upcoming photo warm in the browser cache before it is shown.
  useEffect(() => {
    if (!photos.length) return undefined;
    const image = new Image();
    image.src = photos[nextIndex].src;
    return undefined;
  }, [nextIndex, photos]);

  useEffect(() => {
    clearTimer();
    if (photos.length < 2 || paused || hidden || reducedMotion) return undefined;

    timerRef.current = window.setTimeout(next, 3000);
    return clearTimer;
  }, [activeIndex, clearTimer, hidden, next, paused, photos.length, reducedMotion]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0]?.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) (deltaX > 0 ? prev : next)();
    touchStartX.current = null;
  };

  const slides = useMemo(() => photos.map((photo, index) => ({
    ...photo,
    alt: photoAlt(photo.filename, index)
  })), [photos]);

  if (!slides.length) {
    return (
      <div className="achievements-slideshow achievements-slideshow--empty" role="status">
        <p>Student achievement photos will appear here soon.</p>
      </div>
    );
  }

  return (
    <div
      className="achievements-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Student achievement photos"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="achievements-slideshow__frame">
        {slides.map((photo, index) => (
          <div
            className={`achievements-slideshow__slide ${index === activeIndex ? 'is-active' : ''}`}
            key={photo.path}
            aria-hidden={index !== activeIndex}
          >
            <img
              className="achievements-slideshow__backdrop"
              src={photo.src}
              alt=""
              aria-hidden="true"
              loading={index === activeIndex || index === nextIndex ? 'eager' : 'lazy'}
            />
            <img
              className="achievements-slideshow__photo"
              src={photo.src}
              alt={photo.alt}
              loading={index === activeIndex || index === nextIndex ? 'eager' : 'lazy'}
              style={{ objectFit: photoModes[photo.path] || 'cover' }}
              onLoad={(event) => handleImageLoad(photo.path, event)}
              onError={() => handleImageError(photo.path)}
            />
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button className="carousel__btn carousel__btn--prev" type="button" onClick={prev} aria-label="Previous photo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="carousel__btn carousel__btn--next" type="button" onClick={next} aria-label="Next photo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="achievements-slideshow__dots" aria-label="Choose achievement photo">
          {slides.map((photo, index) => (
            <button
              key={photo.path}
              className={`achievements-slideshow__dot ${index === activeIndex ? 'is-active' : ''}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to achievement photo ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
