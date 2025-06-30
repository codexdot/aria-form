### Accessibility Test Result: https://drive.google.com/file/d/1cx2TKMzMmE7pl1BwX1cH7LscQkXI2qQ3/view?usp=drivesdk

# Accessible Contact Form Application

A fully accessible, responsive contact form built with React, TypeScript, and Tailwind CSS. This application demonstrates best practices for web accessibility (WCAG 2.1 AA compliance) while providing a modern, user-friendly interface.

## 🌟 Features

### Accessibility Features
- **Full keyboard navigation** - Navigate through all form elements using Tab, Arrow keys, Enter, and Escape
- **Screen reader support** - Comprehensive ARIA labels, roles, and live regions for assistive technologies
- **Focus management** - Logical focus order with visible focus indicators
- **Error handling** - Clear error messages with proper ARIA attributes and screen reader announcements
- **Semantic HTML** - Proper landmark structure with header, main, and form roles
- **High contrast** - Colors meet WCAG contrast requirements

### Form Components
- **Personal Information Section** - First name, last name, email, and phone number fields
- **Message Details Section** - Subject, message content, contact method preferences, and urgency selection
- **Newsletter Subscription** - Optional newsletter signup with clear description
- **Custom Select Component** - Fully accessible dropdown with keyboard navigation
- **Radio Group** - Contact method selection with keyboard support

### User Experience
- **Responsive design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time validation** - Immediate feedback as users type
- **Toast notifications** - Success and error messages using Sonner
- **Loading states** - Clear indication when form is being submitted
- **Form reset** - Automatic form clearing after successful submission

## 🛠 Technology Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **Sonner** - Toast notifications
- **Shadcn/UI** - High-quality, accessible UI components

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/UI base components
│   ├── AccessibleForm.tsx     # Main form orchestration component
│   ├── ContactMethodRadioGroup.tsx # Radio group for contact preferences
│   ├── CustomSelect.tsx       # Fully accessible select dropdown
│   ├── FormField.tsx          # Reusable form input component
│   ├── FormHeader.tsx         # Form title and description
│   ├── MessageDetailsSection.tsx # Message and preferences section
│   ├── NewsletterSection.tsx  # Newsletter subscription component
│   ├── PersonalInfoSection.tsx # Personal information fields
│   └── SubmitSection.tsx      # Submit button and help text
├── pages/
│   └── Index.tsx              # Main page component
└── main.tsx                   # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## 📋 Form Fields

### Personal Information
- **First Name*** - Required text field with autocomplete support
- **Last Name*** - Required text field with autocomplete support
- **Email Address*** - Required email field with validation and autocomplete
- **Phone Number** - Optional tel field with format validation

### Message Details
- **Subject*** - Required text field for inquiry topic
- **Message*** - Required textarea with minimum 10 characters
- **Contact Method*** - Radio group with three options:
  - Email - Contact via email address
  - Phone - Contact via phone number
  - Either - Use whichever method is convenient
- **Urgency Level*** - Select dropdown with four options:
  - Low - Response within 5 business days
  - Medium - Response within 2 business days
  - High - Response within 24 hours
  - Urgent - Response within 4 hours

### Additional Options
- **Newsletter Subscription** - Optional checkbox to receive updates

*Fields marked with asterisk (*) are required*

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab/Shift+Tab** - Navigate between form fields
- **Enter/Space** - Activate buttons and checkboxes
- **Arrow Keys** - Navigate within radio groups and select dropdowns
- **Escape** - Close open dropdowns
- **Home/End** - Jump to first/last option in dropdowns

### Screen Reader Support
- Proper semantic HTML structure with landmarks
- ARIA labels, descriptions, and live regions
- Form field grouping with fieldsets and legends
- Error announcements and validation feedback
- Status updates during form submission

### Visual Accessibility
- High contrast colors meeting WCAG AA standards
- Clear focus indicators on all interactive elements
- Responsive design that works at various zoom levels
- Error states with both color and text indicators

## 🎨 Styling and Theming

The application uses Tailwind CSS with a custom design system:

### Color Palette
- **Primary**: Blue (500-700) for buttons and focus states
- **Secondary**: Indigo for gradients and accents
- **Success**: Green (500-600) for newsletter section
- **Error**: Red (500-600) for validation messages
- **Neutral**: Gray scale for text and borders

### Typography
- **Headings**: Font weight 600-700 with appropriate sizing
- **Body Text**: Font weight 400 with good line height
- **Labels**: Font weight 500 for form field labels

## 🧪 Testing Accessibility

### Manual Testing
1. **Keyboard Navigation**: Tab through all elements without using a mouse
2. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
3. **High Contrast**: Verify visibility in high contrast mode
4. **Zoom**: Test at 200% zoom level

### Automated Testing Tools
- accessibilitychecker.org (I used this: >95% compliance recorded)
- axe-core browser extension
- Lighthouse accessibility audit
- WAVE (Web Accessibility Evaluation Tool)

## 🔧 Customization

### Adding New Form Fields
1. Define the field in the `FormData` interface in `AccessibleForm.tsx`
2. Add validation logic in the `validateForm` function
3. Create or use existing form field components
4. Update the appropriate section component

### Styling Modifications
- Modify Tailwind classes in component files
- Update the color scheme in `tailwind.config.ts`
- Customize component variants using class-variance-authority

### Adding New Features
The modular component structure makes it easy to:
- Add new form sections
- Integrate with backend APIs
- Add more validation rules
- Implement different submission methods

## 📝 Contributing

When contributing to this project, please:

1. Maintain accessibility standards
2. Add proper TypeScript types
3. Include appropriate ARIA attributes
4. Test with keyboard navigation
5. Verify screen reader compatibility
6. Follow the existing code structure and naming conventions

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with accessibility-first principles
- Follows WCAG 2.1 AA guidelines
- Inspired by modern design systems
- Uses industry-standard React patterns

---

For questions or support, please refer to the component documentation within the codebase or create an issue in the project repository.
