
import React from 'react';
import FormField from './FormField';
import CustomSelect from './CustomSelect';
import ContactMethodRadioGroup from './ContactMethodRadioGroup';

interface MessageDetailsSectionProps {
  formData: {
    subject: string;
    message: string;
    contactMethod: string;
    urgency: string;
  };
  errors: {
    [key: string]: string;
  };
  onInputChange: (name: string, value: string) => void;
}

/**
 * Message details section component
 * Contains subject, message, contact method, and urgency fields
 */
const MessageDetailsSection: React.FC<MessageDetailsSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  const urgencyOptions = [
    { value: 'low', label: 'Low - Response within 5 business days' },
    { value: 'medium', label: 'Medium - Response within 2 business days' },
    { value: 'high', label: 'High - Response within 24 hours' },
    { value: 'urgent', label: 'Urgent - Response within 4 hours' }
  ];

  return (
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
          onChange={(value) => onInputChange('subject', value)}
          error={errors.subject}
          required
          helpText="Brief description of your inquiry"
        />

        <FormField
          id="message"
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={(value) => onInputChange('message', value)}
          error={errors.message}
          required
          helpText="Please provide details about your inquiry (minimum 10 characters)"
        />

        <ContactMethodRadioGroup
          value={formData.contactMethod}
          onChange={(value) => onInputChange('contactMethod', value)}
        />

        <CustomSelect
          id="urgency"
          label="Urgency Level"
          value={formData.urgency}
          onChange={(value) => onInputChange('urgency', value)}
          options={urgencyOptions}
          required
          helpText="Select the urgency level for your inquiry to help us prioritize our response"
          placeholder="Select urgency level"
        />
      </fieldset>
    </div>
  );
};

export default MessageDetailsSection;
