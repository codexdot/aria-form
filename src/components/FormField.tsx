
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  helpText?: string;
}

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
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white";
  const errorClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" 
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-400";

  const describedBy = [
    helpText ? `${id}-help` : '',
    error ? `${id}-error` : ''
  ].filter(Boolean).join(' ');

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
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required field">*</span>
        )}
      </label>
      
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
      
      {helpText && (
        <p id={`${id}-help`} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}
      
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
