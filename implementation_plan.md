# EXL Institute of Foreign Languages - Implementation Plan

## Project Overview
Professional, modern, responsive static website for EXL Institute of Foreign Languages - a language institute run by a single teacher/Managing Director. 6-page single-page experience with smooth scrolling navigation.

## Tech Stack Decision (ADR-001)
**React + Vite** - Component-based, fast build, data-driven content via JSON, easy handoff.

---

## File Structure
```
/home/anshuman/exl-institute/
├── public/
│   ├── assets/
│   │   ├── logo-placeholder.svg
│   │   ├── teacher-placeholder.svg       # Teacher/MD photo
│   │   ├── student-placeholder.svg       # Student achievement photos
│   │   ├── testimonial-placeholder.svg
│   │   └── slides/                       # Page 0 hero slides if needed
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx                # Sticky header with smooth scroll
│   │   ├── Page0_Intro.jsx              # Teacher/MD intro, photo, philosophy, CTA
│   │   ├── Page1_Achievements.jsx       # Student achievement carousel
│   │   ├── Page2_Courses.jsx            # Language-wise expandable courses
│   │   ├── Page3_HowWeTeach.jsx         # Iframe-based interactive presentation
│   │   ├── Page4_Testimonials.jsx       # Student stories carousel
│   │   ├── Page5_Contact.jsx            # Contact form + EmailJS
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── teacher.json                 # Teacher/MD info
│   │   ├── achievements.json            # Student achievements for carousel
│   │   ├── courses.json                 # Language → Levels → Modules
│   │   ├── teachingMethod.json          # How We Teach sections + iframe URLs
│   │   ├── testimonials.json            # Student stories
│   │   └── contact.json                 # Contact info + EmailJS config
│   ├── hooks/
│   │   ├── useEmailJS.js                # EmailJS submission
│   │   ├── useSmoothScroll.js           # Smooth scroll navigation
│   │   └── useCarousel.js               # Reusable carousel logic
│   ├── styles/
│   │   ├── globals.css                  # Design tokens, reset, utilities
│   │   ├── components.css               # Component-specific styles
│   │   └── responsive.css               # Media queries
│   ├── App.jsx                          # Compose all pages, anchor navigation
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml                         # Deployment config
├── README.md
├── .gitignore
└── .env.example                         # EmailJS env vars template
```

---

## Implementation Milestones

### Milestone 1: Foundation & Design System ✓
- [x] Vite + React scaffolded
- [x] Dependencies installed (@emailjs/browser)
- [x] Directory structure created
- [x] Design tokens in globals.css (colors, typography, spacing, shadows)
- [x] Placeholder SVG assets created

### Milestone 2: Data Layer & Configuration
- [ ] Create all JSON data files per spec (teacher, achievements, courses, teachingMethod, testimonials, contact)
- [ ] Create .env.example for EmailJS config
- [ ] Create netlify.toml for deployment

### Milestone 3: Core Components - Navigation & Layout
- [ ] Navigation component (sticky, smooth scroll, active section indicator)
- [ ] Footer component
- [ ] Responsive.css with mobile-first breakpoints

### Milestone 4: Page 0 - Introduction/Opening
- [ ] Teacher/MD hero section with large photo
- [ ] Name, designation, bio, teaching philosophy
- [ ] CTA to Courses or Contact
- [ ] Smooth entrance animations

### Milestone 5: Page 1 - Student Achievements
- [ ] Carousel component (reusable hook)
- [ ] Student cards: photo, name, achievement, course
- [ ] Smooth transitions, prev/next, pagination, autoplay
- [ ] Touch/swipe support, keyboard nav
- [ ] Reference: marvellousinfosystems.com presentation style

### Milestone 6: Page 2 - Courses Offered
- [ ] Language-wise expandable sections (accordion pattern)
- [ ] Level selection within language
- [ ] Module display on level select
- [ ] Data from courses.json (Language → Levels → Modules)
- [ ] Reference: EXL prototype levels section
- [ ] Visually polished - not a boring table

### Milestone 7: Page 3 - How We Teach / Class Format
- [ ] Iframe-based interactive presentation
- [ ] Configurable iframe URLs via teachingMethod.json
- [ ] Sections: Live Classes, Guided Learning, Self-study, Practice, Exam Prep
- [ ] Reference: pulseriff.com interaction style
- [ ] Easy URL replacement via data file

### Milestone 8: Page 4 - Testimonials / Student Stories
- [ ] Carousel with featured testimonial design
- [ ] Student photo, name, language, review, achievement
- [ ] Reference: EXL prototype Stories section
- [ ] Authentic, personal feel - not generic grid

### Milestone 9: Page 5 - Contact / Registration
- [ ] Form: Name, Email, Phone, Language, Level, Contact Method, Message
- [ ] Client-side validation
- [ ] EmailJS integration (service ID, template ID, public key from env)
- [ ] Success/error states
- [ ] Quick contact panel: address, email, phone, social, WhatsApp
- [ ] Reference: pulseriff.com final section

### Milestone 10: Polish, Responsive & Documentation
- [ ] Mobile-first responsive (desktop, laptop, tablet, mobile)
- [ ] Touch interactions for all carousels/accordions
- [ ] Reduced motion support
- [ ] Focus states, semantic HTML, contrast
- [ ] README.md: setup, pending fields, deployment
- [ ] Final testing checklist

---

## Data Files Specification

### teacher.json
```json
{
  "name": "[PLACEHOLDER]",
  "designation": "Teacher / Founder / Managing Director",
  "photo": "/assets/teacher-placeholder.svg",
  "introduction": "[PLACEHOLDER: Short professional intro]",
  "philosophy": "[PLACEHOLDER: Teaching philosophy statement]",
  "experience": "[PLACEHOLDER: Years experience, background]"
}
```

### achievements.json
```json
{
  "students": [
    {
      "id": 1,
      "name": "[PLACEHOLDER]",
      "photo": "/assets/student-placeholder.svg",
      "achievement": "[PLACEHOLDER: e.g., Completed German A2 certification]",
      "course": "[PLACEHOLDER: German A2]",
      "description": "[PLACEHOLDER: Optional longer description]"
    }
    // 6-8 students
  ]
}
```

### courses.json
```json
{
  "languages": [
    {
      "id": "german",
      "name": "German",
      "levels": [
        {
          "id": "A1",
          "name": "A1 - Beginner",
          "modules": [
            "Module 1: Basics",
            "Module 2: Grammar Fundamentals",
            "Module 3: Vocabulary Building",
            "Module 4: Speaking Practice",
            "Module 5: Listening Skills",
            "Module 6: Reading & Writing"
          ]
        }
        // A2, B1, B2, C1, C2
      ]
    }
    // French, Chinese, Spoken English
  ]
}
```

### teachingMethod.json
```json
{
  "sections": [
    {
      "id": "live-classes",
      "title": "Live Classes",
      "description": "[PLACEHOLDER]",
      "iframeUrl": "[PLACEHOLDER: https://...]"
    },
    {
      "id": "guided-learning",
      "title": "Guided Learning",
      "description": "[PLACEHOLDER]",
      "iframeUrl": "[PLACEHOLDER: https://...]"
    }
    // self-study, practice, exam-prep
  ]
}
```

### testimonials.json
```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "[PLACEHOLDER]",
      "photo": "/assets/testimonial-placeholder.svg",
      "language": "[PLACEHOLDER: German]",
      "level": "[PLACEHOLDER: A2]",
      "review": "[PLACEHOLDER: Student review text]",
      "achievement": "[PLACEHOLDER: Outcome]"
    }
    // 5-6 testimonials
  ]
}
```

### contact.json
```json
{
  "address": "[PLACEHOLDER]",
  "email": "[PLACEHOLDER]",
  "phone": "[PLACEHOLDER]",
  "whatsapp": "[PLACEHOLDER]",
  "social": { "facebook": "", "instagram": "", "linkedin": "", "youtube": "" },
  "emailjs": {
    "serviceId": "[PLACEHOLDER]",
    "templateId": "[PLACEHOLDER]",
    "publicKey": "[PLACEHOLDER]"
  }
}
```

---

## Pending Inputs Tracker

| Data File | Required From Client | Status |
|-----------|---------------------|--------|
| teacher.json | Teacher photo, name, bio, philosophy | Placeholders ready |
| achievements.json | 6-8 student photos, names, achievements | Placeholders ready |
| courses.json | All levels/modules per language (from EXL prototype) | Structure ready |
| teachingMethod.json | 5 iframe URLs for teaching sections | Placeholders ready |
| testimonials.json | 5-6 student photos, reviews, outcomes | Placeholders ready |
| contact.json | Address, email, phone, WhatsApp, social URLs | Placeholders ready |
| .env | EmailJS Service ID, Template ID, Public Key | Documented in .env.example |

---

## Reference Websites to Study
1. **marvellousinfosystems.com** - Student achievement presentation (Page 1)
2. **exl-lang-coaching.preview.emergentagent.com** - Courses levels & Stories sections (Pages 2, 4)
3. **pulseriff.com** - How We Teach interaction & Contact section (Pages 3, 5)

---

## Design System (from globals.css)
- **Primary**: #1a3c5e (deep navy)
- **Accent**: #e8a838 (gold)
- **Background**: #f8f9fa
- **Surface**: #ffffff
- **Typography**: Inter / system-ui
- **Container**: 1200px max, 1.5rem padding
- **Border radius**: 0.5rem (md), 0.75rem (lg)
- **Shadows**: Layered elevation system
- **Transitions**: 150ms/250ms/350ms
- **Breakpoints**: 640, 768, 1024, 1280

---

## Deployment
- **Target**: Netlify (or Vercel/GitHub Pages)
- **Build**: `npm run build` → `dist/`
- **Env vars**: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
- **SPA redirect**: `/* /index.html 200`
- **Custom domain**: Configure in Netlify + DNS