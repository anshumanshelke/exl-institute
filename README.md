# EXL Institute of Foreign Languages - Website

A professional, modern, responsive single-page website for EXL Institute of Foreign Languages. Built with React + Vite, featuring 6 sections with smooth scrolling navigation.

## 🌐 Live Demo

[Add deployment URL here after deploying]

## ✨ Features

- **6 Sections**: Home (Teacher Intro), Student Achievements, Courses, How We Teach, Testimonials, Contact
- **Data-Driven**: All content managed via JSON files in `/src/data/` - no code changes needed for content updates
- **Responsive**: Mobile-first design works on desktop, tablet, and mobile
- **Accessible**: Semantic HTML, focus states, keyboard navigation, reduced motion support
- **Performance**: Optimized build, lazy loading, code splitting
- **Forms**: Contact form with validation + EmailJS integration (no backend needed)
- **Animations**: Smooth transitions, carousel auto-rotate, hover effects

## 🛠 Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Plain CSS with Custom Properties (CSS Variables)
- **Forms**: EmailJS (client-side email sending)
- **Icons**: Inline SVGs (no icon library)
- **Deployment**: Netlify / Vercel / GitHub Pages ready

## 📁 Project Structure

```
exl-institute/
├── public/
│   └── assets/              # Images, placeholders, logo
├── src/
│   ├── components/          # React components (one per section)
│   │   ├── Navigation.jsx
│   │   ├── Page0_Intro.jsx
│   │   ├── Page1_Achievements.jsx
│   │   ├── Page2_Courses.jsx
│   │   ├── Page3_HowWeTeach.jsx
│   │   ├── Page4_Testimonials.jsx
│   │   ├── Page5_Contact.jsx
│   │   └── Footer.jsx
│   ├── data/                # JSON content files (EDIT THESE FOR CONTENT)
│   │   ├── teacher.json
│   │   ├── achievements.json
│   │   ├── courses.json
│   │   ├── teachingMethod.json
│   │   ├── testimonials.json
│   │   └── contact.json
│   ├── hooks/               # Custom React hooks
│   │   └── index.js         # useCarousel, useSmoothScroll, useEmailJS
│   ├── styles/              # CSS files
│   │   ├── globals.css      # Design tokens, reset, utilities
│   │   ├── components.css   # Component-specific styles
│   │   └── responsive.css   # Media queries
│   ├── App.jsx              # Main app composition
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone and enter directory
cd exl-institute

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build for Production

```bash
npm run build
```

Output in `dist/` folder - ready for static hosting.

### Preview Production Build

```bash
npm run preview
```

## 📝 Content Management

**All content is in `/src/data/*.json` files.** Edit these to update the website without touching code.

### Data Files Overview

| File | Purpose | Key Fields |
|------|---------|------------|
| `teacher.json` | Page 0: Teacher/MD intro | name, designation, photo, introduction, philosophy, experience |
| `achievements.json` | Page 1: Student carousel | students[]: id, name, photo, achievement, course, description |
| `courses.json` | Page 2: Courses accordion | languages[]: id, name, icon, description, levels[]: id, name, description, modules[] |
| `teachingMethod.json` | Page 3: Iframe sections | sections[]: id, title, description, iframeUrl, placeholderImage |
| `testimonials.json` | Page 4: Testimonials carousel | testimonials[]: id, name, photo, language, level, review, achievement |
| `contact.json` | Page 5: Contact info + EmailJS | address, email, phone, whatsapp, social{}, emailjs{} |

### Placeholder Format
All missing content uses `[PLACEHOLDER: description]` format. Search for "PLACEHOLDER" in data files to find what needs real content.

## 📧 EmailJS Setup (Contact Form)

The contact form uses EmailJS for client-side email sending (no backend).

### Setup Steps:
1. Create free account at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with these variables:
   ```
   {{from_name}} - Full Name
   {{from_email}} - Email
   {{phone}} - Phone
   {{language}} - Language
   {{level}} - Level
   {{contact_method}} - Contact Method
   {{message}} - Message
   ```
4. Get your **Service ID**, **Template ID**, and **Public Key** from EmailJS dashboard
5. Add to `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Template Example:
```
Subject: New EXL Institute Enquiry from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Language: {{language}}
Level: {{level}}
Preferred Contact: {{contact_method}}

Message:
{{message}}
```

## 🎨 Design System

### Colors (CSS Variables in `globals.css`)
```css
--color-primary: #1a3c5e;      /* Deep navy */
--color-primary-dark: #0d2a45;
--color-accent: #e8a838;       /* Gold */
--color-bg: #f8f9fa;
--color-surface: #ffffff;
--color-text: #1f2937;
```

### Typography
- **Font**: Inter (system-ui fallback)
- **Scale**: --font-size-xs (0.75rem) to --font-size-4xl (2.5rem)

### Spacing
- **Scale**: --space-1 (0.25rem) to --space-20 (5rem)

### Breakpoints (mobile-first)
- 640px, 768px, 1024px, 1280px, 1536px

## 📦 Deployment

### Netlify (Recommended)
1. Push to GitHub/GitLab/Bitbucket
2. Connect repository in [Netlify](https://app.netlify.com/)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Site Settings → Environment Variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Deploy!

### Vercel
1. Import project in [Vercel](https://vercel.com/)
2. Framework preset: Vite
3. Add environment variables
4. Deploy!

### GitHub Pages
1. Add `base: '/repo-name/'` to `vite.config.js`
2. Enable Pages in repo settings
3. Use GitHub Actions for build/deploy

## ✅ Pre-Launch Checklist

- [ ] Replace all `[PLACEHOLDER: ...]` content in `/src/data/*.json`
- [ ] Add real images to `/public/assets/` (teacher photo, student photos, logo)
- [ ] Configure EmailJS and add env vars
- [ ] Add real iframe URLs to `teachingMethod.json`
- [ ] Update social media URLs in `contact.json`
- [ ] Test contact form in preview deployment
- [ ] Verify all anchor links work (#intro, #achievements, etc.)
- [ ] Test on mobile, tablet, desktop
- [ ] Check console for errors
- [ ] Verify reduced motion works
- [ ] Add favicon.ico
- [ ] Configure custom domain + SSL

## 🔧 Customization

### Change Colors
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
}
```

### Add New Language
1. Add to `courses.json` languages array
2. Add levels and modules
3. Form dropdown updates automatically

### Modify Animations
Edit keyframes in `globals.css` or component CSS

## 📄 License

MIT License - Feel free to use for your own projects.

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Open Pull Request

## 📞 Support

For questions about this implementation, refer to the ADR documents in `/docs/adr/` or create an issue.