# ADR-004: Courses Section - Language/Level/Module Accordion

## Status
Accepted

## Context
Page 2 (Courses) requires:
- Language-wise expandable sections (German, French, Chinese, Spoken English)
- Within each language: certification levels (A1, A2, B1, B2, C1, C2 for German)
- Within each level: modules/topics taught
- Data from existing EXL prototype where available
- Visually polished - not a boring table
- Reference: EXL prototype Levels section

## Decision
**Nested `<details>`/`<summary>` disclosure pattern** (native HTML) with React state for smooth height animations.

Three levels:
1. **Language Accordion** - Top level, one open at a time (optional)
2. **Level Accordion** - Within language, multiple can open
3. **Module List** - Static display within level (no disclosure needed)

## Alternatives Considered
1. **Custom React state per level** - More control, but more code, less accessible
2. **Accordion library (Radix)** - Accessible, but adds dependency
3. **CSS `:checked` hack** - No JS, but accessibility issues
4. **Flat list with filters** - Doesn't match "Language → Level → Modules" hierarchy

## Consequences

### Positive
- Semantic HTML: `<details>` = disclosure widget, native keyboard (Enter/Space)
- Screen readers announce open/closed state automatically
- Works without JavaScript (progressive enhancement)
- Minimal React code: map over data, render nested details
- Native browser behavior for "close others" if needed (name attribute)

### Negative
- `<details>` height animation limited (no `height: auto` transition)
- Styling `<summary>` marker requires vendor prefixes
- Multiple open levels per language (acceptable, even desirable)

## Implementation Notes

### Data Structure (courses.json)
```json
{
  "languages": [
    {
      "id": "german",
      "name": "German",
      "icon": "🇩🇪",
      "levels": [
        { "id": "A1", "name": "A1 - Beginner", "modules": [...] }
      ]
    }
  ]
}
```

### Component Structure
```jsx
// LanguageAccordion.jsx
<details className="language-accordion">
  <summary className="language-summary">...</summary>
  <div className="language-content">
    {levels.map(level => (
      <LevelAccordion key={level.id} level={level} />
    ))}
  </div>
</details>

// LevelAccordion.jsx
<details className="level-accordion">
  <summary className="level-summary">...</summary>
  <div className="level-content">
    <ModuleList modules={level.modules} />
  </div>
</details>
```

### Animation
- CSS custom property `--accordion-height` updated via ResizeObserver or `details[open]` + `max-height` transition
- Fallback: instant open/close if animation complex

### Visual Polish
- Language level: card with icon, name, level count
- Level: card with level badge, module count
- Modules: styled list with icons/checkmarks
- Hover/focus states on summaries