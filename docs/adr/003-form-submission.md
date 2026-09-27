# ADR-003: Form Submission via EmailJS

## Status
Accepted

## Context
The Contact/Register section needs an enquiry form that sends submissions directly to a client inbox. Requirements: no database, no backend, no confirmation email to submitter, client-side only.

## Decision
Use **EmailJS** (client-side email service) for form submission.

## Alternatives Considered
1. **Formspree / Netlify Forms / FormSubmit** - Simpler but less control over template; some require backend functions
2. **Custom backend (Node/Express, Firebase Functions)** - Violates "no backend" constraint
3. **mailto: links** - Poor UX, opens email client, no validation, spam-prone
4. **SendGrid / Mailgun direct API** - Requires API key exposure on client (security risk)

## Consequences

### Positive
- Fully client-side - no server needed
- Template-based emails with dynamic fields
- Service ID, Template ID, Public Key can be stored in .env (not secret)
- Free tier sufficient for low-volume enquiry forms
- Easy to configure: client creates account, shares 3 IDs

### Negative
- Public key exposed in bundle (mitigated: EmailJS designed for this)
- Rate limits on free tier (200 emails/month)
- Depends on third-party service availability
- No built-in honeypot/spam protection (add client-side honeypot field)

## Implementation Notes
- Install `@emailjs/browser` package
- Create `useEmailJS` hook for submission logic
- Store config in `contact.json` with placeholder IDs
- Document in README: client must create EmailJS account, service, template
- Template variables: `from_name`, `from_email`, `from_phone`, `city`, `language`, `purpose`, `query`
- Add honeypot field (hidden via CSS) for basic spam protection
- Show toast/success message on submit (no page redirect)