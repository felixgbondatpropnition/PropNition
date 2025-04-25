import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';

// This would be your actual publishable key from Stripe dashboard in a real app
// For demo purposes, we're using a placeholder
const stripePromise = loadStripe('pk_test_demo_key_placeholder');

interface StripeWrapperProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ amount, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm 
        amount={amount} 
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  );
};

export default StripeWrapper;