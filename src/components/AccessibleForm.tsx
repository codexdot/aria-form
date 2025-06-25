import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import FormField from './FormField';
import CustomSelect from './CustomSelect';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Get in Touch</h1>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate role="form" aria-label="Contact form" className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-6 border border-blue-100/50">
          <fieldset className="space-y-6">
            <legend className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
              <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
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
              <div className="grid sm:grid-cols-3 gap-3" role="radiogroup" aria-required="true">
                {[
                  { value: 'email', label: 'Email' },
                  { value: 'phone', label: 'Phone' },
                  { value: 'either', label: 'Either' }
                ].map((option) => (
                  <label key={option.value} className="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={option.value}
                      checked={formData.contactMethod === option.value}
                      onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300"
                      aria-describedby={`contactMethod-${option.value}-desc`}
                    />
                    <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900">{option.label}</span>
                    {formData.contactMethod === option.value && (
                      <CheckCircle className="ml-auto w-4 h-4 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Custom Urgency Select */}
            <CustomSelect
              id="urgency"
              label="Urgency Level"
              value={formData.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              options={urgencyOptions}
              required
              helpText="Select the urgency level for your inquiry"
              placeholder="Select urgency level"
            />
          </fieldset>
        </div>

        {/* Newsletter Checkbox */}
        <div className="bg-green-50/50 rounded-xl p-6 border border-green-100/50">
          <label className="flex items-start cursor-pointer group">
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
                Receive updates about our products and services (optional)
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
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
          
          <p id="submit-help" className="text-sm text-gray-500 text-center sm:text-left">
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
