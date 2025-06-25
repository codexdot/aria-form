
import AccessibleForm from "../components/AccessibleForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessible Web Form Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive example of an accessible web form using proper ARIA roles, 
            attributes, and semantic HTML following WCAG guidelines.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AccessibleForm />
        </div>
        
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Accessibility Features Implemented
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">ARIA & Semantic HTML</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Proper form roles and labels</li>
                <li>• aria-describedby for help text</li>
                <li>• aria-invalid for error states</li>
                <li>• Fieldset and legend for grouping</li>
                <li>• Live regions for announcements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">User Experience</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Keyboard navigation support</li>
                <li>• Clear focus indicators</li>
                <li>• Error validation and messaging</li>
                <li>• High contrast design</li>
                <li>• Screen reader friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
