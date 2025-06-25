
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  value,
  onChange,
  options,
  label,
  required = false,
  helpText,
  placeholder = "Select an option"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const selectedIndex = options.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        } else {
          handleToggle();
        }
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(options.length - 1);
        }
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
          listboxRef.current && !listboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      
      <div className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400 transition-colors text-left flex items-center justify-between"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label`}
          aria-describedby={helpText ? `${id}-help` : undefined}
          aria-required={required}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                ref={el => optionRefs.current[index] = el}
                role="option"
                aria-selected={option.value === value}
                className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                  focusedIndex === index
                    ? 'bg-blue-50 text-blue-900'
                    : option.value === value
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {helpText && (
        <p id={`${id}-help`} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
