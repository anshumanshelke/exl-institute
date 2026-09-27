# ADR-008: Deployment Strategy - Netlify Static Hosting

## Status
Accepted

## Context
Static React SPA (single-page with anchor navigation). Needs: custom domain, SSL, environment variables for EmailJS, automatic builds from Git, preview deployments, SPA routing fallback.

## Decision
**Deploy to Netlify** (alternatives: Vercel, GitHub Pages) with automatic builds from repository.

## Alternatives Considered
1. **Vercel** - Excellent DX, similar features; choose based on preference
2. **GitHub Pages** - Free but no env vars in build, no preview deploys, limited headers
3. **AWS S3 + CloudFront** - Overkill, complex, costs money
4. **Firebase Hosting** - Good but adds Google Cloud dependency
5. **Traditional VPS/FTP** - Manual, no CI/CD, no preview

## Consequences

### Positive (Netlify)
- Free tier: 100GB bandwidth, 300 build mins/month
- Auto-build on git push
- Preview deployments for PRs
- Custom domain + free SSL (Let's Encrypt)
- Environment variables in dashboard (EmailJS keys)
- Edge functions if needed later
- Redirects/headers via `_redirects` / `_headers` files
- Form handling (though we use EmailJS)

### Negative
- Vendor lock-in (mitigated: static export works anywhere)
- Build minute limits (plenty for this project)

## Implementation Notes

### Build Configuration
```js
// vite.config.js
export default defineConfig({
  build: { outDir: 'dist' },
  base: './'  // for relative paths if needed
})
```

```json
// package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Environment Variables (Netlify Dashboard)
```
VITE_EMAILJS_SERVICE_ID = your_service_id
VITE_EMAILJS_TEMPLATE_ID = your_template_id
VITE_EMAILJS_PUBLIC_KEY = your_public_key
```

### Access in Code
```js
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
```

### Custom Domain Setup
1. Add domain in Netlify → Domain settings
2. Configure DNS:
   - Root domain: ALIAS/ANAME → `yoursite.netlify.app`
   - www: CNAME → `yoursite.netlify.app`
3. SSL auto-provisioned

### Pre-deploy Checklist
- [ ] `npm run build` succeeds locally
- [ ] `dist/` contains index.html + assets
- [ ] No console errors in preview
- [ ] EmailJS env vars set in Netlify
- [ ] Contact form works in preview deploy
- [ ] All anchor links work
- [ ] Mobile responsive verified