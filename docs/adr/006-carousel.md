# ADR-006: Testimonial Carousel Implementation

## Status
Accepted

## Context
The Student Success Stories section needs a testimonial carousel with:
- Photo, name, role/location, quote
- Left/right navigation arrows
- 5 testimonials (from JSON)
- Professional, smooth transitions

## Decision
Build a **lightweight custom carousel** using CSS transform + React state (no library).

## Alternatives Considered
1. **Swiper.js** - Feature-rich, but ~35KB gzipped; overkill for simple carousel
2. **React Slick / React Alice Carousel** - Adds dependencies, peer dependency issues
3. **Embla Carousel** - Lightweight (~5KB), but still external dependency
4. **Native CSS Scroll Snap** - No JS control for arrows, no loop, limited browser support for programmatic scroll

## Consequences

### Positive
- Zero dependencies
- Full control over behavior (loop, autopause, keyboard nav)
- Tiny implementation (~50 lines JS + CSS)
- Easy to customize animation, timing, touch handling
- No version conflicts or maintenance burden

### Negative
- Reinventing wheel (but wheel is simple)
- Must handle edge cases: touch swipe, keyboard, resize, reduced motion
- No built-in pagination dots (can add if needed)

## Implementation Notes
- State: `currentIndex` (0-4)
- CSS: `.carousel-track { display: flex; transition: transform 0.4s ease; }`
- Each slide: `flex: 0 0 100%; width: 100%;`
- Transform: `translateX(-${currentIndex * 100}%)`
- Arrow buttons: `onClick` → `setIndex((i + 1) % length)` / `(i - 1 + length) % length`
- Auto-rotate: `setInterval` (pause on hover/focus)
- Accessibility: `aria-label` on arrows, `role="region" aria-roledescription="carousel"`
- Reduced motion: respect `prefers-reduced-motion` (disable animation/auto-rotate)
- Touch swipe: simple `touchstart`/`touchend` delta detection