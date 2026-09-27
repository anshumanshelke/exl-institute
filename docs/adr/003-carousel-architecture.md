# ADR-003: Carousel Component Architecture

## Status
Accepted

## Context
Two carousel requirements:
1. **Page 1 - Student Achievements**: Image-driven slideshow with photo, name, achievement, course. Smooth transitions, prev/next, pagination, autoplay, touch swipe.
2. **Page 4 - Testimonials/Stories**: Featured testimonial design with photo, name, language, review, achievement. Authentic, personal feel.

Reference: marvellousinfosystems.com (achievements), EXL prototype Stories section (testimonials).

## Decision
Build a **single reusable `useCarousel` hook** + **`Carousel` component** with configurable render props, used by both sections with different slide renderers.

## Alternatives Considered
1. **Swiper.js** - 35KB gzipped, overkill for two simple carousels
2. **Embla Carousel** - 5KB, but external dependency
3. **Two separate implementations** - Code duplication
4. **CSS Scroll Snap only** - No programmatic control for arrows/autoplay

## Consequences

### Positive
- DRY: one hook handles state, auto-rotate, touch, keyboard, reduced-motion
- Each section provides its own `renderSlide` function for custom UI
- Zero dependencies
- Full control over animation, timing, accessibility
- Easy to add pagination dots, progress bar later

### Negative
- Custom implementation (but carousel logic is well-understood)
- Must handle: resize, touch swipe, keyboard, reduced-motion, cleanup

## Implementation Notes

### `useCarousel` hook
```js
{
  currentIndex,
  next, prev, goTo,
  autoRotate: boolean,
  interval: number, // default 5000ms
  paused: boolean,  // on hover/focus
}
```

### Carousel component props
```jsx
<Carousel
  items={data}
  renderSlide={(item, index, isActive) => <SlideComponent />}
  autoRotate={true}
  interval={5000}
  showArrows={true}
  showPagination={true}
  pauseOnHover={true}
/>
```

### Accessibility
- `role="region" aria-roledescription="carousel"`
- Arrow buttons: `aria-label="Next slide"`, `aria-label="Previous slide"`
- Pagination: `aria-label="Go to slide N"`
- Respect `prefers-reduced-motion` (disable animation/auto-rotate)

### Touch Swipe
- `touchstart` → record `clientX`
- `touchend` → delta > 50px → next/prev
- Prevent scroll interference