import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import FormField from './FormField';
import CustomSelect from './CustomSelect';
import { toast } from 'sonner';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

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
  const firstErrorRef = useRef<HTMLElement>(null);

  const urgencyOptions = [
    { value: 'low', label: 'Low - Response within 5 business days' },
    { value: 'medium', label: 'Medium - Response within 2 business days' },
    { value: 'high', label: 'High - Response within 24 hours' },
    { value: 'urgent', label: 'Urgent - Response within 4 hours' }
  ];

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

      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
          <Send className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Get in Touch</h1>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <div className="text-sm text-gray-500 mt-2">
          <p>Fields marked with an asterisk (*) are required.</p>
        </div>
      </div>

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

        {/* Personal Information Section */}
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-6 border border-blue-100/50">
          <fieldset className="space-y-6">
            <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
              Personal Information
            </legend>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                id="firstName"
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                error={errors.firstName}
                required
                autoComplete="given-name"
              />
              
              <FormField
                id="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                error={errors.lastName}
                required
                autoComplete="family-name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                required
                autoComplete="email"
                helpText="We'll never share your email with anyone else"
              />
              
              <FormField
                id="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                error={errors.phone}
                autoComplete="tel"
                helpText="Optional - for urgent matters only"
              />
            </div>
          </fieldset>
        </div>

        {/* Contact Details Section */}
        <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 rounded-xl p-6 border border-gray-100/50">
          <fieldset className="space-y-6">
            <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-500 rounded-full" aria-hidden="true"></div>
              Message Details
            </legend>
            
            <FormField
              id="subject"
              label="Subject"
              type="text"
              value={formData.subject}
              onChange={(value) => handleInputChange('subject', value)}
              error={errors.subject}
              required
              helpText="Brief description of your inquiry"
            />

            <FormField
              id="message"
              label="Message"
              type="textarea"
              value={formData.message}
              onChange={(value) => handleInputChange('message', value)}
              error={errors.message}
              required
              helpText="Please provide details about your inquiry (minimum 10 characters)"
            />

            {/* Contact Method Radio Group */}
            <fieldset className="space-y-4">
              <legend className="block text-sm font-medium text-gray-700">
                Preferred Contact Method *
              </legend>
              <div className="grid sm:grid-cols-3 gap-3" role="radiogroup" aria-required="true" aria-describedby="contact-method-help">
                {[
                  { value: 'email', label: 'Email', description: 'We will contact you via email' },
                  { value: 'phone', label: 'Phone', description: 'We will call you on your provided phone number' },
                  { value: 'either', label: 'Either', description: 'We will use whichever method is most convenient' }
                ].map((option) => (
                  <label key={option.value} className="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={option.value}
                      checked={formData.contactMethod === option.value}
                      onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300"
                      aria-describedby={`contactMethod-${option.value}-desc`}
                    />
                    <div className="ml-3 flex-1">
                      <span className="text-gray-700 font-medium group-hover:text-gray-900">{option.label}</span>
                      <p id={`contactMethod-${option.value}-desc`} className="text-xs text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                    {formData.contactMethod === option.value && (
                      <CheckCircle className="ml-auto w-4 h-4 text-blue-600" aria-hidden="true" />
                    )}
                  </label>
                ))}
              </div>
              <p id="contact-method-help" className="text-sm text-gray-600">
                Select how you would prefer us to respond to your inquiry
              </p>
            </fieldset>

            {/* Custom Urgency Select */}
            <CustomSelect
              id="urgency"
              label="Urgency Level"
              value={formData.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              options={urgencyOptions}
              required
              helpText="Select the urgency level for your inquiry to help us prioritize our response"
              placeholder="Select urgency level"
            />
          </fieldset>
        </div>

        {/* Newsletter Checkbox */}
        <div className="bg-green-50/50 rounded-xl p-6 border border-green-100/50">
          <label className="flex items-start cursor-pointer group focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 rounded-lg p-2 -m-2">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-0.5 border-gray-300 rounded"
              aria-describedby="newsletter-desc"
            />
            <div className="ml-4">
              <span className="text-gray-900 font-medium group-hover:text-gray-700">Subscribe to our newsletter</span>
              <p id="newsletter-desc" className="text-sm text-gray-600 mt-1">
                Receive updates about our products and services. You can unsubscribe at any time. (Optional)
              </p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" aria-hidden="true"></div>
                <span>Submitting...</span>
                <span className="sr-only">Please wait while we submit your message</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                Send Message
              </>
            )}
          </Button>
          
          <p id="submit-help" className="text-sm text-gray-500 text-center sm:text-left">
            By submitting, you agree to our terms and privacy policy
          </p>
        </div>

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
