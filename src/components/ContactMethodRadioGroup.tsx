
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ContactMethodRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Contact method radio group component with enhanced keyboard accessibility
 * Allows users to select their preferred contact method using keyboard navigation
 */
const ContactMethodRadioGroup: React.FC<ContactMethodRadioGroupProps> = ({
  value,
  onChange
}) => {
  const contactMethods = [
    { value: 'email', label: 'Email', description: 'We will contact you via email' },
    { value: 'phone', label: 'Phone', description: 'We will call you on your provided phone number' },
    { value: 'either', label: 'Either', description: 'We will use whichever method is most convenient' }
  ];

  const handleKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(optionValue);
    }
  };

  return (
    <fieldset className="space-y-4">
      <legend className="block text-sm font-medium text-gray-700">
        Preferred Contact Method *
      </legend>
      <div 
        className="grid sm:grid-cols-3 gap-3" 
        role="radiogroup" 
        aria-required="true" 
        aria-describedby="contact-method-help"
        aria-labelledby="contact-method-legend"
      >
        <span id="contact-method-legend" className="sr-only">Preferred Contact Method</span>
        {contactMethods.map((option, index) => (
          <label 
            key={option.value} 
            className="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            onKeyDown={(e) => handleKeyDown(e, option.value)}
          >
            <input
              type="radio"
              name="contactMethod"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300"
              aria-describedby={`contactMethod-${option.value}-desc`}
              tabIndex={0}
            />
            <div className="ml-3 flex-1">
              <span className="text-gray-700 font-medium group-hover:text-gray-900">{option.label}</span>
              <p id={`contactMethod-${option.value}-desc`} className="text-xs text-gray-500 mt-1">
                {option.description}
              </p>
            </div>
            {value === option.value && (
              <CheckCircle className="ml-auto w-4 h-4 text-blue-600" aria-hidden="true" />
            )}
          </label>
        ))}
      </div>
      <p id="contact-method-help" className="text-sm text-gray-600">
        Select how you would prefer us to respond to your inquiry
      </p>
    </fieldset>
  );
};

export default ContactMethodRadioGroup;
