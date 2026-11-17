import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { PageSection } from './Section';
import Toast from './Toast';
import { useEmailJS, useToast } from '../hooks';
import coursesData from '../data/courses.json';
import contactData from '../data/contact.json';
import { SOCIAL_LINKS } from '../data/socialLinks';
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString
} from 'libphonenumber-js/min';

const flagUrls = import.meta.glob('../../node_modules/country-flag-icons/3x2/*.svg', {
  eager: true,
  import: 'default',
  query: '?url'
});

const INDIA_COUNTRY = 'IN';
const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryOptions = getCountries()
  .map(code => ({
    code,
    name: countryNames.of(code) || code,
    callingCode: `+${getCountryCallingCode(code)}`
  }))
  .filter(country => country.name)
  .sort((a, b) => a.name.localeCompare(b.name));
const orderedCountryOptions = [
  countryOptions.find(country => country.code === INDIA_COUNTRY),
  ...countryOptions.filter(country => country.code !== INDIA_COUNTRY)
];

const getCountry = (code) => countryOptions.find(country => country.code === code) || countryOptions[0];

const sanitizePhoneInput = (value) => {
  const sanitized = value.replace(/[^\d\s()+-]/g, '');
  return sanitized.replace(/(?!^)\+/g, '');
};

const getPhoneNumber = (value, countryCode) => {
  const normalizedValue = value.trim();
  if (!normalizedValue) return undefined;
  return parsePhoneNumberFromString(normalizedValue, countryCode);
};

const getPhoneError = (value, countryCode) => {
  if (!value.trim()) return 'Phone number is required';
  const phoneNumber = getPhoneNumber(value, countryCode);
  return phoneNumber?.isValid()
    ? ''
    : `Please enter a valid phone number for ${getCountry(countryCode).name}`;
};

const Flag = ({ country, className = '' }) => {
  const flagUrl = flagUrls[`../../node_modules/country-flag-icons/3x2/${country.code}.svg`];
  return flagUrl ? (
    <img src={flagUrl} className={`contact-form__country-flag ${className}`} alt="" aria-hidden="true" />
  ) : (
    <span className="contact-form__country-flag-fallback" aria-hidden="true">{country.code}</span>
  );
};

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
    message: '',
    honeypot: ''
  });
  const [phoneCountry, setPhoneCountry] = useState(INDIA_COUNTRY);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [highlightedCountry, setHighlightedCountry] = useState(0);
  const [errors, setErrors] = useState({});
  const { status, sendEmail } = useEmailJS();
  const { toasts, showToast, dismissToast } = useToast();
  const fieldRefs = useRef({});
  const countryPickerRef = useRef(null);
  const countrySearchRef = useRef(null);
  const countryOptionRefs = useRef([]);

  const selectedCountry = getCountry(phoneCountry);
  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return orderedCountryOptions;
    return orderedCountryOptions.filter(country => (
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.callingCode.includes(query) ||
      (country.code === 'GB' && 'uk'.includes(query))
    ));
  }, [countrySearch]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!countryPickerRef.current?.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isCountryOpen) countrySearchRef.current?.focus();
  }, [isCountryOpen]);

  const resetForm = () => {
    setFormData({ fullName: '', email: '', phone: '', language: '', level: '', contactMethod: 'Phone', message: '', honeypot: '' });
    setPhoneCountry(INDIA_COUNTRY);
    setIsCountryOpen(false);
    setCountrySearch('');
    setErrors({});
  };

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
    } else {
      const phoneError = getPhoneError(formData.phone, phoneCountry);
      if (phoneError) newErrors.phone = phoneError;
    }
    
    if (!formData.language) {
      newErrors.language = 'Please select a language';
    }
    
    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Please select a contact method';
    }

    setErrors(newErrors);
    const firstInvalidField = Object.keys(newErrors)[0];
    if (firstInvalidField) fieldRefs.current[firstInvalidField]?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const sanitizedValue = sanitizePhoneInput(value);
      const pastedPhone = sanitizedValue.startsWith('+')
        ? parsePhoneNumberFromString(sanitizedValue, phoneCountry)
        : undefined;

      if (pastedPhone?.country && pastedPhone.country !== phoneCountry) {
        setPhoneCountry(pastedPhone.country);
        setFormData(prev => ({ ...prev, phone: pastedPhone.nationalNumber }));
        setErrors(prev => ({ ...prev, phone: getPhoneError(pastedPhone.nationalNumber, pastedPhone.country) }));
        return;
      }

      setFormData(prev => ({ ...prev, phone: sanitizedValue }));
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: getPhoneError(sanitizedValue, phoneCountry) }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (name === 'language') {
      setFormData(prev => ({ ...prev, [name]: value, level: '' }));
    }
  };

  const selectCountry = (countryCode) => {
    setPhoneCountry(countryCode);
    setIsCountryOpen(false);
    setCountrySearch('');
    setErrors(prev => ({ ...prev, phone: getPhoneError(formData.phone, countryCode) }));
    fieldRefs.current.phone?.focus();
  };

  const handleCountryTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsCountryOpen(true);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsCountryOpen(prev => !prev);
      return;
    }
    if (event.key === 'Escape') {
      setIsCountryOpen(false);
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      setIsCountryOpen(true);
      setCountrySearch(prev => prev + event.key);
      setHighlightedCountry(0);
    }
  };

  const handleCountrySearchKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = Math.min(highlightedCountry, filteredCountries.length - 1);
      setHighlightedCountry(nextIndex);
      countryOptionRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.max(highlightedCountry - 1, 0);
      setHighlightedCountry(nextIndex);
      countryOptionRefs.current[nextIndex]?.focus();
    } else if (event.key === 'Enter' && filteredCountries[highlightedCountry]) {
      event.preventDefault();
      selectCountry(filteredCountries[highlightedCountry].code);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsCountryOpen(false);
    }
  };

  const handleCountryOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(index + delta, filteredCountries.length - 1));
      setHighlightedCountry(nextIndex);
      countryOptionRefs.current[nextIndex]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCountry(filteredCountries[index].code);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsCountryOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      resetForm();
      showToast('Your details were sent. The institute will get back to you soon.');
      return;
    }

    if (!validateForm()) return;

    const lastSuccessfulSend = Number(sessionStorage.getItem('exl-contact-last-send') || 0);
    if (Date.now() - lastSuccessfulSend < 30000) {
      showToast('Please wait a little before sending another enquiry.', 'error');
      return;
    }

    const phoneNumber = getPhoneNumber(formData.phone, phoneCountry);
    const result = await sendEmail({ ...formData, phone: phoneNumber.number });
    
    if (result.success) {
      sessionStorage.setItem('exl-contact-last-send', String(Date.now()));
      resetForm();
      showToast('Your details were sent. The institute will get back to you soon.');
    } else {
      showToast(`We could not send your details. Please try again or contact us by phone at ${contactData.phone} or WhatsApp.`, 'error');
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
                  ref={element => { fieldRefs.current.fullName = element; }}
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
                  ref={element => { fieldRefs.current.email = element; }}
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
                <div className={`contact-form__phone-control ${errors.phone ? 'has-error' : ''}`}>
                  <div className="contact-form__country-picker" ref={countryPickerRef}>
                    <button
                      type="button"
                      className="contact-form__country-trigger"
                      aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.callingCode}`}
                      aria-haspopup="listbox"
                      aria-expanded={isCountryOpen}
                      aria-controls="phone-country-options"
                      onClick={() => setIsCountryOpen(prev => !prev)}
                      onKeyDown={handleCountryTriggerKeyDown}
                    >
                      <Flag country={selectedCountry} />
                      <span>{selectedCountry.callingCode}</span>
                      <span className="contact-form__country-chevron" aria-hidden="true">⌄</span>
                    </button>
                    {isCountryOpen && (
                      <div className="contact-form__country-menu">
                        <input
                          ref={countrySearchRef}
                          type="search"
                          className="contact-form__country-search"
                          value={countrySearch}
                          onChange={event => {
                            setCountrySearch(event.target.value);
                            setHighlightedCountry(0);
                          }}
                          onKeyDown={handleCountrySearchKeyDown}
                          placeholder="Search country or code"
                          aria-label="Search country or dialing code"
                          autoComplete="off"
                        />
                        <div id="phone-country-options" className="contact-form__country-options" role="listbox" aria-label="Country codes">
                          {filteredCountries.map((country, index) => (
                            <Fragment key={country.code}>
                              {!countrySearch && index === 1 && (
                                <div key="country-divider" className="contact-form__country-divider" role="separator" />
                              )}
                              <button
                                type="button"
                                role="option"
                                aria-selected={country.code === phoneCountry}
                                className={`contact-form__country-option ${country.code === phoneCountry ? 'is-selected' : ''}`}
                                ref={element => { countryOptionRefs.current[index] = element; }}
                                onClick={() => selectCountry(country.code)}
                                onKeyDown={event => handleCountryOptionKeyDown(event, index)}
                                tabIndex={index === highlightedCountry ? 0 : -1}
                              >
                                <Flag country={country} />
                                <span>{country.name}</span>
                                <span className="contact-form__country-code">{country.callingCode}</span>
                              </button>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-form__phone-input"
                    required
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    autoComplete="tel-national"
                    inputMode="tel"
                    placeholder="Phone number"
                    ref={element => { fieldRefs.current.phone = element; }}
                  />
                </div>
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
                  ref={element => { fieldRefs.current.contactMethod = element; }}
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
                  ref={element => { fieldRefs.current.language = element; }}
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

            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={handleChange}
              className="contact-form__honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

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
                'SEND DETAILS'
              )}
            </button>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
              </svg>
              WhatsApp Business
            </h3>
            <a 
              href={`https://wa.me/${contactData.whatsapp}?text=Hello%20EXL%20Institute%2C%20I%20would%20like%20to%20know%20more%20about%20your%20language%20courses.`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card__whatsapp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
              </svg>
              Chat on WhatsApp
            </a>
            <div className="contact-info-card__social">
              {SOCIAL_LINKS.map(({ platform, url, label }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card__social-link"
                  aria-label={label}
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
      <div className="toast-stack" aria-label="Notifications">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => dismissToast(toast.id)} />
        ))}
      </div>
    </PageSection>
  );
}
