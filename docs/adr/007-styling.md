# ADR-007: Styling Approach - Design System with CSS Custom Properties

## Status
Accepted

## Context
Professional, credible visual design for language institute. Requirements: responsive, maintainable, no framework dependency, easy to customize, premium feel, animation support, reduced-motion respect.

## Decision
**Plain CSS with Custom Properties (CSS Variables)** - no framework, no CSS-in-JS, no Tailwind. Three-layer architecture: globals (tokens), components, responsive.

## Alternatives Considered
1. **Tailwind CSS** - Rapid, but adds dependency, verbose JSX, design tokens in config not CSS
2. **Styled Components/Emotion** - Runtime overhead, bundler complexity
3. **Bootstrap/MUI** - Heavy, opinionated, hard to customize uniquely
4. **Sass/SCSS** - Build dependency; CSS custom properties cover nesting, variables

## Consequences

### Positive
- Zero CSS dependencies beyond Vite
- Design tokens in `:root` = single source of truth
- Easy theming: change `--color-primary` globally
- Native CSS nesting (all modern browsers)
- Smallest bundle size
- Non-technical designers can tweak variables

### Negative
- No utility classes (write component-scoped CSS)
- Manual media queries (but codebase is small)
- No dead CSS elimination (acceptable for this scale)

## Implementation Notes

### File Structure
```
/src/styles/
  globals.css      # :root tokens, reset, base, utilities
  components.css   # Component-specific styles (BEM-ish)
  responsive.css   # Media queries (mobile-first)
```

### Import Order (main.jsx)
```js
import './styles/globals.css'
import './styles/components.css'
import './styles/responsive.css'
```

### Design Tokens (from globals.css)
```css
:root {
  --color-primary: #1a3c5e;      /* Deep navy */
  --color-primary-dark: #0d2a45;
  --color-accent: #e8a838;       /* Gold */
  --color-bg: #f8f9fa;
  --color-surface: #fff;
  --color-text: #1f2937;
  --color-text-secondary: #4b5563;
  --font-family: 'Inter', system-ui, sans-serif;
  --container-max: 1200px;
  --container-padding: 1.5rem;
  --space-1: 0.25rem; ... --space-20: 5rem;
  --radius-md: 0.5rem; --radius-lg: 0.75rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

### Component CSS Naming
- `.page-section` - Section wrapper
- `.page-section__header` - Title area
- `.page-section__content` - Main content
- `.component-name__element--modifier` (BEM-ish)

### Responsive Breakpoints (mobile-first)
```css
/* 640px - small tablets */
@media (min-width: 640px) { ... }

/* 768px - tablets */
@media (min-width: 768px) { ... }

/* 1024px - laptops */
@media (min-width: 1024px) { ... }

/* 1280px - desktop */
@media (min-width: 1280px) { ... }
```

### Animations
- `@keyframes` in globals.css
- Utility classes: `.animate-fade-in`, `.animate-slide-up`
- Respect `prefers-reduced-motion` in responsive.css