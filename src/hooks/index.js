import { useState, useEffect, useCallback, useRef } from 'react';
export { useEmailJS } from './useEmailJS';
export { useToast } from './useToast';

/**
 * Reusable carousel hook for both achievements and testimonials
 */
export function useCarousel(itemCount, options = {}) {
  const {
    autoRotate = true,
    interval = 5000,
    pauseOnHover = true,
    loop = true
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate || prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      if (!paused) {
        setCurrentIndex(prev => (prev + 1) % itemCount);
      }
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRotate, interval, paused, itemCount, prefersReducedMotion]);

  const next = useCallback(() => {
    setCurrentIndex(prev => {
      const next = prev + 1;
      return loop ? next % itemCount : Math.min(next, itemCount - 1);
    });
  }, [itemCount, loop]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => {
      const prevIndex = prev - 1;
      return loop ? (prevIndex + itemCount) % itemCount : Math.max(prevIndex, 0);
    });
  }, [itemCount, loop]);

  const goTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, itemCount - 1)));
  }, [itemCount]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setPaused(false);
  }, [pauseOnHover]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }, [next, prev]);

  // Touch swipe handling
  const touchStartRef = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prev();
      else next();
    }
    touchStartRef.current = null;
  }, [next, prev]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    paused,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd
  };
}
/**
 * Hook to detect prefers-reduced-motion
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);

    const handler = (e) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/**
 * Hook for smooth scroll navigation
 */
export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // matches CSS --header-height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
}
