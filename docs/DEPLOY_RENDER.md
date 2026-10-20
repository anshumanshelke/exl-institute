# Deploying to Render with a Custom Domain

The site is deployed as a free Render **Static Site**, configured by [`render.yaml`](../render.yaml) in the repo root. The contact form uses EmailJS directly from the browser, so no backend server is needed.

## Before you start

- A [Render](https://render.com) account with access to this GitHub repo
- Your EmailJS **Service ID**, **Template ID** and **Public Key** (see the EmailJS setup in the [README](../README.md#-emailjs-setup))
- Login access to wherever your domain's DNS is managed (GoDaddy, Namecheap, Hostinger, Cloudflare, etc.)

## 1. Create the site from the Blueprint

1. Push `render.yaml` to the `master` branch on GitHub.
2. In the Render dashboard, click **New → Blueprint**.
3. Connect your GitHub account if asked, then pick the `exl-institute` repo.
4. Render reads `render.yaml` and shows one service: **exl-institute (Static Site)**.
5. Render asks for the three values marked `sync: false`. Paste them in:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Click **Apply** (or **Deploy Blueprint**). The first build takes a minute or two.
7. Open `https://exl-institute.onrender.com` (the exact URL is shown on the service page) and check:
   - the page loads
   - the contact form sends an email

> **Changing EmailJS values later:** these are baked into the site at build time. After editing them under the service's **Environment** tab, run **Manual Deploy → Clear build cache & deploy**, or the old values stay live.

## 2. Add your custom domain

### In Render

1. Open the **exl-institute** service → **Settings → Custom Domains → Add Custom Domain**.
2. Enter your root domain, e.g. `yourdomain.com`. Render automatically adds `www.yourdomain.com` and redirects it to the root (adding `www` first does the reverse).
3. Leave this page open; it shows the DNS records to create and a **Verify** button.

Optionally, also put the domain in `render.yaml` (uncomment the `domains:` block) so the Blueprint keeps it in sync.

### At your DNS provider

Create these records (replace `exl-institute.onrender.com` with your service's actual onrender.com URL):

| Host / Name | Type | Value |
|---|---|---|
| `@` (root) | `A` | `216.24.57.1` |
| `www` | `CNAME` | `exl-institute.onrender.com` |

- If your provider supports **ALIAS** or **ANAME** records, Render prefers one of those for `@`, pointing to `exl-institute.onrender.com`, instead of the `A` record.
- **Delete any `AAAA` records** on `@` and `www`; Render only uses IPv4 and these break verification.
- Delete any old `A`/`CNAME` records on `@`/`www` that point elsewhere (parking page, Netlify, previous host), and turn off any "domain forwarding" feature.
- **Cloudflare:** use a `CNAME` for `@` too (Cloudflare flattens it), and set both records to **DNS only** (grey cloud).
- If the domain has `CAA` records, allow `letsencrypt.org` and `pki.goog`.

### Verify

1. Back in Render, click **Verify** next to each domain.
2. DNS changes usually take minutes, occasionally a few hours. Check propagation at [dnschecker.org](https://dnschecker.org).
3. Once verified, Render issues a free HTTPS certificate automatically and renews it for you.
4. Visit `https://yourdomain.com` and `https://www.yourdomain.com`; both should load the site over HTTPS.

## 3. After going live

- **Lock down EmailJS:** in the EmailJS dashboard → **Account → Security**, restrict allowed origins to your domain (and the onrender.com URL if you still use it). The public key is visible in the site's code, so this stops other sites from using your email quota.
- **Updates:** every push to `master` rebuilds and redeploys automatically.
- **Content changes:** edit the JSON files in `src/data/`, commit, push — Render deploys the update.

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with a Node/Vite version error | Check `NODE_VERSION` is `22` under **Environment** |
| Form shows "Failed to send enquiry" | EmailJS env vars missing or wrong → fix them, then **Clear build cache & deploy**. Also check the allowed origins in EmailJS |
| Domain stuck on "Verification pending" | Look for leftover `AAAA` records or old `A` records; on Cloudflare make sure the proxy is off (grey cloud) |
| Certificate error on `https://` | Wait a few minutes after verification; if it persists, check `CAA` records |
