# ADR-006: Contact Form & EmailJS Integration

## Status
Accepted

## Context
Page 5 (Contact/Registration) requires:
- Form fields: Full Name, Email, Phone, Language, Level, Preferred Contact Method, Message
- Client-side validation
- EmailJS integration (no backend)
- Send to institute email on submit
- Success/error states
- Quick contact panel: address, email, phone, social, WhatsApp
- Reference: pulseriff.com final section

## Decision
**EmailJS client-side integration** with `useEmailJS` hook, form validation via native HTML5 + custom logic, environment variables for config.

## Alternatives Considered
1. **Formspree/Netlify Forms** - Less template control, some need backend functions
2. **Custom backend** - Violates "no backend" constraint
3. **mailto:** - Poor UX, no validation, spam-prone
4. **SendGrid/Mailgun direct API** - Exposes API keys on client

## Consequences

### Positive
- Fully client-side, no server needed
- Template-based emails with dynamic fields
- Service ID, Template ID, Public Key in .env (not secret)
- Free tier sufficient (200 emails/month)
- Easy client setup: create account, share 3 IDs

### Negative
- Public key in bundle (EmailJS designed for this)
- Rate limits on free tier
- Third-party dependency
- No built-in spam protection (add honeypot)

## Implementation Notes

### Form Fields
```jsx
const fields = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { name: 'language', label: 'Language Interested In', type: 'select', options: languages, required: true },
  { name: 'level', label: 'Level Interested In', type: 'select', options: levels, required: false },
  { name: 'contactMethod', label: 'Preferred Contact Method', type: 'select', options: ['Phone', 'Email', 'WhatsApp'], required: true },
  { name: 'message', label: 'Message / Enquiry', type: 'textarea', required: false },
  { name: 'honeypot', type: 'hidden' } // spam protection
]
```

### EmailJS Template Variables
```
{{from_name}} - Full Name
{{from_email}} - Email
{{phone}} - Phone
{{language}} - Language
{{level}} - Level
{{contact_method}} - Contact Method
{{message}} - Message
```

### .env.example
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Validation
- HTML5 `required`, `type="email"`, `pattern` for phone
- Custom: phone format, email format, honeypot empty
- Show inline errors, disable submit while invalid
- Success toast: "Enquiry sent successfully!"
- Error toast: "Failed to send. Please try again."

### Quick Contact Panel
- Data from contact.json
- Social icons with external links
- WhatsApp: `https://wa.me/{number}?text=Hello%20EXL%20Institute`