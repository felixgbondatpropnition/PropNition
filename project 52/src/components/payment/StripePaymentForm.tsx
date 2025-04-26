import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // In a real application, this would be a server call to create a payment intent
  const createPaymentIntent = async () => {
    // Simulate API call to create payment intent
    return new Promise<{ clientSecret: string }>((resolve) => {
      setTimeout(() => {
        // This is a fake client secret - in a real app this would come from your server
        resolve({ clientSecret: 'demo_client_secret_' + Math.random().toString(36).substring(2, 15) });
      }, 1000);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real application, you would create a payment intent on your server
      const { clientSecret } = await createPaymentIntent();

      // For demo purposes, we'll simulate a successful payment
      // In a real app, you would use the actual client secret:
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name: 'Demo User',
      //     },
      //   },
      // });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setSuccess(true);
      setLoading(false);
      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
      onError('Payment processing failed');
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
        <p className="text-green-700">
          Your payment has been processed successfully. You can now continue with the questionnaire.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Secure Payment</h3>
        <p className="text-blue-700 mb-4">
          Your payment information is encrypted and secure. We use Stripe to process payments.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on card</label>
          <input
            type="text"
            id="cardName"
            placeholder="John Smith"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit or debit card</label>
          <div className="mt-1 p-3 border rounded-md shadow-sm focus-within:border-indigo-300 focus-within:ring focus-within:ring-indigo-200 focus-within:ring-opacity-50">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Tokenization Report</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${amount.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg flex items-center justify-center ${
          !stripe || loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
        } transition-colors`}
      >
        <Lock className="h-4 w-4 mr-2" />
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)} Securely`}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Your payment is secure and encrypted. By proceeding, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default StripePaymentForm;