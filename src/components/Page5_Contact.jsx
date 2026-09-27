import { useState } from 'react';
import { PageSection } from './Section';
import { useEmailJS } from '../hooks';
import coursesData from '../data/courses.json';
import contactData from '../data/contact.json';

/**
 * Page 5: Contact / Registration
 * Enquiry form with validation + EmailJS integration
 * Quick contact panel with address, email, phone, social, WhatsApp
 */
export default function Page5_Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    language: '',
    level: '',
    contactMethod: 'Phone',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const { status, message, sendEmail, resetStatus } = useEmailJS();

  const getLevelsForLanguage = (languageId) => {
    const language = coursesData.languages.find(l => l.id === languageId);
    return language ? language.levels.map(l => ({ id: l.id, name: l.name })) : [];
  };

  const levels = formData.language ? getLevelsForLanguage(formData.language) : [];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.language) {
      newErrors.language = 'Please select a language';
    }
    
    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Please select a contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'language') {
      setFormData(prev => ({ ...prev, [name]: value, level: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await sendEmail(formData);
    
    if (result.success) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        language: '',
        level: '',
        contactMethod: 'Phone',
        message: ''
      });
    }
  };

  const languageOptions = coursesData.languages.map(l => ({ id: l.id, name: l.name }));
  const contactMethods = ['Phone', 'Email', 'WhatsApp'];

  return (
    <PageSection 
      id="contact" 
      title="Get in Touch" 
      subtitle="Ready to start your language journey? Send us an enquiry and we'll respond within 24 hours."
      variant="dark"
    >
      <div className="contact__grid">
        {/* Form */}
        <div className="contact__form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label htmlFor="fullName" className="contact-form__label">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="contact-form__input"
                  required
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="contact-form__error" role="alert">{errors.fullName}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label htmlFor="email" className="contact-form__label">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-form__input"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="contact-form__error" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__group">
                <label htmlFor="phone" className="contact-form__label">
                  Phone Number <span aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact-form__input"
                  required
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                  placeholder="+91 XXXXXXXXXX"
                />
                {errors.phone && (
                  <p id="phone-error" className="contact-form__error" role="alert">{errors.phone}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label htmlFor="contactMethod" className="contact-form__label">
                  Preferred Contact Method <span aria-hidden="true">*</span>
                </label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="contact-form__select"
                  required
                  aria-invalid={!!errors.contactMethod}
                >
                  {contactMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {errors.contactMethod && (
                  <p className="contact-form__error" role="alert">{errors.contactMethod}</p>
                )}
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__group">
                <label htmlFor="language" className="contact-form__label">
                  Language Interested In <span aria-hidden="true">*</span>
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="contact-form__select"
                  required
                  aria-invalid={!!errors.language}
                >
                  <option value="">Select a language</option>
                  {languageOptions.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                {errors.language && (
                  <p className="contact-form__error" role="alert">{errors.language}</p>
                )}
              </div>

              <div className="contact-form__group">
                <label htmlFor="level" className="contact-form__label">
                  Level Interested In
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="contact-form__select"
                  disabled={levels.length === 0}
                >
                  <option value="">Select a level</option>
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-form__group">
              <label htmlFor="message" className="contact-form__label">
                Message / Enquiry
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="contact-form__textarea"
                rows={4}
                placeholder="Tell us about your goals, preferred schedule, or any questions..."
              />
            </div>

            <input type="hidden" name="honeypot" tabIndex={-1} autoComplete="off" />

            <button
              type="submit"
              className="contact-form__submit btn btn-accent btn-lg"
              disabled={status === 'submitting'}
              style={{ width: '100%' }}
            >
              {status === 'submitting' ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                'Send Enquiry'
              )}
            </button>

            {(status === 'success' || status === 'error') && (
              <div 
                className={`contact-form__status ${status === 'success' ? 'contact-form__status--success' : 'contact-form__status--error'}`}
                role="alert"
              >
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Quick Contact Info */}
        <aside className="contact__info" aria-labelledby="contact-info-title">
          <h2 id="contact-info-title" className="visually-hidden">Quick Contact Information</h2>
          
          <div className="contact-info-card">
            <h3 className="contact-info-card__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Visit Us
            </h3>
            <address className="contact-info-card__item">
              <svg className="contact-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {contactData.address}
            </address>
          </div>

          <div className="contact-info-card">
            <h3 className="contact-info-card__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email Us
            </h3>
            <a href={`mailto:${contactData.email}`} className="contact-info-card__item">
              <svg className="contact-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {contactData.email}
            </a>
          </div>

          <div className="contact-info-card">
            <h3 className="contact-info-card__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </h3>
            <a href={`tel:${contactData.phone}`} className="contact-info-card__item">
              <svg className="contact-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {contactData.phone}
            </a>
          </div>

          <div className="contact-info-card">
            <h3 className="contact-info-card__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp Business
            </h3>
            <a 
              href={`https://wa.me/${contactData.whatsapp}?text=Hello%20EXL%20Institute%2C%20I%20would%20like%20to%20enquire%20about%20your%20courses.`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card__whatsapp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a19.5 19.5 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Chat on WhatsApp
            </a>
            <div className="contact-info-card__social">
              {Object.entries(contactData.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card__social-link"
                  aria-label={platform}
                >
                  {platform === 'facebook' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  {platform === 'instagram' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                  {platform === 'linkedin' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  )}
                  {platform === 'youtube' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}