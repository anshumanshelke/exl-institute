# ADR-001: Technology Stack Selection

## Status
Accepted

## Context
Build a 6-section single-page website for EXL Institute of Foreign Languages. Requirements: component-based architecture, data-driven content via JSON, smooth animations, carousel/accordion interactions, iframe embedding, EmailJS form handling, responsive design, easy non-technical content updates.

## Decision
**React + Vite** as the technology stack.

## Alternatives Considered
1. **Plain HTML/CSS/JS** - Zero deps, but manual DOM management for 6 interactive sections, no component reuse, harder maintenance
2. **Vue + Vite** - Similar benefits, but team less familiar
3. **Next.js** - Overkill for static SPA; adds SSR/routing complexity not needed
4. **Astro** - Good for content sites, but React components needed for interactive sections (carousels, accordions, iframe player, form)

## Consequences

### Positive
- Component-per-section maps naturally to 6-page structure
- JSON data imports at build time for zero-runtime content fetching
- Vite: fast HMR dev server, optimized production builds
- React ecosystem: mature carousel, animation, form libraries if needed
- Non-technical editors only modify `/src/data/*.json` files
- Single-page with anchor navigation - no routing library needed

### Negative
- ~40KB gzipped JS baseline (acceptable for modern sites)
- Build step required (trivial with Vite)

## Implementation Notes
- Functional components + hooks only
- Minimal local state (carousel index, accordion open, form fields)
- No state management library
- Plain CSS with custom properties (no CSS-in-JS, no Tailwind)
- Import JSON directly in App.jsx, pass as props