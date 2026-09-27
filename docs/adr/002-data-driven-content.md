# ADR-002: Data-Driven Content Architecture

## Status
Accepted

## Context
Six content-heavy sections (Teacher, Achievements, Courses, Teaching Method, Testimonials, Contact) must be editable by non-technical stakeholders without code changes. Content includes structured data (courses: language→level→modules), media references, and configuration.

## Decision
Store all content in local JSON files under `/src/data/`:
- `teacher.json` - Teacher/MD photo, name, designation, bio, philosophy
- `achievements.json` - Student achievement carousel data (photo, name, achievement, course)
- `courses.json` - Language → Levels → Modules hierarchy
- `teachingMethod.json` - How We Teach sections with iframe URLs
- `testimonials.json` - Student stories (photo, name, language, review, achievement)
- `contact.json` - Address, phone, email, WhatsApp, social URLs, EmailJS config

Components receive data via props from App.jsx (single import point).

## Alternatives Considered
1. **Headless CMS** - Overkill, external dependency, cost
2. **Markdown/MDX** - Better for long-form; courses/achievements are structured data
3. **Database + API** - Violates "no backend" constraint
4. **Hardcoded in components** - Violates requirement for easy content replacement

## Consequences

### Positive
- Content edits = JSON edits only, no code changes
- Version-controlled content in git
- Zero runtime fetching - built into bundle
- TypeScript types can be generated for IDE autocomplete
- Build-time validation possible

### Negative
- Content changes require rebuild/redeploy (acceptable for static site)
- No live preview without dev server
- JSON lacks comments (use descriptive placeholder keys)

## Implementation Notes
- Placeholder format: `[PLACEHOLDER: description]` for missing content
- Keep structure flat where possible
- Export TypeScript interfaces from `src/types/index.ts`
- App.jsx imports all JSON, passes slices to page components