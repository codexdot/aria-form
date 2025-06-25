
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
  const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-white";
  const errorClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" 
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-400";

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
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...inputProps}
          rows={4}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`${inputProps.className} resize-none`}
        />
      ) : (
        <input
          {...inputProps}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}...`}
        />
      )}
      
      {helpText && (
        <p id={`${id}-help`} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
