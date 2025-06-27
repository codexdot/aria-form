
import React from 'react';

interface NewsletterSectionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Newsletter subscription section component
 * Contains the newsletter checkbox with description
 */
const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  checked,
  onChange
}) => {
  return (
    <div className="bg-green-50/50 rounded-xl p-6 border border-green-100/50">
      <label className="flex items-start cursor-pointer group focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 rounded-lg p-2 -m-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-0.5 border-gray-300 rounded"
          aria-describedby="newsletter-desc"
        />
        <div className="ml-4">
          <span className="text-gray-900 font-medium group-hover:text-gray-700">Subscribe to our newsletter</span>
          <p id="newsletter-desc" className="text-sm text-gray-600 mt-1">
            Receive updates about our products and services. You can unsubscribe at any time. (Optional)
          </p>
        </div>
      </label>
    </div>
  );
};

export default NewsletterSection;
