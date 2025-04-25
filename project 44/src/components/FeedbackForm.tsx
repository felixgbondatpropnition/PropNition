import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackFormProps {
  recipientEmail: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ recipientEmail }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'suggestion',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showEmailInstructions, setShowEmailInstructions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create a mailto link with the form data
      const subject = `Propnition Feedback: ${formData.feedbackType}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Feedback Type: ${formData.feedbackType}

Message:
${formData.message}
      `;
      
      // Show the email instructions instead of automatically opening the email client
      setShowEmailInstructions(true);
      
      // Store the email data for manual copying
      localStorage.setItem('feedbackEmailSubject', subject);
      localStorage.setItem('feedbackEmailBody', body);
      localStorage.setItem('feedbackEmailRecipient', recipientEmail);
      
      // Show success message
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualEmailClick = () => {
    // Create a mailto link with the form data
    const subject = `Propnition Feedback: ${formData.feedbackType}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Feedback Type: ${formData.feedbackType}

Message:
${formData.message}
    `;
    
    // Encode the mailto URL
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's email client
    window.open(mailtoLink, '_blank');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      feedbackType: 'suggestion',
      message: ''
    });
    setSubmitSuccess(false);
    setShowEmailInstructions(false);
  };

  if (showEmailInstructions) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Your Feedback</h3>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-blue-800 mb-2">Please send your feedback to:</h4>
          <div className="bg-white p-3 rounded border border-blue-200">
            <p className="font-medium">{recipientEmail}</p>
          </div>
          
          <h4 className="font-medium text-blue-800 mt-4 mb-2">Subject:</h4>
          <div className="bg-white p-3 rounded border border-blue-200">
            <p>Propnition Feedback: {formData.feedbackType}</p>
          </div>
          
          <h4 className="font-medium text-blue-800 mt-4 mb-2">Message:</h4>
          <div className="bg-white p-3 rounded border border-blue-200 whitespace-pre-wrap">
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Feedback Type: {formData.feedbackType}</p>
            <p>&nbsp;</p>
            <p>Message:</p>
            <p>{formData.message}</p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleManualEmailClick}
            className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Open Email Client
          </button>
          
          <button
            onClick={resetForm}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">If the button doesn't work:</span> Please manually send an email to {recipientEmail} with the subject and message shown above.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">We Value Your Feedback</h3>
      
      {submitSuccess ? (
        <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Thank you for your feedback!</p>
            <p className="text-green-700 text-sm mt-1">Your message has been prepared for sending.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Type
            </label>
            <select
              id="feedbackType"
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
              <option value="question">Question</option>
              <option value="review">Review</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Please share your thoughts, suggestions, or concerns..."
            />
          </div>
          
          {submitError && (
            <div className="bg-red-50 p-3 rounded-lg flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
            } transition-colors`}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            Your feedback will be sent to our team via email and will help us improve our platform.
          </p>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;