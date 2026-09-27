# EXL Institute of Foreign Languages - Website

Clean, standard professional website built with React + Vite. Single-page layout with 6 sections.

## ✨ Features

- **6 Sections**: Home, Student Achievements, Courses, How We Teach, Testimonials, Contact
- **Data-Driven**: All content in `/src/data/*.json` - edit without touching code
- **Responsive**: Mobile-first, works on all devices
- **Accessible**: Semantic HTML, keyboard nav, reduced motion support
- **Contact Form**: EmailJS integration (configured for vijaysalgaonkar2026@gmail.com)
- **No Dependencies**: Pure CSS, no UI frameworks

## 🛠 Tech Stack

- React 18 + Vite 5
- Plain CSS with custom properties
- EmailJS for forms
- Netlify/Vercel ready

## 📁 Structure

```
exl-institute/
├── public/assets/           # Images, placeholders
├── src/
│   ├── components/          # 6 page sections + Navigation + Footer
│   ├── data/                # JSON content files (EDIT THESE)
│   ├── hooks/               # useCarousel, useEmailJS, useSmoothScroll
│   ├── styles/
│   │   ├── globals.css      # Design tokens, reset, base
│   │   └── components.css   # All component styles
│   ├── App.jsx              # Main composition
│   └── main.jsx             # Entry point
├── .env.example             # EmailJS config template
├── netlify.toml             # Deployment config
└── package.json
```

## 🚀 Quick Start

```bash
cd exl-institute
npm install
cp .env.example .env
# Edit .env with your EmailJS credentials
npm run dev
```

Visit `http://localhost:3000`

## 📝 Content Management

Edit these JSON files to update the website:

| File | Controls |
|------|----------|
| `src/data/teacher.json` | Teacher name, photo, bio, philosophy |
| `src/data/achievements.json` | Student achievement carousel |
| `src/data/courses.json` | Language → Level → Modules |
| `src/data/teachingMethod.json` | 5 teaching method cards (iframe URLs) |
| `src/data/testimonials.json` | Student testimonials carousel |
| `src/data/contact.json` | Address, phone, WhatsApp, social links |

All use `[PLACEHOLDER: ...]` format - search and replace.

## 📧 EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Add Email Service (Gmail) → get **Service ID**
3. Create Template with variables: `from_name`, `from_email`, `phone`, `language`, `level`, `contact_method`, `message`
4. Set **To Email** = `vijaysalgaonkar2026@gmail.com`
5. Get **Template ID** and **Public Key**
6. Add to `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxx
   VITE_EMAILJS_PUBLIC_KEY=xxx
   ```

## 🌐 Deploy

**Netlify** (recommended):
1. Connect GitHub repo
2. Build: `npm run build` | Publish: `dist`
3. Add env vars in dashboard

**Vercel**: Same process, auto-detects Vite.

## 🎨 Design

Clean standard professional:
- Blue primary (`#2563eb`), neutral grays
- System font stack (no external fonts)
- Consistent spacing scale (0.25rem → 4rem)
- Subtle shadows, rounded corners
- Mobile-first breakpoints: 640, 768, 1024, 1280px