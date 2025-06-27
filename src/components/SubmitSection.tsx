
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface SubmitSectionProps {
  isSubmitting: boolean;
}

/**
 * Submit section component
 * Contains the submit button and help text
 */
const SubmitSection: React.FC<SubmitSectionProps> = ({ isSubmitting }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        aria-describedby="submit-help"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" aria-hidden="true"></div>
            <span>Submitting...</span>
            <span className="sr-only">Please wait while we submit your message</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
      
      <p id="submit-help" className="text-sm text-gray-500 text-center sm:text-left">
        By submitting, you agree to our terms and privacy policy
      </p>
    </div>
  );
};

export default SubmitSection;
