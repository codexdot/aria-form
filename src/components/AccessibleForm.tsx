
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import FormField from './FormField';
import { toast } from 'sonner';

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
      // Announce errors to screen readers
      const errorCount = Object.keys(errors).length;
      toast.error(`Form submission failed. Please correct ${errorCount} error${errorCount > 1 ? 's' : ''}.`);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Thank you! Your message has been submitted successfully.');
      
      // Reset form
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
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
        <p className="text-gray-600">
          Fill out the form below and we'll get back to you as soon as possible. 
          Fields marked with an asterisk (*) are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate role="form" aria-label="Contact form">
        {/* Personal Information Section */}
        <fieldset className="mb-8">
          <legend className="text-lg font-semibold text-gray-800 mb-4">
            Personal Information
          </legend>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

        {/* Contact Details Section */}
        <fieldset className="mb-8">
          <legend className="text-lg font-semibold text-gray-800 mb-4">
            Contact Details
          </legend>
          
          <div className="mb-6">
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
          </div>

          <div className="mb-6">
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
          </div>

          {/* Contact Method Radio Group */}
          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Contact Method *
            </legend>
            <div className="space-y-3" role="radiogroup" aria-required="true">
              {[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
                { value: 'either', label: 'Either email or phone' }
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={option.value}
                    checked={formData.contactMethod === option.value}
                    onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-describedby={`contactMethod-${option.value}-desc`}
                  />
                  <span className="ml-3 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Urgency Select */}
          <div className="mb-6">
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level *
            </label>
            <select
              id="urgency"
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-required="true"
              aria-describedby="urgency-help"
            >
              <option value="low">Low - Response within 5 business days</option>
              <option value="medium">Medium - Response within 2 business days</option>
              <option value="high">High - Response within 24 hours</option>
              <option value="urgent">Urgent - Response within 4 hours</option>
            </select>
            <p id="urgency-help" className="mt-1 text-sm text-gray-500">
              Select the urgency level for your inquiry
            </p>
          </div>
        </fieldset>

        {/* Newsletter Checkbox */}
        <div className="mb-8">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange('newsletter', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1"
              aria-describedby="newsletter-desc"
            />
            <div className="ml-3">
              <span className="text-gray-700">Subscribe to our newsletter</span>
              <p id="newsletter-desc" className="text-sm text-gray-500 mt-1">
                Receive updates about our products and services (optional)
              </p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-describedby="submit-help"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Message'}
          </Button>
          
          <p id="submit-help" className="text-sm text-gray-500">
            By submitting, you agree to our terms and privacy policy
          </p>
        </div>

        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {Object.keys(errors).length > 0 && (
            <span>
              Form has {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''}. 
              Please review and correct the highlighted fields.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccessibleForm;
