
import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Props for the FormField component
 */
interface FormFieldProps {
  /** Unique identifier for the form field */
  id: string;
  /** Display label for the field */
  label: string;
  /** Input type - determines the HTML input element type */
  type: 'text' | 'email' | 'tel' | 'textarea';
  /** Current value of the field */
  value: string;
  /** Callback function called when the field value changes */
  onChange: (value: string) => void;
  /** Error message to display if validation fails */
  error?: string;
  /** Whether the field is required for form submission */
  required?: boolean;
  /** HTML autocomplete attribute value */
  autoComplete?: string;
  /** Additional help text to guide the user */
  helpText?: string;
}

/**
 * A reusable form field component with built-in validation display,
 * accessibility features, and consistent styling.
 * 
 * @param props - The FormField component props
 * @returns A fully accessible form field with error handling
 */
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  required = false,
  autoComplete,
  helpText
}) => {
  // Base classes for consistent styling
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white";
  
  // Dynamic classes based on error state
  const errorClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" 
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-400";

  // Build describedBy attribute for accessibility
  const describedBy = [
    helpText ? `${id}-help` : '',
    error ? `${id}-error` : ''
  ].filter(Boolean).join(' ');

  // Common input props to reduce repetition
  const inputProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: `${baseClasses} ${errorClasses}`,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': describedBy || undefined,
    autoComplete
  };

  return (
    <div className="space-y-2">
      {/* Field Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required field">*</span>
        )}
      </label>
      
      {/* Input Field - Textarea or Input based on type */}
      {type === 'textarea' ? (
        <textarea
          {...inputProps}
          rows={4}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`${inputProps.className} resize-none`}
          aria-label={`${label}${required ? ' (required)' : ' (optional)'}`}
        />
      ) : (
        <input
          {...inputProps}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          aria-label={`${label}${required ? ' (required)' : ' (optional)'}`}
        />
      )}
      
      {/* Help Text */}
      {helpText && (
        <p id={`${id}-help`} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}
      
      {/* Error Message */}
      {error && (
        <div id={`${id}-error`} className="text-sm text-red-600 flex items-center gap-2" role="alert" aria-live="polite">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
