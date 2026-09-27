# ADR-005: How We Teach - Iframe-Based Interactive Presentation

## Status
Accepted

## Context
Page 3 requires an interactive visual presentation explaining the teaching methodology:
- Live Classes + Guided Learning + Self-study at Home + Practice & Revision + Exam Preparation
- Each concept has an associated visual/iframe/content panel
- Reference: pulseriff.com interaction style
- Iframe URLs/content will be provided later by client
- Must be easily replaceable via configuration

## Decision
**Configurable iframe grid/card layout** with data-driven sections from `teachingMethod.json`. Each section renders an iframe (or placeholder) with title, description, and interactive frame.

## Alternatives Considered
1. **YouTube Player API** - Only for video; this needs generic iframe content
2. **Hardcoded iframes in component** - Violates easy replacement requirement
3. **Modal/lightbox on click** - Spec says "inline" presentation
4. **Separate page per section** - Violates single-page architecture

## Consequences

### Positive
- Iframe URLs in JSON → client updates without code changes
- Flexible: supports any embeddable content (videos, interactive demos, PDFs, forms)
- Grid layout adapts to content count (5 sections → 2/3 column grid)
- Loading states, error handling for failed iframes
- Sandbox attributes for security

### Negative
- Iframe content not SEO-indexable (acceptable for demo section)
- Cross-origin restrictions may block some embeds
- Cookie consent may be needed for third-party iframes
- Mobile iframe UX can be challenging (scrolling, sizing)

## Implementation Notes

### teachingMethod.json
```json
{
  "sections": [
    {
      "id": "live-classes",
      "title": "Live Classes",
      "description": "Real-time interactive sessions with the teacher",
      "iframeUrl": "[PLACEHOLDER: https://...]",
      "placeholderImage": "/assets/teaching-live-placeholder.svg"
    }
    // guided-learning, self-study, practice, exam-prep
  ]
}
```

### Component: TeachingSection.jsx
```jsx
<iframe
  src={section.iframeUrl}
  title={section.title}
  className="teaching-iframe"
  sandbox="allow-scripts allow-same-origin allow-forms"
  loading="lazy"
/>
```

### Layout
- Desktop: 2-3 column grid (CSS Grid auto-fit)
- Tablet: 2 column
- Mobile: 1 column stack
- Each card: title, description, iframe container (16:9 aspect ratio)
- Placeholder image shown while iframe loads / if URL missing

### Security
- `sandbox` attribute restricts iframe capabilities
- `loading="lazy"` defers offscreen iframes
- CSP considerations documented in README

### Interaction (pulseriff.com style)
- Hover effects on cards
- Smooth entrance animation (staggered)
- Iframe loads on demand (IntersectionObserver) for performance