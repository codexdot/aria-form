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
  const [announcementText, setAnnouncementText] = useState('');

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options.length]);

  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    
    if (willOpen) {
      const selectedIndex = options.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      setAnnouncementText(`${options.length} options available. Use arrow keys to navigate.`);
    } else {
      setAnnouncementText('');
    }
  };

  const handleSelect = (optionValue: string) => {
    const selectedOption = options.find(opt => opt.value === optionValue);
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
    
    if (selectedOption) {
      setAnnouncementText(`Selected: ${selectedOption.label}`);
    }
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
          setAnnouncementText('Selection cancelled');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
          setAnnouncementText(`${options.length} options available. Use arrow keys to navigate.`);
        } else {
          const newIndex = Math.min(focusedIndex + 1, options.length - 1);
          setFocusedIndex(newIndex);
          setAnnouncementText(`${options[newIndex].label}`);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const newIndex = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(newIndex);
          setAnnouncementText(`${options[newIndex].label}`);
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          setAnnouncementText(`${options[0].label}`);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = options.length - 1;
          setFocusedIndex(lastIndex);
          setAnnouncementText(`${options[lastIndex].label}`);
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

  const describedBy = [
    helpText ? `${id}-help` : '',
    `${id}-status`
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required field">*</span>
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
          aria-describedby={describedBy}
          aria-required={required}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            role="listbox"
            aria-labelledby={`${id}-label`}
            aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
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
                  <Check className="w-4 h-4 text-blue-600" aria-hidden="true" />
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

      {/* Status announcements for screen readers */}
      <div 
        id={`${id}-status`} 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcementText}
      </div>
    </div>
  );
};

export default CustomSelect;
