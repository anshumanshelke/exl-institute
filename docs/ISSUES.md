# Known UI Bugs — Tracking Index

Bugs found during a UI review of the current build (against the original build prompt and the Excalidraw wireframe). Each GitHub issue contains a precise, copy-paste-ready fix.

Repo: https://github.com/anshumanshelke/exl-institute

| # | Severity | Bug | Primary file(s) |
|---|----------|-----|-----------------|
| [#1](https://github.com/anshumanshelke/exl-institute/issues/1) | 🔴 Critical | "How We Teach" cards embed the entire website via a broken iframe placeholder guard | `src/components/Page3_HowWeTeach.jsx` |
| [#2](https://github.com/anshumanshelke/exl-institute/issues/2) | 🔴 Critical | Carousels don't clip overflow — adjacent slides bleed in on both edges | `src/styles/components.css` |
| [#3](https://github.com/anshumanshelke/exl-institute/issues/3) | 🟠 High | `.visually-hidden` class undefined — "Quick Contact Information" heading shows on screen | `src/styles/globals.css`, `src/components/Page5_Contact.jsx` |
| [#4](https://github.com/anshumanshelke/exl-institute/issues/4) | 🟠 High | Missing `.btn-accent` / `.btn-lg` — "Explore Courses" CTA renders as plain text | `src/styles/globals.css` |
| [#5](https://github.com/anshumanshelke/exl-institute/issues/5) | 🟠 High | `.page-section--dark` undefined — Contact section renders white instead of dark | `src/styles/components.css` |
| [#6](https://github.com/anshumanshelke/exl-institute/issues/6) | 🟠 High | Undefined nav classes — header cramped, "How We Teach" wraps to 3 lines | `src/styles/components.css` |
| [#7](https://github.com/anshumanshelke/exl-institute/issues/7) | 🟡 Medium | `.page-section` has no vertical padding — sections cramped together | `src/styles/components.css` |
| [#8](https://github.com/anshumanshelke/exl-institute/issues/8) | 🟡 Medium | Remove dead conflicting starter stylesheets (`src/index.css`, `src/App.css`) | `src/index.css`, `src/App.css` |

## Suggested fix order
1. #1 and #2 (Critical) — these account for most of the "broken" appearance.
2. #3, #4, #5, #6 (High) — visible defects; all are small CSS additions plus one existing element.
3. #7, #8 (Medium) — spacing polish and dead-code cleanup.

## Notes (not bugs)
- The `[PLACEHOLDER: ...]` text throughout (names, address, phone, teacher name) is **intentional** per the build prompt — real content is supplied by the client later.
- Confirm whether the destination inbox email shown publicly in the header/contact is the intended public contact address.
