
import React from 'react';
import FormField from './FormField';

interface PersonalInfoSectionProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  errors: {
    [key: string]: string;
  };
  onInputChange: (name: string, value: string) => void;
}

/**
 * Personal information section component
 * Contains first name, last name, email, and phone fields
 */
const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
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
            onChange={(value) => onInputChange('firstName', value)}
            error={errors.firstName}
            required
            autoComplete="given-name"
          />
          
          <FormField
            id="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(value) => onInputChange('lastName', value)}
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
            onChange={(value) => onInputChange('email', value)}
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
            onChange={(value) => onInputChange('phone', value)}
            error={errors.phone}
            autoComplete="tel"
            helpText="Optional - for urgent matters only"
          />
        </div>
      </fieldset>
    </div>
  );
};

export default PersonalInfoSection;
