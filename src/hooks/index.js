import { useState, useEffect, useCallback, useRef } from 'react';

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

/**
 * Hook for EmailJS form submission
 */
export function useEmailJS() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const sendEmail = useCallback(async (formData) => {
    setStatus('submitting');
    setMessage('');

    try {
      const emailjs = await import('@emailjs/browser');
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your environment variables.');
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey);

      // Prepare template parameters
      // Note: Destination email (vijaysalgaonkar2026@gmail.com) should be set in EmailJS template "To Email" field
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        language: formData.language,
        level: formData.level || 'Not specified',
        contact_method: formData.contactMethod,
        message: formData.message || 'No additional message',
      };

      const response = await emailjs.send(serviceId, templateId, templateParams);

      if (response.status === 200) {
        setStatus('success');
        setMessage('Thank you! Your enquiry has been sent successfully. We\'ll get back to you soon.');
        return { success: true };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setMessage('Failed to send enquiry. Please try again later or contact us directly.');
      return { success: false, error: error.message };
    }
  }, []);

  const resetStatus = useCallback(() => {
    setStatus('idle');
    setMessage('');
  }, []);

  return { status, message, sendEmail, resetStatus };
}