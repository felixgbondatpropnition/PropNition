import React, { useState } from 'react';
import { CreditCard, Landmark, CheckCircle } from 'lucide-react';
import MockBankTransfer from './MockBankTransfer';
import MockCreditCardForm from './MockCreditCardForm';

interface PaymentOptionsProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ amount, onSuccess, onError }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Comprehensive Tokenization Report</h3>
        <p className="text-blue-700 mb-4">
          Complete your payment to receive a detailed analysis of your property's tokenization potential, including:
        </p>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Advanced financial analysis with key metrics and projections</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Market analysis specific to your property type and location</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Tokenization strategy with platform recommendations</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Implementation roadmap with detailed next steps</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span>Risk assessment and mitigation strategies</span>
          </li>
        </ul>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Select Payment Method</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
              paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <CreditCard className={`h-8 w-8 mb-2 ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}`} />
            <span className={`font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-800'}`}>Credit Card</span>
          </button>
          
          <button
            onClick={() => setPaymentMethod('bank')}
            className={`p-4 border rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
              paymentMethod === 'bank' ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <Landmark className={`h-8 w-8 mb-2 ${paymentMethod === 'bank' ? 'text-primary' : 'text-gray-600'}`} />
            <span className={`font-medium ${paymentMethod === 'bank' ? 'text-primary' : 'text-gray-800'}`}>Bank Transfer</span>
          </button>
        </div>
        
        {paymentMethod === 'card' && (
          <MockCreditCardForm amount={amount} onSuccess={onSuccess} onError={onError} />
        )}
        
        {paymentMethod === 'bank' && (
          <MockBankTransfer amount={amount} onSuccess={onSuccess} onError={onError} />
        )}
        
        {!paymentMethod && (
          <div className="text-center text-gray-500 py-8">
            Please select a payment method to continue
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;