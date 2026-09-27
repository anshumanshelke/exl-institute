# ADR-005: Styling Approach

## Status
Accepted

## Context
Need a professional, credibility-building visual design for a language institute. Requirements: responsive, maintainable, no CSS framework dependency, easy to customize colors/fonts later.

## Decision
**Plain CSS with Custom Properties (CSS Variables)** - no framework, no CSS-in-JS, no Tailwind.

## Alternatives Considered
1. **Tailwind CSS** - Utility-first, rapid prototyping, but adds build dependency, learning curve, large class strings in JSX
2. **Styled Components / Emotion** - CSS-in-JS, but adds runtime overhead, bundler complexity
3. **Bootstrap / Material UI** - Heavy, opinionated, hard to customize for unique brand
4. **Sass/SCSS** - Adds build dependency; CSS custom properties now cover most use cases

## Consequences

### Positive
- Zero dependencies beyond Vite's built-in CSS handling
- Custom properties = design tokens (colors, spacing, fonts) in one place
- Easy to theme: change `--color-primary` etc. globally
- Native CSS nesting (supported in all modern browsers)
- No build-time CSS processing needed
- Smallest bundle size
- Easy for non-technical designers to tweak variables

### Negative
- No utility classes (write component-scoped CSS)
- No built-in responsive utilities (write media queries manually)
- No dead CSS elimination (but codebase is small)
- More verbose than Tailwind for rapid iteration

## Implementation Notes
- `/src/styles/globals.css` - design tokens, reset, base styles, utilities
- `/src/styles/components.css` - component-specific styles (Header, Courses, etc.)
- `/src/styles/responsive.css` - media queries at bottom
- Import order in `main.jsx`: globals → components → responsive
- Use BEM-ish naming: `.component__element--modifier`
- Mobile-first media queries in responsive.css
- Container max-width: 1200px with 1.5rem padding
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)