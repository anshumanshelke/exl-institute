import { useCallback, useState } from 'react';

const EMAILJS_VARIABLES = [
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY'
];

export function useEmailJS() {
  const [status, setStatus] = useState('idle');

  const sendEmail = useCallback(async (formData) => {
    setStatus('submitting');

    try {
      const missingVariables = EMAILJS_VARIABLES.filter(variable => !import.meta.env[variable]);

      if (missingVariables.length > 0) {
        console.warn(`EmailJS configuration is missing: ${missingVariables.join(', ')}`);
        setStatus('error');
        return { success: false };
      }

      const emailjs = await import('@emailjs/browser');
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        language: formData.language,
        level: formData.level,
        contact_method: formData.contactMethod,
        message: formData.message
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS returned status ${response.status}`);
      }

      setStatus('success');
      return { success: true };
    } catch (error) {
      console.error('EmailJS submission error:', error);
      setStatus('error');
      return { success: false };
    }
  }, []);

  return { status, sendEmail };
}
