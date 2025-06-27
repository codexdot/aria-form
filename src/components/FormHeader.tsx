
import React from 'react';
import { Send } from 'lucide-react';

/**
 * Header section component for the contact form
 * Contains the form title, description, and instructions
 */
const FormHeader: React.FC = () => {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
        <Send className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Get in Touch</h1>
      <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
      <div className="text-sm text-gray-500 mt-2">
        <p>Fields marked with an asterisk (*) are required.</p>
      </div>
    </div>
  );
};

export default FormHeader;
