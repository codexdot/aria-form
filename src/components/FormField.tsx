
import React from 'react';

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
  const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const errorClasses = error 
    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
    : "border-gray-300 focus:border-blue-500";

  const inputProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: `${baseClasses} ${errorClasses}`,
    'aria-required': required,
    'aria-invalid': !!error,
    'aria-describedby': `${id}-help ${error ? `${id}-error` : ''}`.trim(),
    autoComplete
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...inputProps}
          rows={4}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          {...inputProps}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
      
      {helpText && (
        <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
