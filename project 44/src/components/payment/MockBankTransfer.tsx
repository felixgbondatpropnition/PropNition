import React, { useState } from 'react';
import { Lock, CheckCircle, AlertCircle, Building2, CreditCard } from 'lucide-react';

interface MockBankTransferProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const MockBankTransfer: React.FC<MockBankTransferProps> = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    sortCode: '',
    bankName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Basic validation
    if (!bankDetails.accountName || !bankDetails.accountNumber || !bankDetails.sortCode || !bankDetails.bankName) {
      setError('Please fill in all bank details');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate bank transfer processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll simulate a successful transfer
      // In a real app, this would connect to a payment processor API
      setSuccess(true);
      setLoading(false);
      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
      onError('Bank transfer processing failed');
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Bank Transfer Successful!</h3>
        <p className="text-green-700">
          Your bank transfer has been processed successfully. You can now continue with the questionnaire.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Bank Transfer</h3>
        <p className="text-blue-700 mb-4">
          Complete your payment by providing your bank account details below.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleChange}
              placeholder="e.g., Barclays, HSBC, Lloyds"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
            />
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div>
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={bankDetails.accountName}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleChange}
              placeholder="e.g., 12345678"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="sortCode" className="block text-sm font-medium text-gray-700">Sort Code</label>
            <input
              type="text"
              id="sortCode"
              name="sortCode"
              value={bankDetails.sortCode}
              onChange={handleChange}
              placeholder="e.g., 12-34-56"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        disabled={loading}
        className={`w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg flex items-center justify-center ${
          loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
        } transition-colors`}
      >
        <Lock className="h-4 w-4 mr-2" />
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)} via Bank Transfer`}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Your payment is secure and encrypted. By proceeding, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default MockBankTransfer;