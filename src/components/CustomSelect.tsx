import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Option interface for select dropdown items
 */
interface Option {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
}

/**
 * Props for the CustomSelect component
 */
interface CustomSelectProps {
  /** Unique identifier for the select element */
  id: string;
  /** Currently selected value */
  value: string;
  /** Callback function called when selection changes */
  onChange: (value: string) => void;
  /** Array of available options */
  options: Option[];
  /** Display label for the select field */
  label: string;
  /** Whether the field is required for form submission */
  required?: boolean;
  /** Additional help text to guide the user */
  helpText?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
}

/**
 * A fully accessible custom select dropdown component with keyboard navigation,
 * screen reader support, and consistent styling.
 * 
 * Features:
 * - Full keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Screen reader announcements
 * - Focus management
 * - Click outside to close
 * - Visual focus indicators
 * 
 * @param props - The CustomSelect component props
 * @returns A fully accessible custom select component
 */
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
  // Component state
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [announcementText, setAnnouncementText] = useState('');

  // Refs for DOM manipulation and focus management
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Find the currently selected option
  const selectedOption = options.find(option => option.value === value);

  // Update option refs array when options change
  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options.length]);

  /**
   * Handles opening/closing the dropdown
   */
  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    
    if (willOpen) {
      // When opening, focus on selected item or first item
      const selectedIndex = options.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      setAnnouncementText(`${options.length} options available. Use arrow keys to navigate.`);
    } else {
      setAnnouncementText('');
    }
  };

  /**
   * Handles option selection
   * @param optionValue - The value of the selected option
   */
  const handleSelect = (optionValue: string) => {
    const selectedOption = options.find(opt => opt.value === optionValue);
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
    
    if (selectedOption) {
      setAnnouncementText(`Selected: ${selectedOption.label}`);
    }
  };

  /**
   * Handles keyboard navigation
   * @param e - Keyboard event
   */
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

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [focusedIndex, isOpen]);

  // Handle clicking outside to close dropdown
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

  // Build describedBy attribute for accessibility
  const describedBy = [
    helpText ? `${id}-help` : '',
    `${id}-status`
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {/* Field Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required field">*</span>
        )}
      </label>
      
      {/* Select Trigger Button */}
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
          aria-describedby={describedBy}
          aria-required={required}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-700 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
            strokeWidth={2.5}
          />
        </button>

        {/* Dropdown Options */}
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

      {/* Help Text */}
      {helpText && (
        <p id={`${id}-help`} className="text-sm text-gray-600">
          {helpText}
        </p>
      )}

      {/* Screen Reader Status Announcements */}
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
