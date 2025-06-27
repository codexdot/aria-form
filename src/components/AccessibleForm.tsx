
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import FormHeader from './FormHeader';
import PersonalInfoSection from './PersonalInfoSection';
import MessageDetailsSection from './MessageDetailsSection';
import NewsletterSection from './NewsletterSection';
import SubmitSection from './SubmitSection';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
  contactMethod: string;
  urgency: string;
}

interface FormErrors {
  [key: string]: string;
}

/**
 * Main accessible contact form component
 * Orchestrates all form sections and handles form submission
 */
const AccessibleForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false,
    contactMethod: 'email',
    urgency: 'medium'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Get the current errors from validateForm
      const currentErrors: FormErrors = {};

      if (!formData.firstName.trim()) {
        currentErrors.firstName = 'First name is required';
      }

      if (!formData.lastName.trim()) {
        currentErrors.lastName = 'Last name is required';
      }

      if (!formData.email.trim()) {
        currentErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        currentErrors.email = 'Please enter a valid email address';
      }

      if (!formData.subject.trim()) {
        currentErrors.subject = 'Subject is required';
      }

      if (!formData.message.trim()) {
        currentErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
        currentErrors.message = 'Message must be at least 10 characters long';
      }

      if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
        currentErrors.phone = 'Please enter a valid phone number';
      }

      // Focus first error field for better accessibility
      const errorFields = Object.keys(currentErrors);
      if (errorFields.length > 0) {
        const firstErrorField = document.getElementById(errorFields[0]);
        if (firstErrorField) {
          firstErrorField.focus();
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      // Create a more graceful error message
      const errorCount = errorFields.length;
      const fieldLabels: { [key: string]: string } = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message'
      };
      
      let errorMessage = `Please fix the following ${errorCount === 1 ? 'issue' : 'issues'}:\n`;
      errorMessage += Object.entries(currentErrors)
        .map(([field, error]) => `• ${fieldLabels[field] || field}: ${error}`)
        .join('\n');
      
      toast.error(errorMessage);
      return;
    }

    setIsSubmitting(true);
    
    // Announce form submission start
    toast.info('Submitting your message...');
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Thank you! Your message has been submitted successfully. We will respond according to your selected urgency level.');
      
      // Reset form and announce completion
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false,
        contactMethod: 'email',
        urgency: 'medium'
      });
      
      // Focus back to first field after successful submission
      const firstField = document.getElementById('firstName');
      if (firstField) {
        firstField.focus();
      }
    } catch (error) {
      toast.error('An error occurred while submitting your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Skip link for keyboard users */}
      <a 
        href="#main-form" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main form
      </a>

      <FormHeader />

      <form 
        ref={formRef}
        id="main-form"
        onSubmit={handleSubmit} 
        noValidate 
        role="form" 
        aria-label="Contact form"
        aria-describedby="form-instructions"
        className="space-y-8"
      >
        <div id="form-instructions" className="sr-only">
          This form allows you to send us a message. Navigate through fields using Tab key. Required fields are marked with asterisk and will be announced by screen readers.
        </div>

        <PersonalInfoSection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <MessageDetailsSection
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
        />

        <NewsletterSection
          checked={formData.newsletter}
          onChange={(checked) => handleInputChange('newsletter', checked)}
        />

        <SubmitSection isSubmitting={isSubmitting} />

        {/* Enhanced Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {Object.keys(errors).length > 0 && (
            <div>
              <p>Form validation failed. Please review and correct the following errors:</p>
              <ul>
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{field}: {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Status announcements */}
        <div aria-live="assertive" aria-atomic="true" className="sr-only">
          {isSubmitting && (
            <p>Form is being submitted. Please wait.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccessibleForm;
