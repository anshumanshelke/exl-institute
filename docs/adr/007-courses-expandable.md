# ADR-007: Courses Expandable Card Pattern

## Status
Accepted

## Context
The Courses section displays 4 language cards. Each card expands (dropdown) to show 3 program tracks (Goethe/Exam, EXL Certification, Kids), each with duration and exam-level detail placeholders.

## Decision
Use **CSS-only disclosure pattern** with `<details>`/`<summary>` for expandable tracks, enhanced with React state for smooth animation.

## Alternatives Considered
1. **Accordion library (Radix, Headless UI)** - Accessible, but adds dependency for simple pattern
2. **Pure CSS `:checked` hack** - No JS, but limited control, accessibility issues
3. **Custom React state per card** - Full control, but more code
4. **Native `<details>`/`<summary>`** - Semantic, accessible, zero JS for basic function

## Consequences

### Positive
- Semantic HTML: `<details>` = disclosure widget, `<summary>` = trigger
- Native keyboard support (Enter/Space to toggle)
- Screen readers announce open/closed state
- Works without JavaScript (progressive enhancement)
- CSS `::details-content` pseudo-element for animation (modern browsers)
- Minimal React code: just map over tracks

### Negative
- `<details>` animation limited (no height auto transition)
- Styling `<summary>` marker requires `::-webkit-details-marker` / `list-style: none`
- No built-in "close others" behavior (acceptable: multiple tracks can open)

## Implementation Notes
- Structure per language:
  ```jsx
  <details className="course-card">
    <summary className="course-summary">...</summary>
    <div className="course-content">
      {tracks.map(track => (
        <details className="track-card">
          <summary className="track-summary">...</summary>
          <div className="track-content">
            <p>Duration: {track.duration}</p>
            <ul>{track.examLevels.map(...)}</ul>
          </div>
        </details>
      ))}
    </div>
  </details>
  ```
- CSS: `--track-height` custom property for smooth open/close
- JavaScript: optional `onToggle` for analytics later
- Placeholder exam levels clearly marked in JSON